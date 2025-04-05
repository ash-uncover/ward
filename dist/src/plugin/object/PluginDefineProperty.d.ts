declare class PluginDefineProperty {
    #private;
    constructor(plugin: string, name: string, type: string);
    get plugin(): string;
    get name(): string;
    get type(): string;
    get array(): boolean;
    get mandatory(): boolean;
}
export default PluginDefineProperty;
