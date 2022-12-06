import { UUID } from '@uncover/js-utils'
import Logger from '@uncover/js-utils-logger'
import { IMessageService } from './IMessageService'
import Message from './Message'
import MessageServiceFrame from './MessageServiceFrame'

const CONNECTION_REQUEST = '__CONNNECTION_REQUEST__'
const CONNECTION_ACKNOWLEDGE = '__CONNECTION_ACKNOWLEDGE__'

const LOGGER = new Logger('MessageDispatcher', 0)

class MessageDispatcherClass {

  // Attributes //

  #id: string
  #services: IMessageService[] = []
  #dispatchers: string[] = []

  // Constructor //

  constructor(id?: string) {
    this.#id = id || `message-dispatcher-${UUID.next()}`
    // Wait for registration of other services
    window.addEventListener(
      'message',
      this.#handleMessage.bind(this)
    )
    if (window !== window.parent) {
      // Try to connect to a parent service
      LOGGER.info(`[${this.idShort}] contact parent`)
      window.parent.postMessage({
        _dispatcherId: this.id,
        type: CONNECTION_REQUEST
      }, '*')
    }
  }

  // Getters & Setters //

  get id() {
    return this.#id
  }

  get idShort() {
    return this.#id.substring(this.#id.length - 3)
  }

  // Public Methods //

  addService(service: IMessageService) {
    LOGGER.info(`[${this.idShort}] add service ${service.idShort}`)
    if (!this.#services.includes(service)) {
      this.#services.push(service)
    }
    return () => this.removeService(service)
  }

  removeService(service: IMessageService) {
    LOGGER.info(`[${this.idShort}] remove service ${service.idShort}`)
    this.#services = this.#services.filter(serv => serv !== service)
  }

  sendMessage(message: Message) {
    LOGGER.info(`[${this.idShort}] send message to ${this.#services.length - 1} services from [${this.idShort}-${message._serviceId?.substring(message._serviceId!.length - 3)}]`)
    this.#services.forEach((service) => {
      if (service.id !== message._serviceId) {
        LOGGER.info(`[${this.idShort}] send message on service ${service.idShort}`)
        service.onMessage({
          _dispatcherId: this.#id,
          ...message,
        })
      }
    })
  }

  // Private Methods //

  #handleMessage(event: MessageEvent) {
    const data = event.data || {}
    if (data._dispatcherId) {
      switch (data.type) {
        case CONNECTION_REQUEST: {
          this.#handleConnectionRequest(event)
          break
        }
        case CONNECTION_ACKNOWLEDGE: {
          this.#handleConnectionAcknowledge(event)
          break
        }
      }
    }
  }

  #handleConnectionRequest(event: MessageEvent) {
    const dispatcherId = event.data?._dispatcherId
    LOGGER.info(`[${this.idShort}] child trying to connect [${dispatcherId.substring(dispatcherId.length - 3)}]`)
    LOGGER.info(`[${this.idShort}] current childs: ${this.#dispatchers.join(', ')}`)
    const wdow = <Window>event.source!
    if (!this.#dispatchers.includes(dispatcherId)) {
      const service = new MessageServiceFrame(dispatcherId, wdow)
      this.addService(service)
      this.#dispatchers.push(dispatcherId)
      service.onMessage({
        _dispatcherId: this.#id,
        _serviceId: service.id,
        type: CONNECTION_ACKNOWLEDGE,
        payload: null
      })
    }
  }

  #handleConnectionAcknowledge(event: MessageEvent) {
    LOGGER.info(`[${this.idShort}] parent acknowledge connection`)
    const service = new MessageServiceFrame(event.data?._dispatcherId, window.parent, event.data?._serviceId)
    this.addService(service)
  }
}

const MessageDispatcher = new MessageDispatcherClass()

export default MessageDispatcher
