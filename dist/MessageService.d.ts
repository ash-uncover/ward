import { IMessageService } from './IMessageService';
import Message from './Message';
declare class MessageService implements IMessageService {
    #private;
    constructor(id?: string);
    get id(): string;
    get idShort(): string;
    init(handleMessage: ((message: Message) => void)): () => void;
    onMessage(message: Message): void;
    sendMessage(message: Message): void;
}
export default MessageService;
