import { WardPluginProvideElement } from "../loader/model/PluginDataModel"

class PluginProvideElement {

  // Attributes //

  #plugin: string
  #name: string
  #url: string
  #type: string
  #element?: string

  // Constructor //

  constructor(
    plugin: string,
    name: string,
    data: WardPluginProvideElement
  ) {
    this.#plugin = plugin
    this.#name = name
    this.#url = data.url
    this.#type = data.type
    this.#element = data.element
  }

  // Getters & Setters //

  get plugin () { return this.#plugin }
  get name () { return this.#name }
  get url () { return this.#url }
  get type () { return this.#type }
  get element () { return this.#element }

  // Public Methods //

  // Internal Methods //

}

export default PluginProvideElement