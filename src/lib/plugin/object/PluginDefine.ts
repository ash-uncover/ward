import { PluginDataDefine } from '../model/PluginDataModel'
import PluginDefineAttribute from './PluginDefineAttribute'
import PluginDefineElement from './PluginDefineElement'
import PluginDefineProperty from './PluginDefineProperty'

class PluginDefine {

  // Attributes //

  #plugin: string
  #name: string

  #properties: PluginDefineProperty[]
  #attributes: PluginDefineAttribute[]
  #elements: PluginDefineElement[]

  // Constructor //

  constructor(
    plugin: string,
    name: string,
    data: PluginDataDefine
  ) {
    this.#plugin = plugin
    this.#name = `${plugin}/${name}`

    const properties = data.properties || {}
    this.#properties = Object.keys(properties).map((propertyName) => {
      const property = properties[propertyName]
      return new PluginDefineProperty(plugin, propertyName, property)
    })

    const attributes = data.attributes || {}
    this.#attributes = Object.keys(attributes).map((attributeName) => {
      const attribute = attributes[attributeName]
      return new PluginDefineAttribute(plugin, attributeName, attribute)
    })

    const elements = data.elements || {}
    this.#elements = Object.keys(elements).map((elementName) => {
      const element = elements[elementName]
      return new PluginDefineElement(plugin, elementName, element)
    })
  }

  // Getters & Setters //

  get plugin () { return this.#plugin }
  get name () { return this.#name }

  get properties () { return this.#properties.slice() }
  getProperty (propertyId: string) {
    return this.properties.find(property => property.name === propertyId)
  }

  get attributes () { return this.#attributes.slice() }
  getAttribute (attributeId: string) {
    return this.attributes.find(attribute => attribute.name === attributeId)
  }

  get elements () { return this.#elements.slice() }
  getElement (elementId: string) {
    return this.elements.find(element => element.name === elementId)
  }

  // Public Methods //

  // Internal Methods //

}

export default PluginDefine