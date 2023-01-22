import { WardPluginProvide } from '../loader/model/PluginDataModel'
import PluginProvideAttribute from './PluginProvideAttribute'
import PluginProvideElement from './PluginProvideElement'

class PluginProvide {

  // Attributes //

  #plugin: string
  #define: string
  #name: string

  #attributes: PluginProvideAttribute[]
  #elements: PluginProvideElement[]

  // Constructor //

  constructor(
    plugin: string,
    define: string,
    name: string,
    data: WardPluginProvide
  ) {
    this.#plugin = plugin
    this.#define = define
    this.#name = name

    const attributes = data.attributes || {}
    this.#attributes = Object.keys(attributes).map((attributeName) => {
      const attribute = attributes[attributeName]
      return new PluginProvideAttribute(plugin, attributeName, attribute)
    })

    const elements = data.elements || {}
    this.#elements = Object.keys(elements).map((elementName) => {
      const element = elements[elementName]
      return new PluginProvideElement(plugin, elementName, element)
    })
  }

  // Getters & Setters //

  get plugin () { return this.#plugin }
  get define () { return this.#define }
  get name () { return this.#name }

  get attributes () { return this.#attributes.slice() }
  get elements () { return this.#elements.slice() }

  // Public Methods //

  // Internal Methods //

}

export default PluginProvide