import { UUID } from '@uncover/js-utils'
import Logger, { LogLevels } from '@uncover/js-utils-logger'

import IMessageService from './IMessageService'
import Message from './Message'
import MessageDispatcher, { CONNECTION_CLOSING, getDispatcherId } from './MessageDispatcher'

const LOGGER = new Logger('MessageServiceFrame', LogLevels.WARN)

class MessageServiceFrame implements IMessageService {

  // Attributes //

  #id: string
  #dispatcherId: string
  #window: Window
  #origin: string

  // Constructor //

  constructor(dispatcherId: string, wdow: Window, origin: string, id?: string) {
    this.#dispatcherId = dispatcherId
    this.#id = id || `message-service-frame-${UUID.next()}`
    LOGGER.info(`[${getDispatcherId()}-${this.id}] created`)
    this.#window = wdow
    this.#origin = origin
    window.addEventListener(
      'message',
      this.#handleMessage.bind(this)
    )
    window.addEventListener(
      'unload',
      () => {
        this.onMessage({
          type: CONNECTION_CLOSING,
          _dispatcherId: getDispatcherId(),
          payload: {},
        })
        this.#removeService()
      }
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
    LOGGER.info(`[${getDispatcherId()}-${this.id}] onMessage ${message.type}`)
    /* istanbul ignore next */
    if (this.window.closed) {
      LOGGER.info(`[${getDispatcherId()}-${this.id}] onMessage /!\\ window closed /!\\`)
      /* istanbul ignore next */
      this.#removeService()
    } else {
      LOGGER.debug(`[${getDispatcherId()}-${this.id}] onMessage posting message to ${this.#origin}`)
      this.window.postMessage({
        ...message,
        _serviceId: this.#id
      }, this.#origin)
    }
  }

  sendMessage(message: Message) {
    LOGGER.debug(`[${getDispatcherId()}-${this.id}] sendMessage ${message.type}`)
    MessageDispatcher.sendMessage({
      ...message,
      _serviceId: this.id,
    })
  }

  // Private Methods //

  #handleMessage(event: MessageEvent) {
    const data = event.data || {}
    LOGGER.debug(`[${getDispatcherId()}-${this.id}] handleMessage `)
    if (data._serviceId && data._dispatcherId && data._dispatcherId === this.#dispatcherId) {
      LOGGER.debug(`[${getDispatcherId()}-${this.id}] handleMessage ${event.data.type}`)
      if (data.type === CONNECTION_CLOSING) {
        this.#removeService()
      } else {
        this.sendMessage({
          _serviceId: this.#id,
          type: data.type,
          payload: data.payload
        })
      }
    }
  }

  #removeService() {
    LOGGER.info(`[${getDispatcherId()}-${this.id}] remove service`)
    MessageDispatcher.removeService(this)
  }
}

export default MessageServiceFrame