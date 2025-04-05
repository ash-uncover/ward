import { WardPluginProvide } from '../loader/model/PluginDataModel';
import PluginProvideAttribute from './PluginProvideAttribute';
import PluginProvideElement from './PluginProvideElement';
declare class PluginProvide {
    #private;
    constructor(plugin: string, define: string, name: string, data: WardPluginProvide);
    get plugin(): string;
    get define(): string;
    get name(): string;
    get attributes(): PluginProvideAttribute[];
    getAttribute(attributeId: string): PluginProvideAttribute | undefined;
    get elements(): PluginProvideElement[];
    getElement(elementId: string): PluginProvideElement | undefined;
}
export default PluginProvide;
