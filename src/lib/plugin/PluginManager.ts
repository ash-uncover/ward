import Logger, { LogLevels } from '@uncover/js-utils-logger'
import {
  PluginData,
  PluginDataDefine,
  PluginDataDefineAttributes,
  PluginDataDefines,
  PluginDataProvide,
  PluginDataProvideAttributes,
  PluginDataProvides,
  PluginDataProvideElements
} from './model/PluginDataModel'
import Plugin from './object/Plugin'

export interface Plugins {
  [key: string]: PluginData
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

let pluginObjects: any = {}
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

  checkPlugin: (plugin: PluginData) => {
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

  loadPluginDefines: (plugin: PluginData) => {
    const defines: PluginDataDefines = plugin.defines!
    Object.keys(defines).forEach((defineId: string) => {
      const definitionId = `${plugin.name}/${defineId}`
      if (definitions[definitionId]) {
        LOGGER.warn(`Define '${definitionId}' from '${plugin.url}' already registered`)
      } else {
        helpers.loadPluginDefine(plugin, defineId)
      }
    })
  },

  loadPluginDefine: (plugin: PluginData, defineId: string) => {
    const definitionId = `${plugin.name}/${defineId}`
    const define = plugin.defines![defineId]
    definitions[definitionId] = {
      ...define,
      attributes: helpers.loadPluginDefineAttributes(define.attributes)
    }
  },

  loadPluginDefineAttributes: (attributes: PluginDataDefineAttributes) => {
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

  loadPluginProvides: (plugin: PluginData) => {
    const provides: PluginDataProvides = plugin.provides!
    Object.keys(provides).forEach((provideId: string) => {
      if (!definitions[provideId]) {
        LOGGER.warn(`Provide '${provideId}' from '${plugin.url}' is not defined`)
      } else {
        const provide: PluginDataProvide | PluginDataProvide[] = provides[provideId]
        if (Array.isArray(provide)) {
          provide.forEach((prov) => helpers.loadPluginProvide(plugin, provideId, prov))
        } else {
          helpers.loadPluginProvide(plugin, provideId, provide)
        }
      }
    })
  },

  loadPluginProvide: (plugin: PluginData, provideId: string, provide: PluginDataProvide) => {
    const provider: PluginProvider = {
      plugin: plugin.name,
      name: provide.name,
      attributes: {},
      elements: {}
    }
    if (provide.attributes) {
      provider.attributes = helpers.loadPluginProvideAttributes(plugin, provideId, provide.attributes)
    }
    if (provide.elements) {
      provider.elements = helpers.loadPluginProvideElements(plugin, provideId, provide.elements)
    }
    providers[provideId] = providers[provideId] || []
    providers[provideId].push(provider)
  },

  loadPluginProvideAttributes: (
    plugin: PluginData,
    provideId: string,
    attributes: PluginDataProvideAttributes
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
    plugin: PluginData,
    provideId: string,
    elements: PluginDataProvideElements
  ) => {
    return Object.keys(elements).reduce((acc: PluginDataProvideElements, elementId) => {
      const element = elements[elementId]
      acc[elementId] = {
        type: element.type,
        url: `${plugin.url}${element.url}`
      }
      return acc
    }, {})
  },

  loadPluginDependencies: (plugin: PluginData) => {
    return plugin.dependencies!.map((dependency: string) => helpers.loadPluginInternal(dependency, false))
  },

  loadPluginInternal: async (url: string, master: boolean) => {
    try {
      const pluginData = await helpers.fetchPlugin(url)
      helpers.checkPlugin(pluginData)
      if (plugins[pluginData.name]) {
        LOGGER.warn(`Plugin '${pluginData.name}' from '${pluginData.url}' already registered from '${plugins[pluginData.name].url}'`)
        // We dont process anything to prevent cyclic loading
        return Promise.resolve()
      }
      const pluginObject = new Plugin(pluginData);
      pluginObjects[pluginObject.name] = pluginObject
      plugins[pluginData.name] = pluginData
      helpers.loadPluginDefines(pluginData)
      helpers.loadPluginProvides(pluginData)
      const dependencyLoaders = helpers.loadPluginDependencies(pluginData)
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

  static get pluginObjects() {
    return pluginObjects
  }
  static getPluginObject(pluginId: string) {
    return pluginObjects[pluginId]
  }

  static get plugins() {
    return plugins
  }
  static getPlugin(pluginId: string) {
    return plugins[pluginId]
  }

  static get definitions() {
    return definitions
  }
  static getDefinition(definitionId: string) {
    return definitions[definitionId]
  }

  static get providers() {
    return providers
  }
  static getProviders(definitionId: string) {
    return providers[definitionId]
  }
}

export default PluginManager