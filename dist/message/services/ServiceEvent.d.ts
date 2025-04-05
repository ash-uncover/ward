import { LogConfig, Logger } from "@uncover/js-utils-logger";
import { Message, MessageService } from "../model/model";
import MessageDispatcher from "../MessageDispatcher";
export interface EventService extends MessageService {
    addHandler: (handler: (message: Message) => void) => (message: Message) => void;
    removeHandler: (handler: (message: Message) => void) => void;
}
export declare class ServiceEvent implements EventService {
    #private;
    constructor(dispatcher: MessageDispatcher, id?: string, logConfig?: LogConfig);
    get id(): string;
    get dispatcherId(): string;
    get type(): "frame" | "event" | "navigation";
    get logger(): Logger;
    terminate(): void;
    addHandler(handler: (message: Message) => void): () => void;
    removeHandler(handler: (message: Message) => void): void;
    onMessage(message: Message): void;
    sendMessage(message: Message): void;
}
