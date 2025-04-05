declare class PluginProvideAttribute {
    #private;
    constructor(plugin: string, name: string, value: string | string[] | number | number[] | boolean | boolean[]);
    get plugin(): string;
    get name(): string;
    get value(): string | number | boolean | string[] | number[] | boolean[];
}
export default PluginProvideAttribute;
