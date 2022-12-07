import MessageBase from './Message'
import MessageServiceBase from './MessageService'
import MessageDispatcher from './MessageDispatcher'

export type Message = MessageBase
export const MessageService = MessageServiceBase
export default MessageDispatcher