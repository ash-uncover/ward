import { UUID } from '@uncover/js-utils'
import Logger, { LogLevels } from '@uncover/js-utils-logger'
import { MessageService, Message } from './model/model'
import FrameService from './services/FrameService'

export const CONNECTION_REQUEST = '__CONNNECTION_REQUEST__'
export const CONNECTION_ACKNOWLEDGE = '__CONNECTION_ACKNOWLEDGE__'
export const CONNECTION_CLOSING = '__CONNNECTION_CLOSING__'

const LOGGER = new Logger('MessageDispatcher', LogLevels.WARN)

class MessageDispatcher {

  // Attributes //

  #id: string
  #services: MessageService[] = []
  #dispatchers: string[] = []

  #handler: (event: MessageEvent) => void

  // Constructor //

  constructor(id?: string) {
    this.#id = id || `message-dispatcher-${UUID.next()}`
    LOGGER.info(`[${this.#id}] created`)
    this.#handler = this.#handleMessage.bind(this)
    window.addEventListener(
      'message',
      this.#handler
    )
    if (window !== window.parent) {
      LOGGER.info(`[${this.#id}] contact parent`)
      window.parent.postMessage({
        _dispatcherId: this.#id,
        type: CONNECTION_REQUEST
      }, '*')
    }
  }

  // Getters & Setters //

  get id() {
    return this.#id
  }

  get services() {
    return this.#services.slice()
  }

  get dispatchers() {
    return this.#dispatchers.slice()
  }

  // Public Methods //

  terminate() {
    LOGGER.info(`[${this.id}] stopping`)
    window.removeEventListener(
      'message',
      this.#handler
    )
    if (window !== window.parent) {
      LOGGER.info(`[${this.#id}] notifying parent`)
      window.parent.postMessage({
        _dispatcherId: this.#id,
        type: CONNECTION_CLOSING
      }, '*')
    }
  }

  reset() {
    this.#services = []
    this.#dispatchers = []
  }

  getService(serviceId: string) {
    return this.#services.find(service => service.id === serviceId)
  }
  addService(service: MessageService) {
    LOGGER.info(`[${this.#id}] add service [${service.id}]`)
    if (!this.#services.includes(service)) {
      this.#services.push(service)
    }
    return () => this.removeService(service)
  }
  removeService(service: MessageService) {
    LOGGER.info(`[${this.#id}] remove service [${service.id}]`)
    this.#services = this.#services.filter(serv => serv !== service)
  }

  sendMessage(message: Message) {
    LOGGER.info(`[${this.#id}] send message to ${this.#services.length - 1} services from [${this.#id}-${message._serviceId}]`)
    this.#services.forEach((service) => {
      if (service.id !== message._serviceId) {
        LOGGER.info(`[${this.#id}] send message on service [${service.id}]`)
        service.onMessage({
          _dispatcherId: this.#id,
          ...message,
        })
      }
    })
  }

  // Internal Methods //

  #handleMessage(event: MessageEvent) {
    if (event.data?._dispatcherId) {
      switch (event.data.type) {
        case CONNECTION_REQUEST: {
          this.#handleConnectionRequest(event)
          break
        }
        case CONNECTION_ACKNOWLEDGE: {
          this.#handleConnectionAcknowledge(event)
          break
        }
        case CONNECTION_CLOSING: {
          this.#handleConnectionClosing(event)
          break
        }
      }
    }
  }

  #handleConnectionRequest(event: MessageEvent) {
    const dispatcherId = event.data._dispatcherId
    LOGGER.info(`[${this.id}] child trying to connect [${dispatcherId.substring(dispatcherId.length - 3)}]`)
    LOGGER.info(`[${this.id}] current childs: ${this.dispatchers.join(', ')}`)
    const wdow = <Window>event.source!
    const origin = event.origin
    if (!this.#dispatchers.includes(dispatcherId)) {
      const service = new FrameService(dispatcherId, wdow, origin)
      this.#dispatchers.push(dispatcherId)
      this.addService(service)
      service.onMessage({
        _dispatcherId: this.#id,
        _serviceId: service.id,
        type: CONNECTION_ACKNOWLEDGE,
        payload: null
      })
    }
  }

  #handleConnectionAcknowledge(event: MessageEvent) {
    LOGGER.info(`[${this.id}] parent acknowledge connection`)
    const service = new FrameService(
      this,
      window.parent,
      event.origin,
      event.data._serviceId
    )
    this.addService(service)
  }

  #handleConnectionClosing(event: MessageEvent) {
    LOGGER.info(`[${this.id}] child notify closing`)
  }
}

export default MessageDispatcher