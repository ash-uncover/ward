import { LogConfig } from '@uncover/js-utils-logger'
import MessageServiceFrame from '../../../src/lib/message/MessageServiceFrame'
import MessageDispatcher, { CONNECTION_CLOSING } from '../../../src/lib/message/MessageDispatcher'

const DISPATCHER_ID = 'dispatcherId'
const DISPATCHER_ID_SHORT = 'dispatcherIdShort'

jest.mock('../../../src/lib/message/MessageDispatcher', () => ({
  const actual = (jest.requireActual('../../../src/lib/message/MessageDispatcher'))
  return {
    ...actual,
    default: {
      ...actual.default,
      removeService: jest.fn(),
      sendMessage: jest.fn()
    },
    __esModule: true,
    getDispatcherId: jest.fn(() => DISPATCHER_ID),
    getDispatcherIdShort: jest.fn(() => DISPATCHER_ID_SHORT)
  }
}))

LogConfig.off()

describe('MessageServiceFrame', () => {

  /* TEST SETUP */

  let spyWindowPostMessage: any

  beforeEach(() => {
    spyWindowPostMessage = jest.spyOn(window, 'postMessage')
  })

  afterEach(() => {
    jest.clearAllMocks()
  })

  /* TEST CASES */

  // new MessageServiceFrame //

  describe('constructor', () => {

    test('when an id is sent to the constructor ', () => {
      // Declaration
      const dispatcherId: string = 'dispatcherId'
      const serviceId: string = 'serviceId'
      const origin: string = '*'
      const spyWindowAddEventListener = jest.spyOn(window, 'addEventListener')
      // Execution
      const service = new MessageServiceFrame(dispatcherId, window, origin, serviceId)
      // Assertion
      expect(service.id).toBe(serviceId)
      expect(spyWindowAddEventListener).toHaveBeenCalledTimes(2)
    })

    test('when the id is auto generated', () => {
      // Declaration
      const dispatcherId: string = 'dispatcherId'
      const origin: string = '*'
      const spyWindowAddEventListener = jest.spyOn(window, 'addEventListener')
      // Execution
      const service = new MessageServiceFrame(dispatcherId, window, origin)
      // Assertion
      expect(service.id).not.toBeNull()
      expect(spyWindowAddEventListener).toHaveBeenCalledTimes(2)
    })
  })

  // MessageServiceFrame.onMessage //

  describe('onMessage', () => {
    test('when initialized', () => {
      // Declaration
      const dispatcherId: string = 'dispatcherId'
      const origin: string = 'http://localhost'
      const service = new MessageServiceFrame(dispatcherId, window, origin)
      // Execution
      service.onMessage({
        type: 'type',
        payload: 'payload'
      })
      // Assertion
      expect(spyWindowPostMessage).toHaveBeenCalledTimes(1)
      expect(spyWindowPostMessage).toHaveBeenCalledWith({
        type: 'type',
        payload: 'payload',
        _serviceId: service.id
      }, 'http://localhost')
    })

    test('when closing', () => {
      // Declaration
      const dispatcherId: string = 'dispatcherId'
      const origin: string = '*'
      const service = new MessageServiceFrame(dispatcherId, window, origin)
      // Execution
      service.onMessage({
        type: 'type',
        payload: 'payload'
      })
      const event = new CustomEvent('unload');
      window.dispatchEvent(event)
      // Assertion
      expect(MessageDispatcher.removeService).toHaveBeenCalled()
    })
  })

  // MessageServiceFrame.sendMessage //

  describe('sendMessage', () => {
    test('when initialized', () => {
      // Declaration
      const dispatcherId: string = 'dispatcherId'
      const origin: string = '*'
      const service = new MessageServiceFrame(dispatcherId, window, origin)
      // Execution
      service.sendMessage({ type: 'type', payload: 'payload' })
      // Assertion
      expect(MessageDispatcher.sendMessage).toHaveBeenCalledTimes(1)
      expect(MessageDispatcher.sendMessage).toHaveBeenCalledWith({
        type: 'type',
        payload: 'payload',
        _serviceId: service.id
      })
    })
  })

  // MessageServiceFrame.#handleMessage //

  describe('#handleMessage', () => {

    let spyServiceSendMessage: any

    test('when window receives a message without dispatcher or service information', () => {
      // Declaration
      const dispatcherId: string = 'dispatcherId'
      const origin: string = '*'
      const service = new MessageServiceFrame(dispatcherId, window, origin)
      spyServiceSendMessage = jest.spyOn(service, 'sendMessage')
      // Execution
      const message = {
        type: 'type',
        payload: 'payload'
      }
      const event = new MessageEvent('message', { data: message })
      window.dispatchEvent(event)
      // Assertion
      expect(spyServiceSendMessage).toHaveBeenCalledTimes(0)
    })

    test('when window receives a message with same dispatcher information', () => {
      // Declaration
      const dispatcherId: string = 'dispatcherId'
      const origin: string = '*'
      const service = new MessageServiceFrame(dispatcherId, window, origin)
      spyServiceSendMessage = jest.spyOn(service, 'sendMessage')
      // Execution
      const message = {
        type: 'type',
        payload: 'payload',
        _serviceId: 'dummy',
        _dispatcherId: 'dummy'
      }
      const event = new MessageEvent('message', { data: message })
      window.dispatchEvent(event)
      // Assertion
      expect(spyServiceSendMessage).toHaveBeenCalledTimes(0)
    })

    test('when window receives a message with same dispatcher information and no data', () => {
      // Declaration
      const dispatcherId: string = 'dispatcherId'
      const origin: string = '*'
      const service = new MessageServiceFrame(dispatcherId, window, origin)
      spyServiceSendMessage = jest.spyOn(service, 'sendMessage')
      // Execution
      const message = {
        type: 'type',
        payload: 'payload',
        _serviceId: 'dummy',
        _dispatcherId: dispatcherId
      }
      const event = new MessageEvent('message', {})
      window.dispatchEvent(event)
      // Assertion
      expect(spyServiceSendMessage).toHaveBeenCalledTimes(0)
    })

    test('when window receives a message with same dispatcher information', () => {
      // Declaration
      const dispatcherId: string = 'dispatcherId'
      const origin: string = '*'
      const service = new MessageServiceFrame(dispatcherId, window, origin)
      spyServiceSendMessage = jest.spyOn(service, 'sendMessage')
      // Execution
      const message = {
        type: 'type',
        payload: 'payload',
        _serviceId: 'dummy',
        _dispatcherId: dispatcherId
      }
      const event = new MessageEvent('message', { data: message })
      window.dispatchEvent(event)
      // Assertion
      expect(spyServiceSendMessage).toHaveBeenCalledTimes(1)
      expect(spyServiceSendMessage).toHaveBeenCalledWith({
        _serviceId: service.id,
        type: 'type',
        payload: 'payload'
      })
    })

    test('when window receives a close message', () => {
      // Declaration
      const dispatcherId: string = 'dispatcherId'
      const origin: string = '*'
      const service = new MessageServiceFrame(dispatcherId, window, origin)
      spyServiceSendMessage = jest.spyOn(service, 'sendMessage')
      // Execution
      const message = {
        type: CONNECTION_CLOSING,
        payload: 'payload',
        _serviceId: 'dummy',
        _dispatcherId: dispatcherId
      }
      const event = new MessageEvent('message', { data: message })
      window.dispatchEvent(event)
      // Assertion
      expect(spyServiceSendMessage).toHaveBeenCalledTimes(0)
      expect(MessageDispatcher.removeService).toHaveBeenCalled()
    })
  })
})
