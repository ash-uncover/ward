import PluginManagerBase from './lib/plugin/PluginManager'

import MessageBase from './lib/message/Message'
import MessageServiceBase from './lib/message/MessageService'
import MessageDispatcher from './lib/message/MessageDispatcher'

export const PluginManager = PluginManagerBase

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
window.uncover.PluginManager = PluginManager
