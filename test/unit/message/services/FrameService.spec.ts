import { LogConfig } from '@uncover/js-utils-logger'
import FrameService from '../../../../src/lib/message/services/FrameService'
import MessageDispatcher, {
  CONNECTION_CLOSING
} from '../../../../src/lib/message/MessageDispatcher'
import { MessageServiceTypes } from '../../../../src/lib/message/model/model'

LogConfig.off()

describe('FrameService', () => {

  /* TEST DATA */

  const DISPATCHER_ID = 'dispatcherId'

  /* TEST SETUP */

  let spyWindow: any
  let spyWindowPostMessage: any
  let spyWindowAddEventListener: any

  let spyDispatcherId: any
  let spyDispatcherRemoveService: any
  let spyDispatcherSendMessage: any

  beforeEach(() => {
    jest.clearAllMocks()
    jest.resetAllMocks()

    spyWindowPostMessage = jest.fn()
    spyWindowAddEventListener = jest.fn()

    spyWindow = jest.spyOn(window, 'window', 'get')

    spyDispatcherId = jest.spyOn(MessageDispatcher.prototype, 'id', 'get')
    spyDispatcherRemoveService = jest.spyOn(MessageDispatcher.prototype, 'removeService')
    spyDispatcherSendMessage = jest.spyOn(MessageDispatcher.prototype, 'sendMessage')

    spyDispatcherId.mockImplementation(() => DISPATCHER_ID)
  })

  afterEach(() => {
  })

  /* TEST CASES */

  // constructor //

  describe('constructor', () => {

    test('properly initialize object', () => {
      // Declaration
      const dispatcher = new MessageDispatcher()
      const origin: string = '*'
      const serviceId: string = 'serviceId'
      spyWindow.mockImplementation(() => ({
        addEventListener: spyWindowAddEventListener,
        postMessage: spyWindowPostMessage
      }))
      // Execution
      const service = new FrameService(dispatcher, window, origin, serviceId)
      // Assertion
      expect(service.id).toBe(serviceId)
      expect(service.dispatcherId).toBe(DISPATCHER_ID)
      expect(service.window).toEqual(window)
      expect(service.type).toBe(MessageServiceTypes.FRAME)
      expect(spyWindowAddEventListener).toHaveBeenCalledTimes(2)
    })

    test('when the id is auto generated', () => {
      // Declaration
      const dispatcher = new MessageDispatcher()
      const origin: string = '*'
      spyWindow.mockImplementation(() => ({
        addEventListener: spyWindowAddEventListener,
        postMessage: spyWindowPostMessage
      }))
      // Execution
      const service = new FrameService(dispatcher, window, origin)
      // Assertion
      expect(service.id).toBeDefined()
      expect(service.dispatcherId).toBe(DISPATCHER_ID)
      expect(service.window).toEqual(window)
      expect(service.type).toBe(MessageServiceTypes.FRAME)
      expect(spyWindowAddEventListener).toHaveBeenCalledTimes(2)
    })
  })

  // FrameService.onMessage //

  describe('onMessage', () => {

    test('when window is not closed', () => {
      // Declaration
      const dispatcher = new MessageDispatcher()
      const origin: string = 'http://localhost'
      spyWindow.mockImplementation(() => ({
        closed: false,
        addEventListener: spyWindowAddEventListener,
        postMessage: spyWindowPostMessage
      }))
      const service = new FrameService(dispatcher, window, origin)
      // Execution
      service.onMessage({
        type: 'type',
        payload: 'payload'
      })
      // Assertion
      expect(spyDispatcherRemoveService).toHaveBeenCalledTimes(0)
      expect(spyWindowPostMessage).toHaveBeenCalledTimes(1)
      expect(spyWindowPostMessage).toHaveBeenCalledWith({
        type: 'type',
        payload: 'payload',
        _serviceId: service.id
      }, 'http://localhost')
    })

    test('when window is closed', () => {
      // Declaration
      const dispatcher = new MessageDispatcher()
      const origin: string = '*'
      spyWindow.mockImplementation(() => ({
        closed: true,
        addEventListener: spyWindowAddEventListener,
        postMessage: spyWindowPostMessage
      }))
      const service = new FrameService(dispatcher, window, origin)
      // Execution
      service.onMessage({
        type: 'type',
        payload: 'payload'
      })
      // Assertion
      expect(spyWindowPostMessage).toHaveBeenCalledTimes(0)
      expect(spyDispatcherRemoveService).toHaveBeenCalledTimes(1)
    })
  })

  // FrameService.sendMessage //

  describe('sendMessage', () => {

    test('when initialized', () => {
      // Declaration
      const dispatcher = new MessageDispatcher()
      const origin: string = '*'
      const service = new FrameService(dispatcher, window, origin)
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

  // FrameService.#handleUnload //

  describe('#handleUnload', () => {

    let spyServiceOnMessage: any

    test('', () => {
      // Declaration
      const dispatcher = new MessageDispatcher()
      const origin: string = '*'
      const service = new FrameService(dispatcher, window, origin)
      spyServiceOnMessage = jest.spyOn(service, 'onMessage')
      // Execution
      const event = new MessageEvent('unload')
      window.dispatchEvent(event)
      // Assertion
      expect(spyServiceOnMessage).toHaveBeenCalledTimes(1)
    })
  })


  // FrameService.#handleMessage //

  describe('#handleMessage', () => {

    let spyServiceSendMessage: any

    test('when window receives a message without dispatcher or service information', () => {
      // Declaration
      const dispatcher = new MessageDispatcher()
      const origin: string = '*'
      const service = new FrameService(dispatcher, window, origin)
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
      const dispatcher = new MessageDispatcher()
      const origin: string = '*'
      const service = new FrameService(dispatcher, window, origin)
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
      const dispatcher = new MessageDispatcher()
      const origin: string = '*'
      const service = new FrameService(dispatcher, window, origin)
      spyServiceSendMessage = jest.spyOn(service, 'sendMessage')
      // Execution
      const event = new MessageEvent('message', {})
      window.dispatchEvent(event)
      // Assertion
      expect(spyServiceSendMessage).toHaveBeenCalledTimes(0)
    })

    test('when window receives a message with same dispatcher information', () => {
      // Declaration
      const dispatcher = new MessageDispatcher()
      const origin: string = '*'
      const service = new FrameService(dispatcher, window, origin)
      spyServiceSendMessage = jest.spyOn(service, 'sendMessage')
      // Execution
      const message = {
        type: 'type',
        payload: 'payload',
        _serviceId: 'dummy',
        _dispatcherId: DISPATCHER_ID
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
      expect(spyDispatcherRemoveService).toHaveBeenCalledTimes(0)
    })

    test('when window receives a close message', () => {
      // Declaration
      const dispatcher = new MessageDispatcher()
      const origin: string = '*'
      const service = new FrameService(dispatcher, window, origin)
      spyServiceSendMessage = jest.spyOn(service, 'sendMessage')
      // Execution
      const message = {
        type: CONNECTION_CLOSING,
        payload: 'payload',
        _serviceId: service.id,
        _dispatcherId: DISPATCHER_ID
      }
      const event = new MessageEvent('message', { data: message })
      window.dispatchEvent(event)
      // Assertion
      expect(spyServiceSendMessage).toHaveBeenCalledTimes(0)
      expect(spyDispatcherRemoveService).toHaveBeenCalled()
    })
  })
})
