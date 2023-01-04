import { PluginDataDefine } from "../model/PluginDataModel"

class PluginDefine {

  // Attributes //

  #plugin: string
  #name: string

  // Constructor //

  constructor(plugin: string, name: string, data: PluginDataDefine) {
    this.#plugin = plugin
    this.#name = name
  }

  // Getters & Setters //

  get plugin () { return this.#plugin }

  get name () { return this.#name }

  // Public Methods //

  // Internal Methods //

}

export default PluginDefine