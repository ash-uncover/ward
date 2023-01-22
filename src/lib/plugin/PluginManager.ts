import Logger, { LogLevels } from '@uncover/js-utils-logger'
import Plugin from './object/Plugin'
import PluginDefine from './object/PluginDefine'
import PluginProvider from './object/PluginProvider'
import { ArrayUtils } from '@uncover/js-utils'
import { WardPlugin } from './loader/model/PluginDataModel'
import { PluginLoader } from './loader/PluginLoader'

const LOGGER = new Logger('PluginManager', LogLevels.WARN)

export interface PluginManagerData {
  roots: PluginManagerPlugins
  plugins: PluginManagerPlugins
  definitions: PluginManagerDefinitions
  providers: PluginManagerProviders
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

  #loader = new PluginLoader()

  #retryDelay: number = -1
  #retryInterval: any

  #listeners: ((data: PluginManagerData) => void)[] = []

  #plugins: PluginManagerPlugins = {}
  #definitions: PluginManagerDefinitions = {}
  #providers: PluginManagerProviders = {}

  // Constructor //

  constructor() {
  }

  // Getters & Setters //

  get retryDelay() {
    return this.#retryDelay
  }
  set retryDelay(delay: number) {
    this.#retryDelay = delay
  }

  get data(): PluginManagerData {
    return {
      roots: this.roots,
      plugins: this.plugins,
      definitions: this.definitions,
      providers: this.providers
    }
  }

  getData(url: string) {
    return this.#loader.getData(url)
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
    this.#loader.reset()
    this.#plugins = {}
    this.#definitions = {}
    this.#providers = {}

    this.notify()
  }

  async loadPlugin(url: string) {
    clearInterval(this.#retryInterval)
    try {
      await this.#loadPluginInternal.call(this, url)
      // Check all plugins info consistency
      this.#checkPluginsInternal.call(this)
    } catch (error) {
      // Traces have been logged, we dont want to crash the application
    }
    if (this.#retryDelay > 0) {
      this.#retryInterval = setInterval(() => {
        this.reloadPlugins()
      }, this.#retryDelay)
    }
    this.notify()
  }

  async reloadPlugins() {
    const rootUrls = Object.values(this.roots).map(plugin => plugin.loadUrl)

    this.#plugins = {}
    this.#definitions = {}
    this.#providers = {}

    rootUrls.forEach(async (url) => {
      await this.loadPlugin(url)
    })
  }

  // Internal Methods //

  async #loadPluginInternal(url: string, parent?: string): Promise<any> {
    if (this.#loader.hasData(url)) {
      LOGGER.warn(`URL already loaded: '${url}'`)
      return true
    }

    if (!this.#loader.load(url)) {
      LOGGER.warn(`Failed to load plugin from: '${url}'`)
      LOGGER.warn(this.#loader.getErrors(url).join('\n'))
      return false
    }

    // Fetch data
    const data: WardPlugin = this.#loader.getData(url)!

    // Check no plugin with same name exists
    if (this.#plugins[data.name]) {
      const previousUrl = this.#plugins[data.name].loadUrl
      LOGGER.warn(`Plugin '${data.name}' from '${data.url}' already registered from '${previousUrl}'`)
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