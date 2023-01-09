import { UUID } from '@uncover/js-utils'
import Logger, { LogLevels } from '@uncover/js-utils-logger'
import IMessageService from './IMessageService'
import Message from './Message'
import MessageServiceFrame from './MessageServiceFrame'

export const CONNECTION_REQUEST = '__CONNNECTION_REQUEST__'
export const CONNECTION_ACKNOWLEDGE = '__CONNECTION_ACKNOWLEDGE__'
export const CONNECTION_CLOSING = '__CONNNECTION_CLOSING__'

const LOGGER = new Logger('MessageDispatcher', LogLevels.WARN)

let id: string
let started: boolean = false
let services: IMessageService[] = []
let dispatchers: string[] = []

export const setId = (dispatcherId?: string) => {
  id = dispatcherId || `message-dispatcher-${UUID.next()}`
}

export const getDispatcherId = () => {
  return id
}

export const getStarted = () => {
  return started
}

export const getServices = () => {
  return services
}

export const getService = (serviceId: string) => {
  return services.find(service => service.id === serviceId)
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
    LOGGER.info(`[${id}] child trying to connect [${dispatcherId.substring(dispatcherId.length - 3)}]`)
    LOGGER.info(`[${id}] current childs: ${dispatchers.join(', ')}`)
    const wdow = <Window>event.source!
    const origin = event.origin
    if (!dispatchers.includes(dispatcherId)) {
      const service = new MessageServiceFrame(dispatcherId, wdow, origin)
      dispatchers.push(dispatcherId)
      MessageDispatcher.addService(service)
      service.onMessage({
        _dispatcherId: id,
        _serviceId: service.id,
        type: CONNECTION_ACKNOWLEDGE,
        payload: null
      })
    }
  },

  handleConnectionAcknowledge: (event: MessageEvent) => {
    LOGGER.info(`[${id}] parent acknowledge connection`)
    const service = new MessageServiceFrame(event.data._dispatcherId, window.parent, event.origin, event.data._serviceId)
    MessageDispatcher.addService(service)
  },

  handleConnectionClosing: (event: MessageEvent) => {
    LOGGER.info(`[${id}] child notify closing`)
  }
}

const MessageDispatcher = {

  start: (dispatcherId?: string) => {
    if (!started) {
      setId(dispatcherId)
      started = true
      LOGGER.info(`[${id}] created`)
      window.addEventListener(
        'message',
        handlers.handleMessage
      )
      if (window !== window.parent) {
        LOGGER.info(`[${id}] contact parent`)
        window.parent.postMessage({
          _dispatcherId: id,
          type: CONNECTION_REQUEST
        }, '*')
      }
    }
  },

  stop: () => {
    if (started) {
      LOGGER.info(`[${id}] stopping`)
      started = false
      window.removeEventListener(
        'message',
        handlers.handleMessage
      )
      if (window !== window.parent) {
        LOGGER.info(`[${id}] notifying parent`)
        window.parent.postMessage({
          _dispatcherId: id,
          type: CONNECTION_CLOSING
        }, '*')
      }
    }
  },

  addService: (service: IMessageService) => {
    LOGGER.info(`[${id}] add service [${service.id}]`)
    if (!services.includes(service)) {
      services.push(service)
    }
    return () => MessageDispatcher.removeService(service)
  },

  removeService: (service: IMessageService) => {
    LOGGER.info(`[${id}] remove service [${service.id}]`)
    services = services.filter(serv => serv !== service)
  },

  sendMessage: (message: Message) => {
    if (started) {
      LOGGER.info(`[${id}] send message to ${services.length - 1} services from [${id}-${message._serviceId?.substring(message._serviceId!.length - 3)}]`)
      services.forEach((service) => {
        if (service.id !== message._serviceId) {
          LOGGER.info(`[${id}] send message on service [${service.id}]`)
          service.onMessage({
            _dispatcherId: id,
            ...message,
          })
        }
      })
    } else {
      LOGGER.warn(`[${id}] try to send message but not started`)
    }
  }
}

export default MessageDispatcher
