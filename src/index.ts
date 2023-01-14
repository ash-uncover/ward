import * as PluginModelBase from './lib/plugin/model/PluginDataModel'
import PluginManagerBase, { PluginManagerData as PluginManagerDataBase } from './lib/plugin/PluginManager'

import MessageBase from './lib/message/Message'
import MessageServiceBase from './lib/message/MessageService'
import MessageDispatcher from './lib/message/MessageDispatcher'

export const PluginModel = PluginModelBase
export const PluginManager = PluginManagerBase
export type PluginManagerData = PluginManagerDataBase

export type Message = MessageBase
export const MessageService = MessageServiceBase
export default MessageDispatcher