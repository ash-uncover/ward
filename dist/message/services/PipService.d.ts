import { LogConfig, Logger } from "@uncover/js-utils-logger";
import { Message, MessageService } from "../model/model";
import MessageDispatcher from "../MessageDispatcher";
declare class FrameService implements MessageService {
    #private;
    constructor(dispatcher: MessageDispatcher, wdow: Window, wdowRemote: Window, origin: string, remoteDispatcherId: string, id?: string, logConfig?: LogConfig);
    get id(): string;
    get dispatcherId(): string;
    get remoteDispatcherId(): string;
    get window(): Window;
    get type(): "frame" | "event" | "navigation";
    get logger(): Logger;
    onMessage(message: Message): void;
    sendMessage(message: Message): void;
    terminate(): void;
}
export default FrameService;
