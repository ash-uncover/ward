import Logger, { LogLevels } from '@uncover/js-utils-logger'
import {
  Plugin,
  PluginDefine,
  PluginDefineAttributes,
  PluginDefines,
  PluginProvide,
  PluginProvideAttributes,
  PluginProvides,
  PluginProvideElements as PluginProvideElements
} from './PluginDefinitionModel'

export interface Plugins {
  [key: string]: Plugin
}

export interface PluginDefinitions {
  [key: string]: PluginDefinition
}
export interface PluginDefinition {
  properties: PluginDefinitionProperties
  attributes: PluginDefinitionAttributes
  elements: PluginDefinitionElements
}
export interface PluginDefinitionProperties {
  [key: string]: string
}
export interface PluginDefinitionAttributes {
  [key: string]: PluginDefinitionAttribute
}
export interface PluginDefinitionAttribute {
  type: string
  mandatory: boolean
  array: boolean
}
export interface PluginDefinitionElements {
  [key: string]: PluginDefinitionElement
}
export interface PluginDefinitionElement {

}

export interface PluginProviders {
  [key: string]: PluginProvider[]
}
export interface PluginProvider {
  plugin: string
  name: string
  attributes: PluginProviderAttributes
  elements: PluginProviderElements
}
export interface PluginProviderAttributes {
  [key: string]: any
}
export interface PluginProviderElements {
  [key: string]: PluginProviderElement
}
export interface PluginProviderElement {
  type: string
  url: string
}

const LOGGER = new Logger('PluginManager', LogLevels.DEBUG)

let plugins: Plugins = {}
let definitions: PluginDefinitions = {}
let providers: PluginProviders = {}

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
  },

  checkPlugin: (plugin: Plugin) => {
    if (!plugin) {
      throw new Error('[checkPlugin] plugin information is not defined')
    }
    if (!plugin.name) {
      throw new Error('[checkPlugin] plugin name is missing')
    }
    if (!plugin.url) {
      throw new Error('[checkPlugin] plugin url is missing')
    }

    if (!plugin.dependencies) {
      plugin.dependencies = []
    }
    if (!plugin.defines) {
      plugin.defines = {}
    }
    if (!plugin.provides) {
      plugin.provides = {}
    }
  },

  loadPluginDefines: (plugin: Plugin) => {
    const defines: PluginDefines = plugin.defines!
    Object.keys(defines).forEach((defineId: string) => {
      const definitionId = `${plugin.name}/${defineId}`
      if (definitions[definitionId]) {
        LOGGER.warn(`Define '${definitionId}' from '${plugin.url}' already registered`)
      } else {
        helpers.loadPluginDefine(plugin, defineId)
      }
    })
  },

  loadPluginDefine: (plugin: Plugin, defineId: string) => {
    const definitionId = `${plugin.name}/${defineId}`
    const define = plugin.defines![defineId]
    definitions[definitionId] = {
      ...define,
      attributes: helpers.loadPluginDefineAttributes(define.attributes)
    }
  },

  loadPluginDefineAttributes: (attributes: PluginDefineAttributes) => {
    return Object.keys(attributes).reduce((acc: any, attributeId: string) => {
      let attributeName = attributeId
      let attributeType = attributes[attributeId]
      let mandatory = true
      let array = false
      if (attributeName.endsWith('?')) {
        mandatory = false
        attributeName = attributeName.substring(0, attributeName.length - 1)
      }
      if (attributeType.endsWith('[]')) {
        array = true
        attributeType = attributeType.substring(0, attributeType.length - 2)
      }
      acc[attributeName] = {
        type: attributeType,
        mandatory,
        array,
      }
      return acc
    }, {})
  },

  loadPluginProvides: (plugin: Plugin) => {
    const provides: PluginProvides = plugin.provides!
    Object.keys(provides).forEach((provideId: string) => {
      if (!definitions[provideId]) {
        LOGGER.warn(`Provide '${provideId}' from '${plugin.url}' is not defined`)
      } else {
        const provide: PluginProvide | PluginProvide[] = provides[provideId]
        if (Array.isArray(provide)) {
          provide.forEach((prov) => helpers.loadPluginProvide(plugin, provideId, prov))
        } else {
          helpers.loadPluginProvide(plugin, provideId, provide)
        }
      }
    })
  },

  loadPluginProvide: (plugin: Plugin, provideId: string, provide: PluginProvide) => {
    const provider: PluginProvider = {
      plugin: plugin.name,
      name: provide.name,
      attributes: helpers.loadPluginProvideAttributes(plugin, provideId, provide.attributes),
      elements: helpers.loadPluginProvideElements(plugin, provideId, provide.elements),
    }
    providers[provideId] = providers[provideId] || []
    providers[provideId].push(provider)
  },

  loadPluginProvideAttributes: (
    plugin: Plugin,
    provideId: string,
    attributes: PluginProvideAttributes
  ) => {
    const attributeTypes = definitions[provideId].attributes
    return Object.keys(attributes).reduce((acc: any, attributeId: string) => {
      const attributeType = attributeTypes[attributeId]
      const attributeValue = attributes[attributeId]
      switch (attributeType.type) {
        case 'url': {
          if (attributeType.array && Array.isArray(attributeValue)) {
            acc[attributeId] = attributeValue.map((value) => `${plugin.url}${value}`)
          } else {
            acc[attributeId] = `${plugin.url}${attributeValue}`
          }
          break
        }
        default: {
          acc[attributeId] = attributeValue
          break
        }
      }
      return acc
    }, {})
  },

  loadPluginProvideElements: (
    plugin: Plugin,
    provideId: string,
    elements: PluginProvideElements
  ) => {
    return Object.keys(elements).reduce((acc: PluginProvideElements, elementId) => {
      const element = elements[elementId]
      acc[elementId] = {
        type: element.type,
        url: `${plugin.url}${element.url}`
      }
      return acc
    }, {})
  },

  loadPluginDependencies: (plugin: Plugin) => {
    return plugin.dependencies!.map((dependency: string) => helpers.loadPluginInternal(dependency, false))
  },

  loadPluginInternal: async (url: string, master: boolean) => {
    try {
      const plugin = await helpers.fetchPlugin(url)
      helpers.checkPlugin(plugin)
      if (plugins[plugin.name]) {
        LOGGER.warn(`Plugin '${plugin.name}' from '${plugin.url}' already registered from '${plugins[plugin.name].url}'`)
        // We dont process anything to prevent cyclic loading
        return Promise.resolve()
      }
      plugins[plugin.name] = plugin
      helpers.loadPluginDefines(plugin)
      helpers.loadPluginProvides(plugin)
      const dependencyLoaders = helpers.loadPluginDependencies(plugin)
      await Promise.all(dependencyLoaders)

    } catch (error) {
      LOGGER.warn(`Failed to load plugin from '${url}'`)
      LOGGER.warn(String(error))
    }
  },

  reset: () => {
    plugins = {}
    definitions = {}
    providers = {}
  }
}

export class PluginManager {
  static async loadPlugin(url: string) {
    await helpers.loadPluginInternal(url, true)
  }
  static get plugins() {
    return plugins
  }
  static get definitions() {
    return definitions
  }
  static get providers() {
    return providers
  }

  static getProviders(entity: string) {
    return providers[entity]
  }
}

export default PluginManager