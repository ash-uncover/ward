import { UUID } from '@uncover/js-utils'
import Logger from '@uncover/js-utils-logger'
import IMessageService from './IMessageService'
import Message from './Message'
import MessageServiceFrame from './MessageServiceFrame'

export const CONNECTION_REQUEST = '__CONNNECTION_REQUEST__'
export const CONNECTION_ACKNOWLEDGE = '__CONNECTION_ACKNOWLEDGE__'
export const CONNECTION_CLOSING = '__CONNNECTION_CLOSING__'

const LOGGER = new Logger('MessageDispatcher', 0)

let id: string
let idShort: string
let started: boolean = false
let services: IMessageService[] = []
let dispatchers: string[] = []

export const setId = (dispatcherId?: string) => {
  id = dispatcherId || `message-dispatcher-${UUID.next()}`
  idShort = id.substring(Math.max(id.length - 3, 0))
}

export const getDispatcherId = () => {
  return id
}

export const getDispatcherIdShort = () => {
  return idShort
}

export const getStarted = () => {
  return started
}

export const getServices = () => {
  return services
}

export const getDispatchers = () => {
  return dispatchers
}

export const reset = () => {
  setId()
  started = false
  services  = []
  dispatchers = []
}

export const handlers = {
  handleMessage: (event: MessageEvent) => {
    if (event.data._dispatcherId) {
      switch (event.data.type) {
        case CONNECTION_REQUEST: {
          handlers.handleConnectionRequest(event)
          break
        }
        case CONNECTION_ACKNOWLEDGE: {
          handlers.handleConnectionAcknowledge(event)
          break
        }
        case CONNECTION_CLOSING: {
          handlers.handleConnectionClosing(event)
          break
        }
      }
    }
  },

  handleConnectionRequest: (event: MessageEvent) => {
    const dispatcherId = event.data._dispatcherId
    LOGGER.info(`[${idShort}] child trying to connect [${dispatcherId.substring(dispatcherId.length - 3)}]`)
    LOGGER.info(`[${idShort}] current childs: ${dispatchers.join(', ')}`)
    const wdow = <Window>event.source!
    if (!dispatchers.includes(dispatcherId)) {
      const service = new MessageServiceFrame(dispatcherId, wdow)
      MessageDispatcher.addService(service)
      dispatchers.push(dispatcherId)
      service.onMessage({
        _dispatcherId: id,
        _serviceId: service.id,
        type: CONNECTION_ACKNOWLEDGE,
        payload: null
      })
    }
  },

  handleConnectionAcknowledge: (event: MessageEvent) => {
    LOGGER.info(`[${idShort}] parent acknowledge connection`)
    const service = new MessageServiceFrame(event.data._dispatcherId, window.parent, event.data._serviceId)
    MessageDispatcher.addService(service)
  },

  handleConnectionClosing: (event: MessageEvent) => {
    LOGGER.info(`[${idShort}] child notify closing`)
  }
}

const MessageDispatcher = {

  start: (dispatcherId?: string) => {
    setId(dispatcherId)
    started = true
    LOGGER.info(`[${idShort}] created`)
    window.addEventListener(
      'message',
      handlers.handleMessage
    )
    if (window !== window.parent) {
      LOGGER.info(`[${idShort}] contact parent`)
      window.parent.postMessage({
        _dispatcherId: id,
        type: CONNECTION_REQUEST
      }, '*')
    }
  },

  stop: () => {
    LOGGER.info(`[${idShort}] stopping`)
    started = false
    window.removeEventListener(
      'message',
      handlers.handleMessage
    )
    if (window !== window.parent) {
      LOGGER.info(`[${idShort}] notifying parent`)
      window.parent.postMessage({
        _dispatcherId: id,
        type: CONNECTION_CLOSING
      }, '*')
    }
  },

  addService: (service: IMessageService) => {
    LOGGER.info(`[${idShort}] add service [${service.idShort}]`)
    if (!services.includes(service)) {
      services.push(service)
    }
    return () => MessageDispatcher.removeService(service)
  },

  removeService: (service: IMessageService) => {
    LOGGER.info(`[${idShort}] remove service [${service.idShort}]`)
    services = services.filter(serv => serv !== service)
  },

  sendMessage: (message: Message) => {
    if (started) {
      LOGGER.info(`[${idShort}] send message to ${services.length - 1} services from [${idShort}-${message._serviceId?.substring(message._serviceId!.length - 3)}]`)
      services.forEach((service) => {
        if (service.id !== message._serviceId) {
          LOGGER.info(`[${idShort}] send message on service [${service.idShort}]`)
          service.onMessage({
            _dispatcherId: id,
            ...message,
          })
        }
      })
    } else {
      LOGGER.warn(`[${idShort}] try to send message but not started`)
    }
  }
}

export default MessageDispatcher
