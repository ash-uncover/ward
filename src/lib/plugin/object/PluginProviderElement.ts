import PluginDefineElement from './PluginDefineElement'
import PluginProvideElement from './PluginProvideElement'

class PluginProviderElement {

  // Attributes //

  #name: string

  #url: string
  #type: string
  #element?: string

  // Constructor //

  constructor(
    pluginUrl: string,
    elementDefinition: PluginDefineElement,
    element: PluginProvideElement
  ) {
    this.#name = elementDefinition.name

    this.#url = `${pluginUrl}${element.url}`
    this.#type = element.type
    this.#element = element.element
  }

  // Getters & Setters //

  get name () { return this.#name }
  get url () { return this.#url }
  get type () { return this.#type }
  get element () { return this.#element }

  // Public Methods //

  // Internal Methods //

}

export default PluginProviderElement