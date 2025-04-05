import { WardPluginDefineElement } from "../loader/model/PluginDataModel";
import PluginDefineElementAttribute from "./PluginDefineElementAttribute";
import PluginDefineElementEvent from "./PluginDefineElementEvent";
import PluginDefineElementProperty from "./PluginDefineElementProperty";
declare class PluginDefineElement {
    #private;
    constructor(plugin: string, name: string, data: WardPluginDefineElement);
    get plugin(): string;
    get name(): string;
    get attributes(): PluginDefineElementAttribute[];
    get properties(): PluginDefineElementProperty[];
    get events(): PluginDefineElementEvent[];
}
export default PluginDefineElement;
