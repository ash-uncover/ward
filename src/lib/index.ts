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

class WardClass {

  // Attributes //

  #wardId: string

  #pluginManager: PluginManager
  #messageDispatcher: MessageDispatcher

  #listeners: ((data: WardData) => void)[] = []
  #listenersPlugins: ((data: WardData) => void)[] = []
  #listenersServices: ((data: WardData) => void)[] = []

  // Constructors //

  constructor(
    wardId?: string,
    pluginManager?: PluginManager,
    messageDispatcher?: MessageDispatcher
  ) {
    this.#wardId = wardId || UUID.next()
    this.#pluginManager = pluginManager || new PluginManager()
    this.#messageDispatcher = messageDispatcher || new MessageDispatcher()
    this.#pluginManager.register(this.notifyPlugins.bind(this))
    this.#messageDispatcher.register(this.notifyServices.bind(this))
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

  registerPlugins(listener: (data: WardData) => void) {
    this.#listenersPlugins.push(listener)
    return () => this.unregister(listener)
  }
  unregisterPlugins(listener: (data: WardData) => void) {
    this.#listenersPlugins = ArrayUtils.removeElement(this.#listenersPlugins, listener)
  }
  notifyPlugins() {
    this.#listenersPlugins.forEach(listener => {
      listener(this.data)
    })
    this.#listeners.forEach(listener => {
      listener(this.data)
    })
  }

  registerServices(listener: (data: WardData) => void) {
    this.#listenersServices.push(listener)
    return () => this.unregister(listener)
  }
  unregisterServices(listener: (data: WardData) => void) {
    this.#listenersServices = ArrayUtils.removeElement(this.#listenersServices, listener)
  }
  notifyServices() {
    this.#listenersServices.forEach(listener => {
      listener(this.data)
    })
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

  addService(id?: string): EventService {
    return new ServiceEvent(this.#messageDispatcher, id)
  }
}

let WardInstance: WardClass
declare global {
  interface Window {
    uncover: any
  }
}
if (!window.uncover?.ward) {
  WardInstance = new WardClass()
  window.uncover = window.uncover || {}
  window.uncover.ward = WardInstance
} else {
  WardInstance = window.uncover.ward
}

export default WardInstance