import MessageBase from './lib/Message'
import MessageServiceBase from './lib/MessageService'
import MessageDispatcher from './lib/MessageDispatcher'

export type Message = MessageBase
export const MessageService = MessageServiceBase
export default MessageDispatcher