import { WardPlugin } from './model/PluginDataModel';
export type PluginLoadState = 'NONE' | 'LOAD_ERROR' | 'VALIDATION_ERROR' | 'LOADED' | 'EXCLUDED';
export declare const PluginLoadStates: {
    NONE: PluginLoadState;
    EXCLUDED: PluginLoadState;
    LOAD_ERROR: PluginLoadState;
    VALIDATION_ERROR: PluginLoadState;
    LOADED: PluginLoadState;
};
export interface WardPluginState {
    url: string;
    state: PluginLoadState;
    errors: string[];
    data?: WardPlugin;
    loadDate: number;
}
export interface IPluginLoader {
    urls: string[];
    reset: () => void;
    hasData: (url: string) => boolean;
    isLoaded: (url: string) => boolean;
    getData: (url: string) => WardPlugin | undefined;
    getErrors: (url: string) => string[];
    getState: (url: string) => PluginLoadState;
    load: (url: string) => Promise<boolean>;
    exclude: (url: string) => void;
    include: (url: string) => void;
}
declare class PluginLoader implements IPluginLoader {
    #private;
    constructor();
    get urls(): string[];
    get excludedUrls(): string[];
    reset(resetExcluded?: boolean): void;
    hasData(url: string): boolean;
    isLoaded(url: string): boolean;
    getData(url: string): WardPlugin | undefined;
    getErrors(url: string): string[];
    getState(url: string): PluginLoadState;
    exclude(url: string): void;
    include(url: string): void;
    load(url: string): Promise<boolean>;
}
export default PluginLoader;
