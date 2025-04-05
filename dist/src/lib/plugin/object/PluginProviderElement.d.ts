import PluginDefineElement from './PluginDefineElement';
import PluginProvideElement from './PluginProvideElement';
declare class PluginProviderElement {
    #private;
    constructor(pluginUrl: string, elementDefinition: PluginDefineElement, element: PluginProvideElement);
    get name(): string;
    get url(): string;
    get type(): string;
    get element(): string | undefined;
}
export default PluginProviderElement;
