import { UUID } from '@uncover/js-utils'
import Logger, { LogLevels } from '@uncover/js-utils-logger'
import { Message, MessageService, MessageServiceTypes } from '../model/model'
import MessageDispatcher from '../MessageDispatcher'

const LOGGER = new Logger('EventService', LogLevels.WARN)

class EventService implements MessageService {

  // Attributes //

  #id: string
  #dispatcher: MessageDispatcher

  #handle: (message: Message) => void

  // Constructor //

  constructor(
    dispatcher: MessageDispatcher,
    handleMessage: (message: Message) => void
  ) {
    this.#dispatcher = dispatcher
    this.#id = UUID.next()
    this.#handle = handleMessage
    LOGGER.info(`[${this.dispatcherId}-${this.id}] created`)
  }

  // Getters & Setters //

  get id() {
    return this.#id
  }
  get dispatcherId() {
    return this.#dispatcher.id
  }

  get type() {
    return MessageServiceTypes.EVENT
  }

  // Public methods //

  terminate() {
    LOGGER.info(`[${this.dispatcherId}-${this.id}] terminate`)
    this.#dispatcher.removeService(this)
  }

  onMessage(message: Message) {
    LOGGER.debug(`[${this.dispatcherId}-${this.id}] onMessage`)
    this.#handle(message)
  }

  sendMessage(message: Message) {
    LOGGER.info(`[${this.dispatcherId}-${this.id}] sendMessage`)
    this.#dispatcher.sendMessage({
      ...message,
      _serviceId: this.id,
    })
  }

  // Internal methods //
}

export default EventService