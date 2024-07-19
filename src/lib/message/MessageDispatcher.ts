import { ArrayUtils, UUID } from '@uncover/js-utils'
import { LogConfig, Logger } from '@uncover/js-utils-logger'
import { MessageService, Message } from './model/model'
import FrameService from './services/FrameService'

export const CONNECTION_REQUEST = '__CONNNECTION_REQUEST__'
export const CONNECTION_ACKNOWLEDGE = '__CONNECTION_ACKNOWLEDGE__'
export const CONNECTION_CLOSING = '__CONNNECTION_CLOSING__'

export interface MessageDispatcherData {
  services: MessageDispatcherDataServices
  dispatchers: string[]
}
export interface MessageDispatcherDataServices {
  [key: string]: MessageService
}
class MessageDispatcher implements MessageDispatcherData {

  // Attributes //

  #id: string
  #services: MessageService[] = []
  #dispatchers: string[] = []
  #logger: Logger

  #listeners: ((data: MessageDispatcherData) => void)[] = []

  #handler: (event: MessageEvent) => void

  // Constructor //

  constructor(id?: string, logConfig?: LogConfig) {
    this.#logger = new Logger('MessageDispatcher', logConfig)
    this.#id = id || UUID.next()
    this.logger.info(`[DISP-${this.id}] created`)
    this.#handler = this.#handleMessage.bind(this, window)
    window.addEventListener(
      'message',
      this.#handler
    )
    /* istanbul ignore else */
    if (window !== window.parent) {
      this.logger.info(`[DISP-${this.id}] contact parent`)
      window.parent.postMessage({
        _dispatcherId: this.#id,
        type: CONNECTION_REQUEST
      }, '*')
    } else if (window.documentPictureInPicture) {
      window.documentPictureInPicture.addEventListener("enter", (event: any) => {
        const pipWindow = event.window;
        pipWindow.addEventListener(
          'message', 
          this.#handleMessage.bind(this, pipWindow)
        );
      });
    }
  }

  // Getters & Setters //

  get data(): MessageDispatcherData {
    return {
      services: this.services,
      dispatchers: this.dispatchers
    }
  }

  get id() {
    return this.#id
  }

  get services() {
    return this.#services.reduce((acc: MessageDispatcherDataServices, service) => {
      acc[service.id] = service
      return acc
    }, {})
  }

  get dispatchers() {
    return this.#dispatchers.slice()
  }

  get logger() {
    return this.#logger
  }

  // Public Methods //

  register(listener: (data: MessageDispatcherData) => void) {
    this.#listeners.push(listener)
    return () => this.unregister(listener)
  }
  unregister(listener: (data: MessageDispatcherData) => void) {
    this.#listeners = ArrayUtils.removeElement(this.#listeners, listener)
  }
  notify() {
    this.#listeners.forEach(listener => {
      try {
        listener(this.data)
      } catch (error) {
        this.logger.error(`[DISP-${this.id}] listener failed with error`)
        this.logger.error(`${error}`)
      }
    })
  }

  terminate() {
    this.logger.info(`[DISP-${this.id}] stopping`)
    window.removeEventListener(
      'message',
      this.#handler
    )
    if (window !== window.parent) {
      this.logger.info(`[DISP-${this.id}] notifying parent`)
      window.parent.postMessage({
        _dispatcherId: this.#id,
        type: CONNECTION_CLOSING
      }, '*')
    }
  }

  reset() {
    this.#services = []
    this.#dispatchers = []

    this.notify()
  }

  getService(serviceId: string) {
    return this.#services.find(service => service.id === serviceId)
  }
  addService(service: MessageService) {
    this.logger.info(`[DISP-${this.id}] add service [${service.id}]`)
    if (!this.#services.includes(service)) {
      this.#services.push(service)
    }
    this.notify()
    return () => this.removeService(service)
  }
  removeService(service: MessageService) {
    this.logger.info(`[DISP-${this.id}] remove service [${service.id}]`)
    this.#services = this.#services.filter(serv => serv !== service)
    if (service instanceof FrameService) {
      this.#dispatchers = this.#dispatchers.filter(dispatcherId => dispatcherId !== service.remoteDispatcherId)
    }
    this.notify()
  }

  sendMessage(message: Message) {
    this.logger.info(`[DISP-${this.id}] send message to ${this.#services.length - 1} services from [${this.#id}-${message._serviceId}]`)
    this.#services.forEach((service) => {
      if (service.id !== message._serviceId) {
        this.logger.info(`[DISP-${this.id}] send message on service [${service.id}]`)
        service.onMessage({
          _dispatcherId: this.#id,
          ...message,
        })
      }
    })
  }

  // Internal Methods //

  #handleMessage(window: Window, event: MessageEvent) {
    if (event.data?._dispatcherId) {
      switch (event.data.type) {
        case CONNECTION_REQUEST: {
          this.#handleConnectionRequest(event, window)
          break
        }
        case CONNECTION_ACKNOWLEDGE: {
          this.#handleConnectionAcknowledge(event, window)
          break
        }
        case CONNECTION_CLOSING: {
          this.#handleConnectionClosing(event)
          break
        }
      }
    }
  }

  #handleConnectionRequest(event: MessageEvent, /* istanbul ignore next */ wdow: Window = window) {
    const dispatcherId = event.data._dispatcherId
    this.logger.info(`[DISP-${this.id}] child trying to connect [${dispatcherId}]`)
    this.logger.info(`[DISP-${this.id}] current childs: ${this.dispatchers.join(', ')}`)
    const wdowRemote = <Window>event.source!
    const origin = event.origin
    if (!this.#dispatchers.includes(dispatcherId)) {
      const service = new FrameService(
        this,
        wdow,
        wdowRemote,
        origin,
        dispatcherId,
        undefined,
        this.logger.config
      )
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

  #handleConnectionAcknowledge(event: MessageEvent, /* istanbul ignore next */ wdow: Window = window) {
    this.logger.info(`[DISP-${this.id}] parent acknowledge connection`)
    const service = new FrameService(
      this,
      wdow,
      window.parent,
      event.origin,
      event.data._dispatcherId,
      event.data._serviceId,
      this.logger.config
    )
    this.addService(service)
  }

  #handleConnectionClosing(event: MessageEvent) {
    this.logger.info(`[DISP-${this.id}] child notify closing`)
  }
}

export default MessageDispatcher