import { Logger } from "@uncover/js-utils-logger/dist/Logger";
import PluginDefine from "./PluginDefine";
import PluginProvide from "./PluginProvide";
import PluginProviderAttribute from "./PluginProviderAttribute";
import PluginProviderElement from "./PluginProviderElement";
import { LogConfig } from "@uncover/js-utils-logger";
declare class PluginProvider {
    #private;
    constructor(pluginUrl: string, definition: PluginDefine, provide: PluginProvide, logConfig?: LogConfig);
    get plugin(): string;
    get definition(): string;
    get name(): string;
    get logger(): Logger;
    get attributes(): {
        [key: string]: any;
    };
    getAttributes(): PluginProviderAttribute[];
    getAttribute(attributeId: string): any;
    get elements(): {
        [key: string]: {
            plugin: string;
            url: string;
            type: string;
            element: string;
        };
    };
    getElements(): PluginProviderElement[];
    getElement(elementId: string): {
        plugin: string;
        url: string;
        type: string;
        element: string;
    };
}
export default PluginProvider;
