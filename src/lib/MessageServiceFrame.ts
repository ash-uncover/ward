import { UUID } from '@uncover/js-utils'
import Logger, { LogLevels } from '@uncover/js-utils-logger'

import IMessageService from './IMessageService'
import Message from './Message'
import MessageDispatcher, { getDispatcherId } from './MessageDispatcher'

const LOGGER = new Logger('MessageServiceFrame', LogLevels.WARN)

class MessageServiceFrame implements IMessageService {

  // Attributes //

  #id: string
  #dispatcherId: string
  #window: Window

  // Constructor //

  constructor(dispatcherId: string, wdow: Window, id?: string) {
    this.#dispatcherId = dispatcherId
    this.#id = id || `message-service-frame-${UUID.next()}`
    this.#window = wdow
    window.addEventListener(
      'message',
      this.#handleMessage.bind(this)
    )
  }

  // Getters & Setters //

  get id() {
    return this.#id
  }

  get window() {
    return this.#window
  }


  // Public Methods //

  onMessage(message: Message) {
    LOGGER.info(`[${this.id}] onMessage`)
    if (this.window.closed) {
      MessageDispatcher.removeService(this)
    } else {
      this.window.postMessage({
        ...message,
        _serviceId: this.#id
      }, '*')
    }
  }

  sendMessage(message: Message) {
    LOGGER.info(`[${this.id}] sendMessage`)
    MessageDispatcher.sendMessage({
      ...message,
      _serviceId: this.id,
    })
  }

  // Private Methods //

  #handleMessage(event: MessageEvent) {
    const data = event.data || {}
    if (data._serviceId && data._dispatcherId && data._dispatcherId === this.#dispatcherId) {
      this.sendMessage({
        _serviceId: this.#id,
        type: data.type,
        payload: data.payload
      })
    }
  }
}

export default MessageServiceFrame