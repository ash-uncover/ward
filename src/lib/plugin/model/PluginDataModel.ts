export interface PluginData {
  name: string
  url: string

  dependencies?: string[]
  defines?: PluginDataDefines
  provides?: PluginDataProvides
}

export interface PluginDataDefines {
  [key: string]: PluginDataDefine
}
export interface PluginDataDefine {
  properties: PluginDataDefineProperties
  attributes: PluginDataDefineAttributes
  elements: PluginDataDefineElements
}
export interface PluginDataDefineProperties {
  [key: string]: string
}
export interface PluginDataDefineAttributes {
  [key: string]: string
}
export interface PluginDataDefineElements {
  [key: string]: PluginDataDefineElement
}
export interface PluginDataDefineElement {

}

export interface PluginDataProvides {
  [key: string]: PluginDataProvide | PluginDataProvide[]
}
export interface PluginDataProvide {
  name: string
  attributes: PluginDataProvideAttributes
  elements: PluginDataProvideElements
}
export interface PluginDataProvideAttributes {
  [key: string]: string | string[]
}
export interface PluginDataProvideElements {
  [key: string]: PluginDataProvideElement
}
export interface PluginDataProvideElement {
  url: string
  type: 'iframe' | 'webcomponent' | 'component'
}
