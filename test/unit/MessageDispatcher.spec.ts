import { LogConfig } from '@uncover/js-utils-logger'
import MessageService from '../../src/lib/MessageService'
import MessageDispatcher, {
  CONNECTION_ACKNOWLEDGE,
  CONNECTION_CLOSING,
  CONNECTION_REQUEST,
  getDispatcherId,
  getDispatchers,
  getService,
  getServices,
  getStarted,
  handlers,
  reset
} from '../../src/lib/MessageDispatcher'

jest.mock('../../src/lib/MessageDispatcher', () => {
  const actual = (jest.requireActual('../../src/lib/MessageDispatcher'))
  return {
    ...actual,
    __esModule: true,
    handleConnectionRequest: jest.fn(actual.handleConnectionRequest),
    handleConnectionAcknowledge: jest.fn(actual.handleConnectionAcknowledge),
    handleConnectionClosing: jest.fn(actual.handleConnectionClosing),
  }
})

jest.mock('../../src/lib/MessageServiceFrame')

LogConfig.off()

describe('MessageDispatcher', () => {

  /* TEST DATA */

  /* TEST SETUP */

  let spyWindowAddEventListener: any
  let spyWindowRemoveEventListener: any

  beforeEach(() => {
    reset()
    spyWindowAddEventListener = jest.spyOn(window, 'addEventListener')
    spyWindowRemoveEventListener = jest.spyOn(window, 'removeEventListener')
  })

  afterEach(() => {
    jest.clearAllMocks()
  })

  /* TEST CASES */

  // MessageDispatcher.start //

  describe('MessageDispatcher.start', () => {
    test('when an id is provided', () => {
      // Declaration
      const dispatcherId: string = 'dispatcherId'
      // Execution
      MessageDispatcher.start(dispatcherId)
      // Assertion
      expect(window.parent).toBe(window)
      expect(getStarted()).toBe(true)
      expect(getDispatcherId()).toBe(dispatcherId)
      expect(spyWindowAddEventListener).toHaveBeenCalledTimes(1)
    })

    test('when no id is provided', () => {
      // Declaration
      // Execution
      MessageDispatcher.start()
      // Assertion
      expect(window.parent).toBe(window)
      expect(getStarted()).toBe(true)
      expect(getDispatcherId()).not.toBeNull()
      expect(spyWindowAddEventListener).toHaveBeenCalledTimes(1)
    })
  })

  // MessageDispatcher.stop //

  describe('MessageDispatcher.stop', () => {
    test('when called in the main window', () => {
      // Declaration
      // Execution
      MessageDispatcher.start()
      MessageDispatcher.stop()
      // Assertion
      expect(getStarted()).toBe(false)
      expect(window.parent).toBe(window)
      expect(spyWindowRemoveEventListener).toHaveBeenCalledTimes(1)
    })
  })

  // MessageDispatcher.addService //

  describe('MessageDispatcher.addService', () => {
    test('when service adding a service the first time', () => {
      // Declaration
      const service = new MessageService()
      // Execution
      MessageDispatcher.addService(service)
      // Assertion
      expect(getServices()).toEqual([service])
    })

    test('when service adding a service two times', () => {
      // Declaration
      const service = new MessageService()
      // Execution
      MessageDispatcher.addService(service)
      MessageDispatcher.addService(service)
      // Assertion
      expect(getServices()).toEqual([service])
    })

    test('when calling the callback function', () => {
      // Declaration
      const service = new MessageService()
      // Execution
      MessageDispatcher.addService(service)()
      // Assertion
      expect(getServices()).toEqual([])
    })
  })

  // MessageDispatcher.removeService //

  describe('MessageDispatcher.removeService', () => {
    test('when removing a service that was added before', () => {
      // Declaration
      const service = new MessageService()
      // Execution
      MessageDispatcher.addService(service)
      MessageDispatcher.removeService(service)
      // Assertion
      expect(getServices()).toEqual([])
    })

    test('when removing a service that was not added', () => {
      // Declaration
      const service = new MessageService()
      // Execution
      MessageDispatcher.removeService(service)
      // Assertion
      expect(getServices()).toEqual([])
    })
  })

  // MessageDispatcher.sendMessage //

  describe('MessageDispatcher.sendMessage', () => {
    test('when not started', () => {
      // Declaration
      const service1 = new MessageService('service1')
      const spyService1OnMesssage = jest.spyOn(service1, 'onMessage')
      const service2 = new MessageService('service2')
      const spyService2OnMesssage = jest.spyOn(service2, 'onMessage')
      jest.spyOn(service2, 'onMessage')
      // Execution
      MessageDispatcher.addService(service1)
      MessageDispatcher.addService(service2)
      MessageDispatcher.sendMessage({ type: 'type', payload: 'payload' })
      // Assertion
      expect(spyService1OnMesssage).toHaveBeenCalledTimes(0)
      expect(spyService2OnMesssage).toHaveBeenCalledTimes(0)
    })

    test('when started', () => {
      // Declaration
      const service1 = new MessageService('service1')
      const spyService1OnMesssage = jest.spyOn(service1, 'onMessage')
      const service2 = new MessageService('service2')
      const spyService2OnMesssage = jest.spyOn(service2, 'onMessage')
      jest.spyOn(service2, 'onMessage')
      // Execution
      MessageDispatcher.start()
      MessageDispatcher.addService(service1)
      MessageDispatcher.addService(service2)
      MessageDispatcher.sendMessage({
        type: 'type',
        payload: 'payload',
        _serviceId: 'service1'

      })
      // Assertion
      expect(spyService1OnMesssage).toHaveBeenCalledTimes(0)
      expect(spyService2OnMesssage).toHaveBeenCalledTimes(1)
    })

    test('when started and no service id provided', () => {
      // Declaration
      const service1 = new MessageService('service1')
      const spyService1OnMesssage = jest.spyOn(service1, 'onMessage')
      jest.spyOn(service1, 'onMessage')
      // Execution
      MessageDispatcher.start()
      MessageDispatcher.addService(service1)
      MessageDispatcher.sendMessage({
        type: 'type',
        payload: 'payload'
      })
      // Assertion
      expect(spyService1OnMesssage).toHaveBeenCalledTimes(1)
    })
  })

  // getService //

  describe('getService', () => {

    test('when receiving any message', () => {
      // Declaration
      const service = new MessageService('service1')
      MessageDispatcher.addService(service)
      // Execution
      const result = getService('service1')
      // Assertion
      expect(result).toBe(service)
    })
  })

  // handlers.handleMessage //

  describe('handlers.handleMessage', () => {

    let spyHandlersConnectionRequest: any
    let spyHandlersConnectionAcknowledge: any
    let spyHandlersConnectionClosing: any

    beforeEach(() => {
      spyHandlersConnectionRequest = jest.spyOn(handlers, 'handleConnectionRequest')
      spyHandlersConnectionAcknowledge = jest.spyOn(handlers, 'handleConnectionAcknowledge')
      spyHandlersConnectionClosing = jest.spyOn(handlers, 'handleConnectionClosing')
    })

    test('when receiving any message', () => {
      // Declaration
      const data = {
        type: 'type'
      }
      const event = new MessageEvent('message', { data: data })
      // Execution
      MessageDispatcher.start()
      handlers.handleMessage(event)
      // Assertion
      expect(spyHandlersConnectionRequest).toHaveBeenCalledTimes(0)
      expect(spyHandlersConnectionAcknowledge).toHaveBeenCalledTimes(0)
      expect(spyHandlersConnectionClosing).toHaveBeenCalledTimes(0)
    })

    test('when receiving a connection request message', () => {
      // Declaration
      const dispatcherId = 'anotherDispatcherId'
      const data = {
        _dispatcherId: dispatcherId,
        type: CONNECTION_REQUEST
      }
      const event = new MessageEvent('message', { data: data })
      // Execution
      MessageDispatcher.start()
      handlers.handleMessage(event)
      // Assertion
      expect(spyHandlersConnectionRequest).toHaveBeenCalledTimes(1)
      expect(spyHandlersConnectionAcknowledge).toHaveBeenCalledTimes(0)
      expect(spyHandlersConnectionClosing).toHaveBeenCalledTimes(0)
    })

    test('when receiving a connection acknoledge message', () => {
      // Declaration
      const dispatcherId = 'anotherDispatcherId'
      const data = {
        _dispatcherId: dispatcherId,
        type: CONNECTION_ACKNOWLEDGE
      }
      const event = new MessageEvent('message', { data: data })
      // Execution
      MessageDispatcher.start()
      handlers.handleMessage(event)
      // Assertion
      expect(spyHandlersConnectionRequest).toHaveBeenCalledTimes(0)
      expect(spyHandlersConnectionAcknowledge).toHaveBeenCalledTimes(1)
      expect(spyHandlersConnectionClosing).toHaveBeenCalledTimes(0)
    })

    test('when receiving a connection closing message', () => {
      // Declaration
      const dispatcherId = 'anotherDispatcherId'
      const data = {
        _dispatcherId: dispatcherId,
        type: CONNECTION_CLOSING
      }
      const event = new MessageEvent('message', { data: data })
      // Execution
      MessageDispatcher.start()
      handlers.handleMessage(event)
      // Assertion
      expect(spyHandlersConnectionRequest).toHaveBeenCalledTimes(0)
      expect(spyHandlersConnectionAcknowledge).toHaveBeenCalledTimes(0)
      expect(spyHandlersConnectionClosing).toHaveBeenCalledTimes(1)
    })
  })

  // handlers.handleConnectionRequest //

  describe('handlers.handleConnectionRequest', () => {
    test('when receiving a connection request from a new dispatcher', () => {
      // Declaration
      const dispatcherId = 'anotherDispatcherId'
      const data = {
        _dispatcherId: dispatcherId
      }
      const event = new MessageEvent('message', { data: data })
      // Execution
      handlers.handleConnectionRequest(event)
      // Assertion
      expect(getServices()).toHaveLength(1)
      expect(getDispatchers()).toEqual([dispatcherId])
    })

    test('when receiving a connection request from a dispatcher already registered', () => {
      // Declaration
      const dispatcherId = 'anotherDispatcherId'
      const data = {
        _dispatcherId: dispatcherId
      }
      const event = new MessageEvent('message', { data: data })
      // Execution
      handlers.handleConnectionRequest(event)
      handlers.handleConnectionRequest(event)
      // Assertion
      expect(getServices()).toHaveLength(1)
      expect(getDispatchers()).toEqual([dispatcherId])
    })
  })

  // handlers.handleConnectionAcknowledge //

  describe('handlers.handleConnectionAcknowledge', () => {
    test('when receiving a connection acknowledge message', () => {
      // Declaration
      const dispatcherId = 'anotherDispatcherId'
      const serviceId = 'anotherServiceId'
      const data = {
        _dispatcherId: dispatcherId,
        _serviceId: serviceId
      }
      const event = new MessageEvent('message', { data: data })
      // Execution
      handlers.handleConnectionAcknowledge(event)
      // Assertion
      expect(getServices()).toHaveLength(1)
    })
  })

  // handlers.handleConnectionClosing //

  describe('handlers.handleConnectionClosing', () => {
  })
})
