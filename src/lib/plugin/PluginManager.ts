import Logger, { LogLevels } from '@uncover/js-utils-logger'
import { PluginData, PluginDataValidator } from './model/PluginDataModel'
import Plugin from './object/Plugin'
import PluginDefine from './object/PluginDefine'
import PluginProvider from './object/PluginProvider'

const LOGGER = new Logger('PluginManager', LogLevels.WARN)

export const helpers = {
  fetchPlugin: async (url: string) => {
    try {
      const response = await fetch(url, {
        method: 'GET',
        headers: new Headers()
      })
      const data = await response.json()
      return data
    } catch (error) {
      throw new Error(`[fetchPlugin] Failed to fetch plugin from ${url}: ${error}`)
    }
  }
}

class PluginManager {

  // Attributes //

  #loadedUrls: { [key: string]: PluginData } = {}
  #plugins: { [key: string]: Plugin } = {}

  #definitions: { [key: string]: PluginDefine } = {}
  #providers: { [key: string]: PluginProvider } = {}

  // Constructor //

  constructor () {
  }

  // Getters & Setters //

  get plugins(): Plugin[] {
    return Object.values(this.#plugins)
  }
  get rootPlugins(): Plugin[] {
    return Object.values(this.#plugins).filter(plugin => !plugin.loadedFrom)
  }
  getPlugin(pluginId: string): Plugin | undefined {
    return this.#plugins[pluginId]
  }
  getPluginByUrl(pluginUrl: string): Plugin | undefined {
    return this.getPlugin(this.#loadedUrls[pluginUrl].name)
  }

  get definitions() {
    return this.#definitions
  }
  getDefinition(definitionId: string) {
    return this.definitions[definitionId]
  }

  get providers() {
    return this.#providers
  }
  getProviders(definitionId: string) {
    return Object.values(this.#providers).filter(provider => provider.definition === definitionId)
  }
  getProvider(providerId: string) {
    return this.#providers[providerId]
  }

  // Public Methods //

  reset () {
    this.#loadedUrls = {}
    this.#plugins = {}
  }

  async loadPlugin(url: string) {
    await this.#loadPluginInternal.call(this, url)
    // Check all plugins info consistency
    this.#checkPluginsInternal.call(this)
  }

  // Internal Methods //

  async #loadPluginInternal(url: string, parent?: string): Promise<any> {
    if (this.#loadedUrls[url]) {
      LOGGER.warn(`URL already loaded: '${url}'`)
      return
    }

    try {
      const data = await helpers.fetchPlugin(url)
      this.#loadedUrls[url] = data

      // Check plugin data
      const errors: string[] = PluginDataValidator.checkPluginData(data)
      if (errors.length) {
        throw new Error('Invalid plugin data: ' + errors.join(', '))
      }

      // Check plugin not already defined
      if (this.#plugins[data.name]) {
        LOGGER.warn(`Plugin '${data.name}' from '${data.url}' already registered from '${this.#plugins[data.name].url}'`)
        return
      }

      // Load plugin data
      const plugin: Plugin = new Plugin(data, parent)
      this.#plugins[plugin.name] = plugin

      // Load plugin dependencies
      await Promise.all(plugin.dependencies.map((dependency: string) => this.#loadPluginInternal(dependency, plugin.name)))

    } catch (error) {
      LOGGER.warn(`Failed to load plugin from '${url}'`)
      LOGGER.warn(String(error))
    }
  }

  #checkPluginsInternal() {
    this.#definitions = {}
    this.#providers = {}
    this.rootPlugins.forEach(this.#checkPluginDefinitions.bind(this))
    this.rootPlugins.forEach(this.#checkPluginProviders.bind(this))
  }

  #checkPluginDefinitions(plugin: Plugin) {
    plugin.defines.forEach(define => {
      // Not testazble because the definition name includes the plugin name and this is checked before
      /* istanbul ignore next */
      if (this.getDefinition(define.name)) {
        /* istanbul ignore next */
        LOGGER.warn(`Defines '${define.name}' from '${plugin.name}' is already registered from ${this.getDefinition(define.name).plugin}`)
      } else {
        this.#definitions[define.name] = define
      }
    })
    plugin.dependencies.forEach(dependencyUrl => {
      const dependency = this.getPluginByUrl(dependencyUrl)
      this.#checkPluginDefinitions.call(this, dependency!)
    })
  }

  #checkPluginProviders(plugin: Plugin) {

    plugin.provides.forEach(provide => {
      const definition = this.getDefinition(provide.define)
      if (!definition) {
        LOGGER.warn(`Provides '${provide.name}' from '${plugin.name}' has no definition '${provide.define}'`)
      } else {
        const provider = new PluginProvider(plugin.url, definition, provide)
        this.#providers[provider.name] = provider
      }
    })
    plugin.dependencies.forEach(dependencyUrl => {
      const dependency = this.getPluginByUrl(dependencyUrl)
      this.#checkPluginProviders.call(this, dependency!)
    })
  }
}

export default new PluginManager()