export interface Message {
    _serviceId?: string;
    _dispatcherId?: string;
    type: string;
    payload: any;
}
type MessageServiceType = 'event' | 'frame' | 'navigation';
export declare const MessageServiceTypes: {
    EVENT: MessageServiceType;
    FRAME: MessageServiceType;
    NAVIGATION: MessageServiceType;
};
export interface MessageService {
    id: string;
    type: MessageServiceType;
    terminate: () => void;
    onMessage: (message: Message) => void;
    sendMessage: (message: Message) => void;
}
export {};
