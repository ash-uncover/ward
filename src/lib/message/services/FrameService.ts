import { UUID } from '@uncover/js-utils'
import Logger, { LogLevels } from '@uncover/js-utils-logger'
import { Message, MessageService, MessageServiceTypes } from '../model/model'
import MessageDispatcher, { CONNECTION_CLOSING } from '../MessageDispatcher'

const LOGGER = new Logger('FrameService', LogLevels.WARN)

class FrameService implements MessageService {

  // Attributes //

  #id: string
  #dispatcher: MessageDispatcher
  #window: Window
  #origin: string

  // Constructor //

  constructor(
    dispatcher: MessageDispatcher,
    wdow: Window,
    origin: string,
    id?: string
  ) {
    this.#dispatcher = dispatcher
    this.#id = id || UUID.next()
    this.#window = wdow
    this.#origin = origin
    LOGGER.info(`[${this.dispatcherId}-${this.id}] created`)
    window.addEventListener(
      'message',
      this.#handleMessage.bind(this)
    )
    window.addEventListener(
      'unload',
      this.#handleUnload.bind(this)
    )
  }

  // Getters & Setters //

  get id() {
    return this.#id
  }
  get dispatcherId() {
    return this.#dispatcher.id
  }
  get window() {
    return this.#window
  }

  get type() {
    return MessageServiceTypes.FRAME
  }


  // Public Methods //

  onMessage(message: Message) {
    LOGGER.info(`[${this.dispatcherId}-${this.id}] onMessage ${message.type}`)
    if (this.#window.closed) {
      LOGGER.info(`[${this.dispatcherId}-${this.id}] onMessage /!\\ window closed /!\\`)
      this.terminate()
    } else {
      LOGGER.debug(`[${this.dispatcherId}-${this.id}] onMessage posting message to ${this.#origin}`)
      this.#window.postMessage({
        ...message,
        _serviceId: this.#id
      }, this.#origin)
    }
  }

  sendMessage(message: Message) {
    LOGGER.debug(`[${this.dispatcherId}-${this.id}] sendMessage ${message.type}`)
    this.#dispatcher.sendMessage({
      ...message,
      _serviceId: this.id,
    })
  }

  terminate() {
    LOGGER.info(`[${this.dispatcherId}-${this.id}] terminate`)
    this.#dispatcher.removeService(this)
  }

  // Private Methods //

  #handleUnload() {
    this.onMessage({
      type: CONNECTION_CLOSING,
      _dispatcherId: this.dispatcherId,
      payload: {},
    })
    this.terminate()
  }

  #handleMessage(event: MessageEvent) {
    const data = event.data || {}
    LOGGER.debug(`[${this.dispatcherId}-${this.id}] handleMessage `)
    if (data._serviceId && data._dispatcherId && data._dispatcherId === this.dispatcherId) {
      LOGGER.debug(`[${this.dispatcherId}-${this.id}] handleMessage ${event.data.type}`)
      if (data.type === CONNECTION_CLOSING) {
        this.terminate()
      } else {
        this.sendMessage({
          _serviceId: this.#id,
          type: data.type,
          payload: data.payload
        })
      }
    }
  }
}

export default FrameService