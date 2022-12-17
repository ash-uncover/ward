import * as PluginModelBase from './lib/plugin/PluginDefinitionModel'
import PluginManagerBase from './lib/plugin/PluginManager'

import MessageBase from './lib/message/Message'
import MessageServiceBase from './lib/message/MessageService'
import MessageDispatcher from './lib/message/MessageDispatcher'

export const PluginModel = PluginModelBase
export const PluginManager = PluginManagerBase

export type Message = MessageBase
export const MessageService = MessageServiceBase
export default MessageDispatcher