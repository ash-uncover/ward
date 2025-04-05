import { WardPlugin } from '../loader/model/PluginDataModel';
import PluginDefine from './PluginDefine';
import PluginProvide from './PluginProvide';
declare class Plugin {
    #private;
    constructor(loadUrl: string, data: WardPlugin);
    get loadUrl(): string;
    get name(): string;
    get url(): string;
    get dependencies(): string[];
    get defines(): PluginDefine[];
    get provides(): PluginProvide[];
}
export default Plugin;
