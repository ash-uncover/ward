import { LogConfig } from '@uncover/js-utils-logger'
import EventService from '../../../../src/lib/message/services/EventService'
import MessageDispatcher from '../../../../src/lib/message/MessageDispatcher'
import { MessageServiceTypes } from '../../../../src/lib/message/model/model'

LogConfig.off()

describe('EventService', () => {

  /* TEST DATA */


  /* TEST SETUP */

  let spyDispatcherId: any
  let spyDispatcherRemoveService: any
  let spyDispatcherSendMessage: any

  beforeAll(() => {

  })

  beforeEach(() => {
    spyDispatcherId = jest.spyOn(MessageDispatcher.prototype, 'id', 'get')
    spyDispatcherRemoveService = jest.spyOn(MessageDispatcher.prototype, 'removeService')
    spyDispatcherSendMessage = jest.spyOn(MessageDispatcher.prototype, 'sendMessage')
  })

  afterEach(() => {
    jest.clearAllMocks()
  })

  /* TEST CASES */

  // new EventService //

  describe('constructor', () => {

    test('properly initialize object', () => {
      // Declaration
      const dispatcher = new MessageDispatcher()
      const id = 'serviceId'
      spyDispatcherId.mockImplementation(() => 'dispatcherId')
      // Execution
      const service = new EventService(dispatcher, id)
      // Assertion
      expect(service.id).toEqual(id)
      expect(service.dispatcherId).toEqual('dispatcherId')
      expect(service.type).toEqual(MessageServiceTypes.EVENT)
    })
  })

  // EventService.terminate //

  describe('terminate', () => {

    test('when terminating a service', () => {
      // Declaration
      const dispatcher = new MessageDispatcher()
      const service = new EventService(dispatcher)
      // Execution
      service.terminate()
      // Assertion
      expect(spyDispatcherRemoveService).toHaveBeenCalledTimes(1)
      expect(spyDispatcherRemoveService).toHaveBeenCalledWith(service)
    })
  })

  // EventService.addHandler //

  describe('addHandler', () => {

    test('when initialized', () => {
      // Declaration
      const dispatcher = new MessageDispatcher()
      const service = new EventService(dispatcher)
      const handleMessage = jest.fn()
      const message = {
        type: 'type',
        payload: 'payload'
      }
      // Execution
      service.addHandler(handleMessage)
      service.onMessage(message)
      // Assertion
      expect(handleMessage).toHaveBeenCalledTimes(1)
      expect(handleMessage).toHaveBeenCalledWith(message)
    })
  })

  // EventService.removeHandler //

  describe('removeHandler', () => {

    test('when called explicitly', () => {
      // Declaration
      const dispatcher = new MessageDispatcher()
      const handleMessage = jest.fn()
      const service = new EventService(dispatcher)
      const message = {
        type: 'type',
        payload: 'payload'
      }
      // Execution
      service.addHandler(handleMessage)
      service.removeHandler(handleMessage)
      service.onMessage(message)
      // Assertion
      expect(handleMessage).toHaveBeenCalledTimes(0)
    })

    test('when called from returned callback', () => {
      // Declaration
      const dispatcher = new MessageDispatcher()
      const handleMessage = jest.fn()
      const service = new EventService(dispatcher)
      const message = {
        type: 'type',
        payload: 'payload'
      }
      // Execution
      service.addHandler(handleMessage)()
      service.onMessage(message)
      // Assertion
      expect(handleMessage).toHaveBeenCalledTimes(0)
    })
  })

  // EventService.onMessage //

  describe('onMessage', () => {

    test('when initialized', () => {
      // Declaration
      const dispatcher = new MessageDispatcher()
      const handleMessage = jest.fn()
      const handleMessage2 = jest.fn()
      const service = new EventService(dispatcher)
      service.addHandler(handleMessage)
      service.addHandler(handleMessage2)
      const message = {
        type: 'type',
        payload: 'payload'
      }
      // Execution
      service.onMessage(message)
      // Assertion
      expect(handleMessage).toHaveBeenCalledTimes(1)
      expect(handleMessage).toHaveBeenCalledWith(message)
      expect(handleMessage2).toHaveBeenCalledTimes(1)
      expect(handleMessage2).toHaveBeenCalledWith(message)
    })
  })

  // EventService.sendMessage //

  describe('sendMessage', () => {

    test('when initialized', () => {
      // Declaration
      const dispatcher = new MessageDispatcher()
      const handleMessage = jest.fn()
      const service = new EventService(dispatcher)
      service.addHandler(handleMessage)
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
})
