import PluginDefine from './PluginDefine'
import PluginProvide from './PluginProvide'
import PluginProviderAttribute from './PluginProviderAttribute'
import PluginProviderElement from './PluginProviderElement'

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
  }

  // Getters & Setters //

  get plugin() { return this.#plugin }
  get definition() { return this.#definition }
  get name() { return this.#name }

  get attributes() { return this.#attributes.slice() }
  get elements() { return this.#elements.slice() }

  // Public Methods //

  // Internal Methods //

}

export default PluginProvider