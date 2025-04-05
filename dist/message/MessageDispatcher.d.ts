import { LogConfig, Logger } from '@uncover/js-utils-logger';
import { MessageService, Message } from './model/model';
export declare const CONNECTION_REQUEST = "__CONNNECTION_REQUEST__";
export declare const CONNECTION_ACKNOWLEDGE = "__CONNECTION_ACKNOWLEDGE__";
export declare const CONNECTION_CLOSING = "__CONNNECTION_CLOSING__";
export interface MessageDispatcherData {
    services: MessageDispatcherDataServices;
    dispatchers: string[];
}
export interface MessageDispatcherDataServices {
    [key: string]: MessageService;
}
declare class MessageDispatcher implements MessageDispatcherData {
    #private;
    constructor(id?: string, logConfig?: LogConfig);
    get data(): MessageDispatcherData;
    get id(): string;
    get services(): MessageDispatcherDataServices;
    get dispatchers(): string[];
    get logger(): Logger;
    register(listener: (data: MessageDispatcherData) => void): () => void;
    unregister(listener: (data: MessageDispatcherData) => void): void;
    notify(): void;
    terminate(): void;
    reset(): void;
    getService(serviceId: string): MessageService | undefined;
    addService(service: MessageService): () => void;
    removeService(service: MessageService): void;
    sendMessage(message: Message): void;
}
export default MessageDispatcher;
