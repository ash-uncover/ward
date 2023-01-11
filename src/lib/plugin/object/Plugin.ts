import PluginManager from '../PluginManager'
import {
  PluginData,
} from '../model/PluginDataModel'
import PluginDefine from './PluginDefine'
import PluginProvide from './PluginProvide'

class Plugin {

  // Attributes //

  #loadedFrom: string | undefined

  #name: string
  #url: string

  #dependencies: {
    url: string
    loaded: boolean
  }[]
  #defines: PluginDefine[]
  #provides: PluginProvide[]

  // Constructor //

  constructor (
    data: PluginData,
    loadedFrom?: string
  ) {
    this.#loadedFrom = loadedFrom
    this.#name = data.name
    this.#url = data.url

    this.#dependencies = (data.dependencies || []).map(dependency => ({
      url: dependency,
      loaded: false
    }))

    const defines = data.defines || {}
    this.#defines = Object.keys(defines).map((defineName: string) => {
      const define = defines[defineName]
      return new PluginDefine(this.name, defineName, define)
    })

    const provides = data.provides || {}
    this.#provides = Object.keys(provides).reduce((acc: PluginProvide[], provideName: string) => {
      const provide = provides[provideName]
      if (Array.isArray(provide)) {
        const newProvides: PluginProvide[] = provide.map(prov => {
          return new PluginProvide(this.name, provideName, prov)
        })
        return [...acc, ...newProvides]
      }
      return [...acc, new PluginProvide(this.name, provideName, provide)]
    }, [])
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