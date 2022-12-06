interface Message {
    _serviceId?: string;
    _dispatcherId?: string;
    type: string;
    payload: any;
}
export default Message;
