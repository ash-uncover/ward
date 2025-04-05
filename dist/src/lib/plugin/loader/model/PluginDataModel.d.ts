export interface WardPlugin {
    name: string;
    url: string;
    dependencies?: string[];
    defines?: WardPluginDefines;
    provides?: {
        [k: string]: WardPluginProvides;
    };
}
export interface WardPluginDefines {
    [k: string]: WardPluginDefine;
}
export interface WardPluginDefine {
    properties?: WardPluginDefineProperties;
    attributes?: WardPluginDefinesAttributes;
    elements?: WardPluginDefineElements;
}
export interface WardPluginDefineProperties {
    [k: string]: 'string' | 'string[]' | 'url' | 'url[]' | 'number' | 'number[]' | 'boolean' | 'boolean[]';
}
export interface WardPluginDefinesAttributes {
    [k: string]: 'string' | 'string[]' | 'url' | 'url[]' | 'number' | 'number[]' | 'boolean' | 'boolean[]';
}
export interface WardPluginDefineElements {
    [k: string]: WardPluginDefineElement;
}
export interface WardPluginDefineElement {
    properties?: WardPluginDefineElementProperties;
    attributes?: WardPluginDefineElementAttributes;
    events?: WardPluginDefineElementEvents;
}
export interface WardPluginDefineElementProperties {
    [k: string]: string | number | boolean | unknown[] | {
        [k: string]: unknown;
    };
}
export interface WardPluginDefineElementAttributes {
    [k: string]: string | number | boolean | unknown[] | {
        [k: string]: unknown;
    };
}
export interface WardPluginDefineElementEvents {
    [k: string]: {
        [k: string]: unknown;
    };
}
export interface WardPluginProvides {
    [k: string]: WardPluginProvide;
}
export interface WardPluginProvide {
    properties?: WardPluginProvideProperties;
    attributes?: WardPluginProvideAttributes;
    elements?: WardPluginProvideElements;
}
export interface WardPluginProvideProperties {
    [k: string]: (string | number | boolean) | string[] | number[] | boolean[];
}
export interface WardPluginProvideAttributes {
    [k: string]: (string | number | boolean) | string[] | number[] | boolean[];
}
export interface WardPluginProvideElements {
    [k: string]: WardPluginProvideElement;
}
export interface WardPluginProvideElement {
    url: string;
    type: 'iframe' | 'webcomponent' | 'component';
    element?: string;
}
