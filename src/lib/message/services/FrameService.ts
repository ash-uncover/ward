import { UUID } from '@uncover/js-utils'
import Logger, { LogLevels } from '@uncover/js-utils-logger'
import { Message, MessageService, MessageServiceTypes } from '../model/model'
import MessageDispatcher, { CONNECTION_CLOSING } from '../MessageDispatcher'

const LOGGER = new Logger('FrameService', LogLevels.DEBUG)

class FrameService implements MessageService {

  // Attributes //

  #id: string
  #dispatcher: MessageDispatcher
  #remoteDispatcherId: string
  #window: Window
  #origin: string

  // Constructor //

  constructor(
    dispatcher: MessageDispatcher,
    wdow: Window,
    origin: string,
    remoteDispatcherId: string,
    id?: string
  ) {
    this.#dispatcher = dispatcher
    this.#id = id || UUID.next()
    this.#window = wdow
    this.#origin = origin
    this.#remoteDispatcherId = remoteDispatcherId
    LOGGER.info(`[DISP-${this.dispatcherId}/FRAME-${this.id}] created`)
    window.addEventListener(
      'message',
      this.#handleMessage.bind(this)
    )
    window.addEventListener(
      'beforeUnload',
      this.#handleBeforeUnload.bind(this)
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
    LOGGER.info(`[DISP-${this.dispatcherId}/FRAME-${this.id}] onMessage ${message.type}`)
    if (this.#window.closed) {
      LOGGER.info(`[DISP-${this.dispatcherId}/FRAME-${this.id}] onMessage /!\\ window closed /!\\`)
      this.terminate()
    } else {
      LOGGER.debug(`[DISP-${this.dispatcherId}/FRAME-${this.id}] onMessage posting message to ${this.#origin}`)
      this.#window.postMessage({
        ...message,
        _serviceId: this.#id
      }, this.#origin)
    }
  }

  sendMessage(message: Message) {
    LOGGER.debug(`[DISP-${this.dispatcherId}/FRAME-${this.id}] sendMessage ${message.type}`)
    this.#dispatcher.sendMessage({
      ...message,
      _serviceId: this.id,
    })
  }

  terminate() {
    LOGGER.info(`[DISP-${this.dispatcherId}/FRAME-${this.id}] terminate`)
    this.#dispatcher.removeService(this)
  }

  // Private Methods //

  #handleBeforeUnload() {
    this.onMessage({
      type: CONNECTION_CLOSING,
      _dispatcherId: this.dispatcherId,
      payload: {},
    })
    this.terminate()
  }

  #handleMessage(event: MessageEvent) {
    const data = event.data || {}
    LOGGER.debug(`[DISP-${this.dispatcherId}/FRAME-${this.id}] handleMessage `)
    if (data._serviceId && data._dispatcherId && data._dispatcherId === this.#remoteDispatcherId) {
      LOGGER.debug(`[DISP-${this.dispatcherId}/FRAME-${this.id}] handleMessage ${event.data.type}`)
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