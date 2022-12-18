export interface Plugin {
  name: string
  url: string

  dependencies?: string[]
  defines?: PluginDefines
  provides?: PluginProvides
}

export interface PluginDefines {
  [key: string]: PluginDefine
}
export interface PluginDefine {
  properties: PluginDefineProperties
  attributes: PluginDefineAttributes
  elements: PluginDefineElements
}
export interface PluginDefineProperties {
  [key: string]: string
}
export interface PluginDefineAttributes {
  [key: string]: string
}
export interface PluginDefineElements {
  [key: string]: PluginDefineElement
}
export interface PluginDefineElement {

}

export interface PluginProvides {
  [key: string]: PluginProvide | PluginProvide[]
}
export interface PluginProvide {
  name: string
  attributes: PluginProvideAttributes
  elements: PluginProvideElements
}
export interface PluginProvideAttributes {
  [key: string]: string | string[]
}
export interface PluginProvideElements {
  [key: string]: PluginProvideElement
}
export interface PluginProvideElement {
  url: string
  type: 'iframe' | 'webcomponent' | 'component'
}
