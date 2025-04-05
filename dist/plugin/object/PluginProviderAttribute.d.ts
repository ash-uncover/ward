import PluginDefineAttribute from "./PluginDefineAttribute";
import PluginProvideAttribute from "./PluginProvideAttribute";
declare class PluginProviderAttribute {
    #private;
    constructor(pluginUrl: string, attributeDefinition: PluginDefineAttribute, attribute: PluginProvideAttribute);
    get name(): string;
    get type(): string;
    get mandatory(): boolean;
    get array(): boolean;
    get value(): any;
}
export default PluginProviderAttribute;
