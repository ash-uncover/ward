import { LogConfig, Logger } from '@uncover/js-utils-logger';
import Plugin from './object/Plugin';
import PluginDefine from './object/PluginDefine';
import PluginProvider from './object/PluginProvider';
import { WardPlugin } from './loader/model/PluginDataModel';
import { IPluginLoader, PluginLoadState } from './loader/PluginLoader';
export interface PluginManagerData {
    urls: Record<string, PluginManagerDataUrl>;
    roots: Record<string, Plugin>;
    plugins: Record<string, Plugin>;
    definitions: Record<string, PluginDefine>;
    providers: Record<string, PluginProvider>;
}
export interface PluginManagerDataUrl {
    state: PluginLoadState;
    errors: string[];
    data?: WardPlugin;
}
declare class PluginManager implements PluginManagerData {
    #private;
    constructor(loader?: IPluginLoader, logConfig?: LogConfig);
    get logger(): Logger;
    get retryDelay(): number;
    set retryDelay(delay: number);
    get data(): PluginManagerData;
    get urls(): Record<string, PluginManagerDataUrl>;
    getData(url: string): WardPlugin | undefined;
    getState(url: string): PluginLoadState;
    getErrors(url: string): string[];
    get roots(): Record<string, Plugin>;
    get plugins(): Record<string, Plugin>;
    getPlugin(pluginId: string): Plugin | undefined;
    getPluginByUrl(pluginUrl: string): Plugin | undefined;
    get definitions(): Record<string, PluginDefine>;
    getDefinition(definitionId: string): PluginDefine;
    get providers(): Record<string, PluginProvider>;
    getProviders(definitionId: string): PluginProvider[];
    getProvider(providerId: string): PluginProvider;
    register(listener: (data: PluginManagerData) => void): () => void;
    unregister(listener: (data: PluginManagerData) => void): void;
    notify(): void;
    reset(notify?: boolean): void;
    loadPlugin(url: string, notify?: boolean): Promise<void>;
    unloadPlugin(url: string): Promise<void>;
    reloadPlugins(): Promise<void>;
}
export default PluginManager;
