import MessageBase from './lib/Message'
import MessageServiceBase from './lib/MessageService'
import MessageDispatcher from './lib/MessageDispatcher'

export type Message = MessageBase
export const MessageService = MessageServiceBase
export default MessageDispatcher

declare global {
  interface Window {
    uncover: any
  }
}

window.uncover = window.uncover || {}
window.uncover.MessageDispatcher = MessageDispatcher
window.uncover.MessageService = MessageService
