import * as PluginModelBase from './plugin/model/PluginDataModel'
import PluginManagerBase, { PluginManagerData as PluginManagerDataBase } from './plugin/PluginManager'

import MessageBase from './message/Message'
import MessageServiceBase from './message/MessageService'
import MessageDispatcher from './message/MessageDispatcher'

export const PluginModel = PluginModelBase
export const PluginManager = PluginManagerBase
export type PluginManagerData = PluginManagerDataBase

export type Message = MessageBase
export const MessageService = MessageServiceBase
export default MessageDispatcher