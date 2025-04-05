import { WardPluginProvideElement } from "../loader/model/PluginDataModel";
declare class PluginProvideElement {
    #private;
    constructor(plugin: string, name: string, data: WardPluginProvideElement);
    get plugin(): string;
    get name(): string;
    get url(): string;
    get type(): string;
    get element(): string | undefined;
}
export default PluginProvideElement;
