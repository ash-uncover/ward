import PluginManager from '../PluginManager'
import {
  PluginData,
} from '../model/PluginDataModel'
import PluginDefine from './PluginDefine'
import PluginProvide from './PluginProvide'

class Plugin {

  // Attributes //

  #loadUrl: string

  #name: string
  #url: string

  #dependencies: string[]
  #defines: PluginDefine[]
  #provides: PluginProvide[]

  // Constructor //

  constructor (
    loadUrl: string,
    data: PluginData
  ) {
    this.#loadUrl = loadUrl
    this.#name = data.name
    this.#url = data.url

    this.#dependencies = (data.dependencies || [])

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

  get loadUrl () { return this.#loadUrl }

  get name () { return this.#name }
  get url () { return this.#url }

  get dependencies (): Plugin[] {
    return this.#dependencies.reduce((acc: Plugin[], dependency) => {
      const data = PluginManager.getData(dependency)
      if (data) {
        const plugin = PluginManager.getPlugin(data.name)
        if (plugin) {
          acc.push(plugin)
        }
      }
      return acc
    }, [])
  }

  get defines () { return this.#defines.slice() }

  get provides () { return this.#provides.slice() }

  // Public Methods //

  // Internal Methods //

}

export default Plugin