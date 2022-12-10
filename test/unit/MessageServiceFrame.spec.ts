import { LogConfig } from '@uncover/js-utils-logger'
import MessageServiceFrame from '../../src/lib/MessageServiceFrame'
import MessageDispatcher from '../../src/lib/MessageDispatcher'

const DISPATCHER_ID = 'dispatcherId'
const DISPATCHER_ID_SHORT = 'dispatcherIdShort'

jest.mock('../../src/lib/MessageDispatcher', () => ({
  ...(jest.requireActual('../../src/lib/MessageDispatcher')),
  __esModule: true,
  getDispatcherId: jest.fn(() => DISPATCHER_ID),
  getDispatcherIdShort: jest.fn(() => DISPATCHER_ID_SHORT)
}))

LogConfig.off()

describe('MessageServiceFrame', () => {

  /* TEST SETUP */

  let spyWindowPostMessage: any

  let spyDispatcherSendMessage: any
  let spyDispatcherRemoveService: any


  beforeEach(() => {
    spyWindowPostMessage = jest.spyOn(window, 'postMessage')
    spyDispatcherSendMessage = jest.spyOn(MessageDispatcher, 'sendMessage')
    spyDispatcherRemoveService = jest.spyOn(MessageDispatcher, 'removeService')
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
      const spyWindowAddEventListener = jest.spyOn(window, 'addEventListener')
      // Execution
      const service = new MessageServiceFrame(dispatcherId, window, serviceId)
      // Assertion
      expect(service.id).toBe(serviceId)
      expect(spyWindowAddEventListener).toHaveBeenCalledTimes(3)
    })

    test('when the id is auto generated', () => {
      // Declaration
      const dispatcherId: string = 'dispatcherId'
      const spyWindowAddEventListener = jest.spyOn(window, 'addEventListener')
      // Execution
      const service = new MessageServiceFrame(dispatcherId, window, )
      // Assertion
      expect(service.id).not.toBeNull()
      expect(spyWindowAddEventListener).toHaveBeenCalledTimes(3)
    })
  })

  // MessageServiceFrame.onMessage //

  describe('onMessage', () => {
    test('when initialized', () => {
      // Declaration
      const dispatcherId: string = 'dispatcherId'
      const service = new MessageServiceFrame(dispatcherId, window)
      // Execution
      service.onMessage({ type: 'type', payload: 'payload' })
      // Assertion
      expect(spyWindowPostMessage).toHaveBeenCalledTimes(1)
      expect(spyWindowPostMessage).toHaveBeenCalledWith({
        type: 'type',
        payload: 'payload',
        _serviceId: service.id
      }, '*')
    })

    test('when closing', () => {
      // Declaration
      const dispatcherId: string = 'dispatcherId'
      const service = new MessageServiceFrame(dispatcherId, window)
      // Execution
      service.onMessage({ type: 'type', payload: 'payload' })
      const event = new CustomEvent('unload');
      window.dispatchEvent(event)
      // Assertion
      expect(spyDispatcherRemoveService).toHaveBeenCalled()
    })
  })

  // MessageServiceFrame.sendMessage //

  describe('sendMessage', () => {
    test('when initialized', () => {
      // Declaration
      const dispatcherId: string = 'dispatcherId'
      const service = new MessageServiceFrame(dispatcherId, window)
      // Execution
      service.sendMessage({ type: 'type', payload: 'payload' })
      // Assertion
      expect(spyDispatcherSendMessage).toHaveBeenCalledTimes(1)
      expect(spyDispatcherSendMessage).toHaveBeenCalledWith({
        type: 'type',
        payload: 'payload',
        _serviceId: service.id
      })
    })
  })

  // MessageServiceFrame.#handleMessage //

  describe('sendMessage', () => {

    let spyServiceSendMessage: any

    test('when window receives a message without dispatcher or service information', () => {
      // Declaration
      const dispatcherId: string = 'dispatcherId'
      const service = new MessageServiceFrame(dispatcherId, window)
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
      const service = new MessageServiceFrame(dispatcherId, window)
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
      const service = new MessageServiceFrame(dispatcherId, window)
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
      const service = new MessageServiceFrame(dispatcherId, window)
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
  })
})
