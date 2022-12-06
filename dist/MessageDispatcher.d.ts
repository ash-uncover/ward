import { IMessageService } from './IMessageService';
import Message from './Message';
declare class MessageDispatcherClass {
    #private;
    constructor(id?: string);
    get id(): string;
    get idShort(): string;
    addService(service: IMessageService): () => void;
    removeService(service: IMessageService): void;
    sendMessage(message: Message): void;
}
declare const MessageDispatcher: MessageDispatcherClass;
export default MessageDispatcher;
