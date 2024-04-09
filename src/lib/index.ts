import { ArrayUtils, UUID } from '@uncover/js-utils'

import PluginManager, {
  PluginManagerData
} from './plugin/PluginManager'
import MessageDispatcher, {
  MessageDispatcherData
} from './message/MessageDispatcher'
import {
  ServiceEvent,
  EventService
} from './message/services/ServiceEvent'

export {
  Message,
  MessageService
} from './message/model/model'
export {
  ServiceEvent,
  EventService
} from './message/services/ServiceEvent'

export interface WardData extends MessageDispatcherData, PluginManagerData {

}

class Ward {

  // Attributes //

  #wardId: string

  #pluginManager: PluginManager
  #messageDispatcher: MessageDispatcher

  #listeners: ((data: WardData) => void)[] = []

  // Constructors //

  constructor(
    wardId?: string,
    pluginManager?: PluginManager,
    messageDispatcher?: MessageDispatcher
  ) {
    this.#wardId = wardId || UUID.next()
    this.#pluginManager = pluginManager || new PluginManager()
    this.#messageDispatcher = messageDispatcher || new MessageDispatcher()
    this.#pluginManager.register(this.notify.bind(this))
    this.#messageDispatcher.register(this.notify.bind(this))
  }

  // Getters & Setters //

  get id() {
    return this.#wardId
  }

  get data(): WardData {
    return {
      ...this.#messageDispatcher.data,
      ...this.#pluginManager.data
    }
  }

  // Public methods //

  register(listener: (data: WardData) => void) {
    this.#listeners.push(listener)
    return () => this.unregister(listener)
  }
  unregister(listener: (data: WardData) => void) {
    this.#listeners = ArrayUtils.removeElement(this.#listeners, listener)
  }
  notify() {
    this.#listeners.forEach(listener => {
      listener(this.data)
    })
  }

  reset() {
    this.#pluginManager.reset()
    this.#messageDispatcher.reset()
  }

  loadPlugin(plugin: string) {
    this.#pluginManager.loadPlugin(plugin)
  }
  unloadPlugin(plugin: string) {
    this.#pluginManager.unloadPlugin(plugin)
  }
  unexcludePlugin(plugin: string) {
    this.#pluginManager.unexcludePlugin(plugin)
  }

  addService(id?: string): EventService {
    return new ServiceEvent(this.#messageDispatcher, id)
  }
}

let WardInstance
declare global {
  interface Window {
    uncover: any
  }
}
if (!window.uncover?.ward) {
  WardInstance = new Ward()
  window.uncover = window.uncover || {}
  window.uncover.ward = WardInstance
} else {
  WardInstance = window.uncover.ward
}

export default WardInstance