import { UUID } from '@uncover/js-utils'

import { PluginManager } from './plugin/PluginManager'
import MessageDispatcher from './message/MessageDispatcher'

export { Message, MessageService } from './message/model/model'

class Ward {

  // Attributes //

  #wardId: string

  #pluginManager: PluginManager
  #messageDispatcher: MessageDispatcher

  // Constructors //

  constructor(
    wardId?: string,
    pluginManager?: PluginManager,
    messageDispatcher?: MessageDispatcher
  ) {
    this.#wardId = wardId || UUID.next()
    this.#pluginManager = pluginManager || new PluginManager()
    this.#messageDispatcher = messageDispatcher || new MessageDispatcher()
  }

  // Getters & Setters //

  get id () {
    return this.#wardId
  }

  get data () {
    return {
      ...this.#messageDispatcher.data,
      ...this.#pluginManager.data
    }
  }

  // Public methods //

  reset () {
    this.#pluginManager.reset()
    this.#messageDispatcher.reset()
  }

  loadPlugin(plugin: string) {
    this.#pluginManager.loadPlugin(plugin)
  }

  register(cb: () => void) {
    this.#pluginManager.register(cb)
    this.#messageDispatcher.register(cb)
  }
  unregister(cb: () => void) {
    this.#pluginManager.unregister(cb)
    this.#messageDispatcher.unregister(cb)
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