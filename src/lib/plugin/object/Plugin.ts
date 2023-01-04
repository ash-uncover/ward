import {
  PluginData,
} from '../model/PluginDataModel'

class Plugin {

  // Attributes //

  #loadedFrom: string | undefined

  #name: string
  #url: string

  #dependencies: string[]
  #defines: string[]
  #provides: string[]

  // Constructor //

  constructor (pluginData: PluginData, loadedFrom?: string) {
    if (!pluginData) {
      throw new Error('[Plugin] plugin information is not defined')
    }
    this.#loadedFrom = loadedFrom
    
    if (!pluginData.name) {
      throw new Error('[Plugin] plugin name is missing')
    }
    this.#name = pluginData.name

    if (!pluginData.url) {
      throw new Error('[Plugin] plugin url is missing')
    }
    this.#url = pluginData.url

    this.#dependencies = pluginData.dependencies || []
    this.#defines = Object.keys(pluginData.defines || {})
    this.#provides = Object.keys(pluginData.provides || {})
  }

  // Getters & Setters //

  get loadedFrom () { return this.#loadedFrom }

  get name () { return this.#name }
  get url () { return this.#url }

  get dependencies () { return this.#dependencies.slice() }
  get defines () { return this.#defines.slice() }
  get provides () { return this.#provides.slice() }

  // Public Methods //

  // Internal Methods //

}

export default Plugin