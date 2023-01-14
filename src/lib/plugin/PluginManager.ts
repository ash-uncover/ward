import Logger, { LogLevels } from '@uncover/js-utils-logger'
import { PluginData, PluginDataValidator } from './model/PluginDataModel'
import Plugin from './object/Plugin'
import PluginDefine from './object/PluginDefine'
import PluginProvider from './object/PluginProvider'
import { ArrayUtils } from '@uncover/js-utils'

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

export interface PluginManagerData {
  datas: PluginManagerDatas
  roots: PluginManagerPlugins
  plugins: PluginManagerPlugins
  definitions: PluginManagerDefinitions
  providers: PluginManagerProviders
}
export interface PluginManagerDatas {
  [key: string]: PluginData
}
export interface PluginManagerPlugins {
  [key: string]: Plugin
}
export interface PluginManagerDefinitions {
  [key: string]: PluginDefine
}
export interface PluginManagerProviders {
  [key: string]: PluginProvider
}

class PluginManager implements PluginManagerData {

  // Attributes //

  #listeners: ((data: PluginManagerData) => void)[] = []

  #datas: PluginManagerDatas = {}
  #plugins: PluginManagerPlugins = {}
  #definitions: PluginManagerDefinitions = {}
  #providers: PluginManagerProviders = {}

  // Constructor //

  constructor() {
  }

  // Getters & Setters //

  get data(): PluginManagerData {
    return {
      datas: this.datas,
      roots: this.roots,
      plugins: this.plugins,
      definitions: this.definitions,
      providers: this.providers
    }
  }

  get roots(): PluginManagerPlugins {
    const dependentEntries: string[] = []
    Object.values(this.#plugins).forEach(plugin => {
      plugin.dependencies.forEach(dependency => {
        if (!dependentEntries.includes(dependency.name)) {
          dependentEntries.push(dependency.name)
        }
      })
    })
    return Object.values(this.#plugins).reduce((acc: PluginManagerPlugins, plugin) => {
      if (!dependentEntries.includes(plugin.name)) {
        acc[plugin.name] = plugin
      }
      return acc
    }, {})
  }

  get datas(): PluginManagerDatas {
    return this.#datas
  }
  getData(url: string): PluginData | undefined {
    return this.#datas[url]
  }

  get plugins(): PluginManagerPlugins {
    return this.#plugins
  }
  getPlugin(pluginId: string): Plugin | undefined {
    return this.plugins[pluginId]
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

  register(listener: (data: PluginManagerData) => void) {
    this.#listeners.push(listener)
  }
  unregister(listener: (data: PluginManagerData) => void) {
    this.#listeners = ArrayUtils.removeElement(this.#listeners, listener)
  }
  notify() {
    this.#listeners.forEach(listener => {
      listener(this.data)
    })
  }

  reset() {
    this.#datas = {}
    this.#plugins = {}
    this.#definitions = {}
    this.#providers = {}

    this.notify()
  }

  async loadPlugin(url: string) {
    try {
      await this.#loadPluginInternal.call(this, url)
      // Check all plugins info consistency
      this.#checkPluginsInternal.call(this)
    } catch (error) {
      // Traces have been logged, we dont want to crash the application
    }
    this.notify()
  }

  // Internal Methods //

  async #loadPluginInternal(url: string, parent?: string): Promise<any> {
    if (this.#datas[url]) {
      LOGGER.warn(`URL already loaded: '${url}'`)
      return true
    }

    // Fetch data
    let data: PluginData
    try {
      data = await helpers.fetchPlugin(url)
      this.#datas[url] = data
    } catch (error) {
      LOGGER.warn(`Failed to load plugin from '${url}'`)
      LOGGER.warn(String(error))
      return false
    }

    // Check no plugin with same name exists
    if (this.#plugins[data.name]) {
      const previousUrl = Object.values(this.#datas).find(dat => dat.name === data.name)
      LOGGER.warn(`Plugin '${data.name}' from '${data.url}' already registered from '${previousUrl}'`)
      return false
    }

    // Check data consistency
    const errors: string[] = PluginDataValidator.checkPluginData(data)
    if (errors.length) {
      LOGGER.warn(`Failed to validate plugin from '${url}'`)
      LOGGER.warn('Invalid plugin data: ' + errors.join(', '))
      return false
    }

    // Load plugin data
    const plugin = new Plugin(url, data)
    this.#plugins[data.name] = plugin

    // Load plugin dependencies
    await Promise.allSettled((data.dependencies || []).map((dependency) => {
      return this.#loadPluginInternal(dependency, data.name)
    }))

    LOGGER.warn(`Succesully loaded plugin from '${url}'`)
    return true
  }

  #checkPluginsInternal() {
    this.#definitions = {}
    this.#providers = {}
    Object.values(this.roots).forEach((plugin) => this.#checkPluginDefinitions(plugin))
    Object.values(this.roots).forEach((plugin) => this.#checkPluginProviders(plugin))
  }

  #checkPluginDefinitions(plugin: Plugin) {
    plugin.defines.forEach(define => {
      // Not testable because the definition name includes the plugin name and this is checked before
      /* istanbul ignore next */
      if (this.getDefinition(define.name)) {
        /* istanbul ignore next */
        LOGGER.warn(`Defines '${define.name}' from '${plugin.name}' is already registered from ${this.getDefinition(define.name).plugin}`)
      } else {
        this.#definitions[define.name] = define
      }
    })
    plugin.dependencies.forEach(dependency => {
      this.#checkPluginDefinitions.call(this, dependency)
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
    plugin.dependencies.forEach(dependency => {
      this.#checkPluginProviders.call(this, dependency)
    })
  }
}

export default new PluginManager()