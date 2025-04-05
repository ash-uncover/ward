import { WardPluginDefine } from '../loader/model/PluginDataModel';
import PluginDefineAttribute from './PluginDefineAttribute';
import PluginDefineElement from './PluginDefineElement';
import PluginDefineProperty from './PluginDefineProperty';
declare class PluginDefine {
    #private;
    constructor(plugin: string, name: string, data: WardPluginDefine);
    get plugin(): string;
    get name(): string;
    get properties(): PluginDefineProperty[];
    getProperty(propertyId: string): PluginDefineProperty | undefined;
    get attributes(): PluginDefineAttribute[];
    getAttribute(attributeId: string): PluginDefineAttribute | undefined;
    get elements(): PluginDefineElement[];
    getElement(elementId: string): PluginDefineElement | undefined;
}
export default PluginDefine;
