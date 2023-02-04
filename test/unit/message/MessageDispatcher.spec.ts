import { LogConfig } from '@uncover/js-utils-logger'
import MessageDispatcher, {
  CONNECTION_ACKNOWLEDGE,
  CONNECTION_CLOSING,
  CONNECTION_REQUEST,
} from '../../../src/lib/message/MessageDispatcher'
import { MessageService } from '../../../src/lib/message/model/model'

LogConfig.off()

describe('MessageDispatcher', () => {

  /* TEST DATA */

  /* TEST SETUP */

  let spyWindow: any
  let spyWindowParent: any
  let spyWindowPostMessage: any
  let spyWindowAddEventListener: any
  let spyWindowRemoveEventListener: any

  beforeEach(() => {
    jest.clearAllMocks()
    jest.resetAllMocks()

    spyWindowParent = jest.spyOn(window, 'parent', 'get')

    spyWindowPostMessage = jest.spyOn(window, 'postMessage')
    spyWindowAddEventListener = jest.spyOn(window, 'addEventListener')
    spyWindowRemoveEventListener = jest.spyOn(window, 'removeEventListener')
  })

  afterEach(() => {
  })

  /* TEST CASES */

  // constructor //

  describe('constructor', () => {

    test('when an id is provided', () => {
      // Declaration
      const id = 'dispatcherId'
      spyWindowParent.mockImplementation(() => window)
      // Execution
      const dispatcher = new MessageDispatcher(id)
      // Assertion
      expect(dispatcher.id).toBe('dispatcherId')
      expect(dispatcher.services).toEqual({})
      expect(dispatcher.dispatchers).toEqual([])
      expect(dispatcher.data).toEqual({ services: {} })
      expect(spyWindowAddEventListener).toHaveBeenCalledTimes(1)
      expect(spyWindowPostMessage).toHaveBeenCalledTimes(0)
    })

    test('when no id is provided', () => {
      // Declaration
      // Execution
      const dispatcher = new MessageDispatcher()
      // Assertion
      expect(dispatcher.id).toBeDefined()
      expect(dispatcher.services).toEqual({})
      expect(dispatcher.dispatchers).toEqual([])
    })

    test('when the parent window is different', () => {
      // Declaration
      const postMessage = jest.fn()
      const windowParent = {
        ...window,
        postMessage
      }
      spyWindowParent.mockImplementation(() => windowParent)
      // Execution
      new MessageDispatcher()
      // Assertion
      expect(spyWindowAddEventListener).toHaveBeenCalledTimes(1)
      expect(postMessage).toHaveBeenCalledTimes(1)
    })
  })

  // terminate //

  describe('terminate', () => {

    test('properly unregister listeners', () => {
      // Declaration
      const dispatcher = new MessageDispatcher()
      // Execution
      dispatcher.terminate()
      // Assertion
      expect(spyWindowRemoveEventListener).toHaveBeenCalledTimes(1)
      expect(spyWindowPostMessage).toHaveBeenCalledTimes(0)
    })

    test('when the parent window is different', () => {
      // Declaration
      const postMessage = jest.fn()
      const windowParent = {
        ...window,
        postMessage
      }
      spyWindowParent.mockImplementation(() => windowParent)
      const dispatcher = new MessageDispatcher()
      // Execution
      dispatcher.terminate()
      // Assertion
      expect(spyWindowRemoveEventListener).toHaveBeenCalledTimes(1)
      expect(postMessage).toHaveBeenCalledTimes(2)
    })
  })

  // reset //

  describe('reset', () => {
  })

  describe('getService / addService / removeService', () => {

    test('service can be add properly', () => {
      // Declaration
      const dispatcher = new MessageDispatcher()
      const service: MessageService = {
        id: 'serviceId',
        type: 'event',
        onMessage: jest.fn(),
        sendMessage: jest.fn()
      }
      // Execution
      dispatcher.addService(service)
      // Assertion
      expect(dispatcher.getService('serviceId')).toEqual(service)
    })


    test('service can be removed using return callback properly', () => {
      // Declaration
      const dispatcher = new MessageDispatcher()
      const service: MessageService = {
        id: 'serviceId',
        type: 'event',
        onMessage: jest.fn(),
        sendMessage: jest.fn()
      }
      // Execution
      const removeCallback = dispatcher.addService(service)
      removeCallback()
      // Assertion
      expect(dispatcher.services).toEqual({})
      expect(dispatcher.getService('serviceId')).toBeUndefined()
    })

    test('service can be removed using remove methods', () => {
      // Declaration
      const dispatcher = new MessageDispatcher()
      const service: MessageService = {
        id: 'serviceId',
        type: 'event',
        onMessage: jest.fn(),
        sendMessage: jest.fn()
      }
      // Execution
      dispatcher.addService(service)
      dispatcher.removeService(service)
      // Assertion
      expect(dispatcher.services).toEqual({})
      expect(dispatcher.getService('serviceId')).toBeUndefined()
    })


    test('service can be removed using reset methods', () => {
      // Declaration
      const dispatcher = new MessageDispatcher()
      const service: MessageService = {
        id: 'serviceId',
        type: 'event',
        onMessage: jest.fn(),
        sendMessage: jest.fn()
      }
      // Execution
      dispatcher.addService(service)
      dispatcher.reset()
      // Assertion
      expect(dispatcher.services).toEqual({})
      expect(dispatcher.getService('serviceId')).toBeUndefined()
    })
  })

  // sendMessage //

  describe('sendMessage', () => {

    test('Message is sent to relevant services', () => {
      // Declaration
      const dispatcher = new MessageDispatcher()
      const service1: MessageService = {
        id: 'service1',
        type: 'event',
        onMessage: jest.fn(),
        sendMessage: jest.fn()
      }
      const service2: MessageService = {
        id: 'service2',
        type: 'event',
        onMessage: jest.fn(),
        sendMessage: jest.fn()
      }
      // Execution
      dispatcher.addService(service1)
      dispatcher.addService(service2)
      dispatcher.sendMessage({
        type: 'type',
        payload: 'payload',
        _serviceId: 'service1'
      })
      // Assertion
      expect(service1.onMessage).toHaveBeenCalledTimes(0)
      expect(service2.onMessage).toHaveBeenCalledTimes(1)
    })
  })

  // #handleMessage //

  describe('#handleMessage', () => {

    test('when receiving connection request message', () => {
      // Declaration
      const dispatcherId = 'dispatcherId'
      const dispatcher = new MessageDispatcher(dispatcherId)
      // Execution
      const eventData = {
        origin: '*',
        source: window,
        data: {
          _dispatcherId: 'dispatcherIdChild',
          type: CONNECTION_REQUEST,

        }
      }
      const event = new MessageEvent('message', eventData)
      window.dispatchEvent(event)
      // Assertion
      expect(dispatcher.dispatchers).toHaveLength(1)
      expect(Object.keys(dispatcher.services)).toHaveLength(1)
    })

    test('when same dispatcher try to connect twice', () => {
      // Declaration
      const dispatcherId = 'dispatcherId'
      const dispatcher = new MessageDispatcher(dispatcherId)
      // Execution
      const eventData = {
        origin: '*',
        source: window,
        data: {
          _dispatcherId: 'dispatcherIdChild',
          type: CONNECTION_REQUEST,
        }
      }
      const event = new MessageEvent('message', eventData)
      window.dispatchEvent(event)
      window.dispatchEvent(event)
      // Assertion
      expect(dispatcher.dispatchers).toHaveLength(1)
      expect(Object.keys(dispatcher.services)).toHaveLength(1)
    })

    test('when receiving connection acknowledge message', () => {
      // Declaration
      const dispatcherId = 'dispatcherId'
      const dispatcher = new MessageDispatcher(dispatcherId)
      // Execution
      const eventData = {
        origin: '*',
        data: {
          _dispatcherId: 'dispatcherIdParent',
          _serviceId: 'serviceChild',
          type: CONNECTION_ACKNOWLEDGE,

        }
      }
      const event = new MessageEvent('message', eventData)
      window.dispatchEvent(event)
      // Assertion
      expect(dispatcher.dispatchers).toHaveLength(0)
      expect(Object.keys(dispatcher.services)).toHaveLength(1)
    })

    test('when receiving connection closing message', () => {
      // Declaration
      const dispatcherId = 'dispatcherId'
      const dispatcher = new MessageDispatcher(dispatcherId)
      // Execution
      const eventData = {
        origin: '*',
        data: {
          _dispatcherId: 'dispatcherIdParent',
          _serviceId: 'serviceChild',
          type: CONNECTION_CLOSING,

        }
      }
      const event = new MessageEvent('message', eventData)
      window.dispatchEvent(event)
      // Assertion
      expect(dispatcher.dispatchers).toHaveLength(0)
      expect(dispatcher.services).toEqual({})
    })
  })

  describe('listeners', () => {

    test('Check that listeners are called', async () => {
      // Declaration
      const dispatcher = new MessageDispatcher()
      // Execution
      const spyListerner = jest.fn()
      dispatcher.register(spyListerner)
      dispatcher.reset()
      // Assertion
      expect(spyListerner).toHaveBeenCalledTimes(1)
    })

    test('Check that listeners can be removed', async () => {
      // Declaration
      const dispatcher = new MessageDispatcher()
      // Execution
      const spyListerner = jest.fn()
      dispatcher.register(spyListerner)
      dispatcher.unregister(spyListerner)
      dispatcher.reset()
      // Assertion
      expect(spyListerner).toHaveBeenCalledTimes(0)
    })

    test('Check that listeners can be removed with callback', async () => {
      // Declaration
      const dispatcher = new MessageDispatcher()
      // Execution
      const spyListerner = jest.fn()
      dispatcher.register(spyListerner)()
      dispatcher.reset()
      // Assertion
      expect(spyListerner).toHaveBeenCalledTimes(0)
    })
  })
})
