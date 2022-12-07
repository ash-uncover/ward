import { UUID } from '@uncover/js-utils'
import Logger from '@uncover/js-utils-logger'
import IMessageService from './IMessageService'
import Message from './Message'
import MessageDispatcher, { getDispatcherIdShort } from './MessageDispatcher'

const LOGGER = new Logger('MessageService', 0)

class MessageService implements IMessageService {

  // Attributes //

  #id: string
  #init: boolean = false
  #handle: ((message: Message) => void) | null = null
  #closure: (() => void) | null = null

  // Constructor //

  constructor(id?: string) {
    this.#id = id || `message-service-${UUID.next()}`
    LOGGER.info(`[${this.idShort}] created`)
  }

  // Getters & Setters //

  get id() {
    return this.#id
  }

  get idShort() {
    return `${getDispatcherIdShort()}-${this.#id.substring(this.#id.length - 3)}`
  }

  // Public //

  init(handleMessage: ((message: Message) => void)) {
    this.#init = true
    this.#handle = handleMessage
    this.#closure = MessageDispatcher.addService(this)
    LOGGER.info(`[${this.idShort}] starting`)
    return () => {
      LOGGER.info(`[${this.idShort}] closing`)
      this.#init = false
      this.#handle = null
      if (this.#closure) {
        this.#closure()
      }
    }
  }

  onMessage(message: Message) {
    if (this.#init && this.#handle) {
      LOGGER.info(`[${this.idShort}] onMessage`)
      this.#handle(message)
    } else {
      LOGGER.warn(`[${this.idShort}] onMessage but not init`)
    }
  }

  sendMessage(message: Message) {
    LOGGER.info(`[${this.idShort}] sendMessage`)
    if (this.#init) {
      MessageDispatcher.sendMessage({
        ...message,
        _serviceId: this.id,
      })
    } else {
      LOGGER.warn(`[${this.idShort}] sendMessage but not init`)
    }
  }
}

export default MessageService