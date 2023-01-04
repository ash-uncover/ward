import { PluginDataProvide } from "../model/PluginDataModel"

class PluginProvide {

  // Attributes //

  #plugin: string
  #name: string

  // Constructor //

  constructor(plugin: string, name: string, data: PluginDataProvide) {
    this.#plugin = plugin
    this.#name = name
  }

  // Getters & Setters //

  get plugin () { return this.#plugin }

  get name () { return this.#name }

  // Public Methods //

  // Internal Methods //

}

export default PluginProvide