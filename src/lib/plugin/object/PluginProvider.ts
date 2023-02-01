import Logger from '@uncover/js-utils-logger/dist/Logger'
import PluginDefine from './PluginDefine'
import PluginProvide from './PluginProvide'
import PluginProviderAttribute from './PluginProviderAttribute'
import PluginProviderElement from './PluginProviderElement'
import { LogLevels } from '@uncover/js-utils-logger'

const LOGGER = new Logger('PluginManager', LogLevels.WARN)

class PluginProvider {

  // Attributes //

  #plugin: string
  #definition: string
  #name: string

  #attributes: PluginProviderAttribute[] = []
  #elements: PluginProviderElement[] = []

  // Constructor //

  constructor(
    pluginUrl: string,
    definition: PluginDefine,
    provide: PluginProvide
  ) {
    this.#plugin = provide.plugin
    this.#definition = definition.name
    this.#name = `${definition.name}/${provide.name}`

    definition.attributes.forEach(attributeDefinition => {
      const {
        name,
        type,
        mandatory,
        array,
      } = attributeDefinition
      const attribute = provide.attributes.find(att => att.name === name)
      if (mandatory && !attribute) {
        throw new Error(`Missing mandatory attribute '${name}'`)
      }
      if (!attribute) {
        return
      }
      if (array !== Array.isArray(attribute.value)) {
        throw new Error(`Invalid attribute type '${name}', should ${array ? '' : 'not '}be an array`)
      }

      this.#attributes.push(
        new PluginProviderAttribute(
          pluginUrl,
          attributeDefinition,
          attribute
        )
      )
    })

    provide.attributes.forEach(attribute => {
      /* istanbul ignore next */
      const attributeDefinition = definition.attributes.find(att => att.name === attribute.name)
      /* istanbul ignore next */
      if (!attributeDefinition) {
        /* istanbul ignore next */
        LOGGER.warn(`${provide.plugin} - ${provide.name} - Attribute '${attribute.name}' is not defined`)
      }
    })

    definition.elements.forEach(elementDefinition => {
      const {
        name,
      } = elementDefinition
      const element = provide.elements.find(elem => elem.name === name)
      if (!element) {
        throw new Error(`Missing element '${name}'`)
      }

      this.#elements.push(
        new PluginProviderElement(
          pluginUrl,
          elementDefinition,
          element
        )
      )
    })

    provide.elements.forEach(element => {
      /* istanbul ignore next */
      const elementDefinition = definition.elements.find(elem => elem.name === element.name)
      /* istanbul ignore next */
      if (!elementDefinition) {
        /* istanbul ignore next */
        LOGGER.warn(`${provide.plugin} - ${provide.name} - Element '${element.name}' is not defined`)
      }
    })
  }

  // Getters & Setters //

  get plugin() { return this.#plugin }
  get definition() { return this.#definition }
  get name() { return this.#name }

  get attributes(): {
    [key: string]: string | number | boolean | string[] | number[] | boolean[]
  } {
    return this.#attributes.reduce((acc: any, attribute) => {
      acc[attribute.name] = attribute.value
      return acc
    }, {})
  }
  getAttributes() {
    return this.#attributes.slice()
  }
  getAttribute (attributeId: string) {
    return this.attributes[attributeId]
  }

  get elements(): {
    [key: string]: {
      plugin: string,
      url: string,
      type: string,
      element: string
    }
  } {
    return this.#elements.reduce((acc: any, element) => {
      acc[element.name] = {
        plugin: this.plugin,
        url: element.url,
        type: element.type,
        element: element.element
      }
      return acc
    }, {})
  }
  getElements() {
    return this.#elements.slice()
  }
  getElement(elementId: string) {
    return this.elements[elementId]
  }

  // Public Methods //

  // Internal Methods //

}

export default PluginProvider