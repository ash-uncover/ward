import PluginManager, { PluginManagerData } from "./plugin/PluginManager";
import MessageDispatcher, { MessageDispatcherData } from "./message/MessageDispatcher";
import { EventService } from "./message/services/ServiceEvent";
import { LogConfig } from "@uncover/js-utils-logger";
export { Message, MessageService } from "./message/model/model";
export { ServiceEvent, EventService } from "./message/services/ServiceEvent";
export interface WardData extends MessageDispatcherData, PluginManagerData {
}
declare global {
    interface Window {
        documentPictureInPicture?: any;
    }
}
declare class WardClass {
    #private;
    constructor(wardId?: string, pluginManager?: PluginManager, messageDispatcher?: MessageDispatcher);
    get id(): string;
    get data(): WardData;
    get logConfig(): LogConfig;
    register(listener: (data: WardData) => void): () => void;
    unregister(listener: (data: WardData) => void): void;
    registerPlugins(listener: (data: WardData) => void): () => void;
    unregisterPlugins(listener: (data: WardData) => void): void;
    notifyPlugins(): void;
    registerServices(listener: (data: WardData) => void): () => void;
    unregisterServices(listener: (data: WardData) => void): void;
    notifyServices(): void;
    reset(): void;
    loadPlugin(plugin: string): void;
    unloadPlugin(plugin: string): void;
    addService(id?: string): EventService;
}
declare let WardInstance: WardClass;
declare global {
    interface Window {
        uncover: any;
    }
}
export default WardInstance;
