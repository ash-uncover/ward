/**
 * Plugin
 */
export interface WardPlugin {
  /**
   * The unique identifier for a plugin
   */
  name: string
  /**
   * The url for a plugin
   */
  url: string
  /**
   * Dependencies for the plugin
   *
   * @minItems 0
   */
  dependencies?: string[]
  defines?: WardPluginDefines
  /**
   * Providers
   */
  provides?: {
    [k: string]: WardPluginProvides
  }
}
/**
 * Plugin Defines
 */
export interface WardPluginDefines {
  [k: string]: WardPluginDefine
}
/**
 * Plugin Define
 *
 * This interface was referenced by `WardPluginDefines`'s JSON-Schema definition
 * via the `patternProperty` "^.*$".
 */
export interface WardPluginDefine {
  properties?: WardPluginDefineProperties
  attributes?: WardPluginDefinesAttributes
  elements?: WardPluginDefineElements
}
/**
 * Plugin Define Properties
 */
export interface WardPluginDefineProperties {
  /**
   * Define Property
   *
   * This interface was referenced by `WardPluginDefineProperties`'s JSON-Schema definition
   * via the `patternProperty` "^.*$".
   */
  [k: string]: 'string' | 'string[]' | 'url' | 'url[]' | 'number' | 'number[]' | 'boolean' | 'boolean[]'
}
/**
 * Plugin Define Attributes
 */
export interface WardPluginDefinesAttributes {
  /**
   * Define Attribute
   *
   * This interface was referenced by `WardPluginDefinesAttributes`'s JSON-Schema definition
   * via the `patternProperty` "^.*$".
   */
  [k: string]: 'string' | 'string[]' | 'url' | 'url[]' | 'number' | 'number[]' | 'boolean' | 'boolean[]'
}
/**
 * Plugin Define Elements
 */
export interface WardPluginDefineElements {
  [k: string]: WardPluginDefineElement
}
/**
 * Plugin Define Element
 *
 * This interface was referenced by `WardPluginDefineElements`'s JSON-Schema definition
 * via the `patternProperty` "^.*$".
 */
export interface WardPluginDefineElement {
  properties?: WardPluginDefineElementProperties
  attributes?: WardPluginDefineElementAttributes
  events?: WardPluginDefineElementEvents
  [k: string]: unknown
}
/**
 * Plugin Define Element Properties
 */
export interface WardPluginDefineElementProperties {
  /**
   * Define Element Property
   *
   * This interface was referenced by `WardPluginDefineElementProperties`'s JSON-Schema definition
   * via the `patternProperty` "^.*$".
   */
  [k: string]:
    | string
    | number
    | boolean
    | unknown[]
    | {
        [k: string]: unknown
      }
}
/**
 * Plugin Define Element Attributes
 */
export interface WardPluginDefineElementAttributes {
  /**
   * Define Element Attribute
   *
   * This interface was referenced by `WardPluginDefineElementAttributes`'s JSON-Schema definition
   * via the `patternProperty` "^.*$".
   */
  [k: string]:
    | string
    | number
    | boolean
    | unknown[]
    | {
        [k: string]: unknown
      }
}
/**
 * Plugin Define Element Events
 */
export interface WardPluginDefineElementEvents {
  /**
   * Define Element Event
   *
   * This interface was referenced by `WardPluginDefineElementEvents`'s JSON-Schema definition
   * via the `patternProperty` "^.*$".
   */
  [k: string]: {
    [k: string]: unknown
  }
}
/**
 * Plugin Provides
 *
 * This interface was referenced by `undefined`'s JSON-Schema definition
 * via the `patternProperty` "^.*$".
 */
export interface WardPluginProvides {
  [k: string]: WardPluginProvide
}
/**
 * Plugin Provide
 *
 * This interface was referenced by `WardPluginProvides`'s JSON-Schema definition
 * via the `patternProperty` "^.*$".
 */
export interface WardPluginProvide {
  properties?: WardPluginProvideProperties
  attributes?: WardPluginProvideAttributes
  elements?: WardPluginProvideElements
}
/**
 * Plugin Provide Properties
 */
export interface WardPluginProvideProperties {
  /**
   * Provide Property
   *
   * This interface was referenced by `WardPluginProvideProperties`'s JSON-Schema definition
   * via the `patternProperty` "^.*$".
   */
  [k: string]: (string | number | boolean) | string[] | number[] | boolean[]
}
/**
 * Plugin Provide Attributes
 */
export interface WardPluginProvideAttributes {
  /**
   * Attribute value
   *
   * This interface was referenced by `WardPluginProvideAttributes`'s JSON-Schema definition
   * via the `patternProperty` "^.*$".
   */
  [k: string]: (string | number | boolean) | string[] | number[] | boolean[]
}
/**
 * Plugin Provide Elements
 */
export interface WardPluginProvideElements {
  [k: string]: WardPluginProvideElement
}
/**
 * Plugin Provide Element
 *
 * This interface was referenced by `WardPluginProvideElements`'s JSON-Schema definition
 * via the `patternProperty` "^.*$".
 */
export interface WardPluginProvideElement {
  url: string
  type: 'iframe' | 'webcomponent' | 'component'
  element?: string
}
