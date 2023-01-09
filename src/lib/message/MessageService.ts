import { UUID } from '@uncover/js-utils'
import Logger, { LogLevels } from '@uncover/js-utils-logger'
import IMessageService from './IMessageService'
import Message from './Message'
import MessageDispatcher, { getDispatcherId } from './MessageDispatcher'

const LOGGER = new Logger('MessageService', LogLevels.WARN)

class MessageService implements IMessageService {

  // Attributes //

  #id: string
  #init: boolean = false
  #handle: ((message: Message) => void) | null = null
  #closure: (() => void) | null = null

  // Constructor //

  constructor(id?: string) {
    this.#id = id || `message-service-${UUID.next()}`
    LOGGER.info(`[${getDispatcherId()}-${this.id}] created`)
  }

  // Getters & Setters //

  get id() {
    return this.#id
  }

  // Public //

  init(handleMessage: ((message: Message) => void)) {
    this.#init = true
    this.#handle = handleMessage
    this.#closure = MessageDispatcher.addService(this)
    LOGGER.info(`[${getDispatcherId()}-${this.id}] starting`)
    return () => {
      LOGGER.info(`[${getDispatcherId()}-${this.id}] closing`)
      this.#init = false
      this.#handle = null
      if (this.#closure) {
        this.#closure()
      }
    }
  }

  onMessage(message: Message) {
    if (this.#init && this.#handle) {
      LOGGER.debug(`[${getDispatcherId()}-${this.id}] onMessage`)
      this.#handle(message)
    } else {
      LOGGER.warn(`[${getDispatcherId()}-${this.id}] onMessage but not init`)
    }
  }

  sendMessage(message: Message) {
    LOGGER.info(`[${getDispatcherId()}-${this.id}] sendMessage`)
    if (this.#init) {
      MessageDispatcher.sendMessage({
        ...message,
        _serviceId: this.id,
      })
    } else {
      LOGGER.warn(`[${getDispatcherId()}-${this.id}] sendMessage but not init`)
    }
  }
}

export default MessageService