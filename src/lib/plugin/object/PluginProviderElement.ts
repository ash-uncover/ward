import PluginDefineAttribute from './PluginDefineAttribute'
import PluginDefineElement from './PluginDefineElement'
import PluginProvideElement from './PluginProvideElement'

class PluginProviderElement {

  // Attributes //

  #name: string

  #url: string
  #type: string

  // Constructor //

  constructor(
    pluginUrl: string,
    elementDefinition: PluginDefineElement,
    element: PluginProvideElement
  ) {
    this.#name = elementDefinition.name

    this.#url = `${pluginUrl}${element.url}`
    this.#type = element.type
  }

  // Getters & Setters //

  get name () { return this.#name }
  get url () { return this.#url }
  get type () { return this.#type }

  // Public Methods //

  // Internal Methods //

}

export default PluginProviderElement