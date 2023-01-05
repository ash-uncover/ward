import { PluginDataProvideElement } from '../model/PluginDataModel'

class PluginProvideElement {

  // Attributes //

  #plugin: string
  #name: string
  #url: string
  #type: string

  // Constructor //

  constructor(
    plugin: string,
    name: string,
    data: PluginDataProvideElement
  ) {
    this.#plugin = plugin
    this.#name = name
    this.#url = data.url
    this.#type = data.type
  }

  // Getters & Setters //

  get plugin () { return this.#plugin }
  get name () { return this.#name }
  get url () { return this.#url }
  get type () { return this.#type }

  // Public Methods //

  // Internal Methods //

}

export default PluginProvideElement