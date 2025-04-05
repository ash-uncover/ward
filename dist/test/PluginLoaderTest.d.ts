import { IPluginLoader } from '../src/lib/plugin/loader/PluginLoader';
declare class PluginLoaderTest implements IPluginLoader {
    #private;
    constructor();
    get urls(): string[];
    reset(): void;
    hasData(url: string): boolean;
    isLoaded(url: string): boolean;
    getData(url: string): import("../src/lib/plugin/loader/model/PluginDataModel").WardPlugin | undefined;
    getErrors(url: string): string[];
    getState(url: string): import("../src/lib/plugin/loader/PluginLoader").PluginLoadState;
    exclude(url: string): void;
    include(url: string): void;
    load(url: string): Promise<boolean>;
}
export default PluginLoaderTest;
