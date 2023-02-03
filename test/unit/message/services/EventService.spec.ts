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
      const handleMessage = jest.fn()
      spyDispatcherId.mockImplementation(() => 'dispatcherId')
      // Execution
      const service = new EventService(dispatcher, handleMessage)
      // Assertion
      expect(service.id).toBeDefined()
      expect(service.dispatcherId).toEqual('dispatcherId')
      expect(service.type).toEqual(MessageServiceTypes.EVENT)
    })
  })

  // EventService.terminate //

  describe('terminate', () => {

    test('when terminating a service', () => {
      // Declaration
      const dispatcher = new MessageDispatcher()
      const handleMessage = jest.fn()
      const service = new EventService(dispatcher, handleMessage)
      // Execution
      service.terminate()
      // Assertion
      expect(spyDispatcherRemoveService).toHaveBeenCalledTimes(1)
      expect(spyDispatcherRemoveService).toHaveBeenCalledWith(service)
    })
  })

  // EventService.onMessage //

  describe('onMessage', () => {

    test('when initialized', () => {
      // Declaration
      const dispatcher = new MessageDispatcher()
      const handleMessage = jest.fn()
      const service = new EventService(dispatcher, handleMessage)
      // Execution
      service.onMessage({ type: 'type', payload: 'paylaod' })
      // Assertion
      expect(handleMessage).toHaveBeenCalledTimes(1)
      expect(handleMessage).toHaveBeenCalledWith({
        type: 'type',
        payload: 'paylaod'
      })
    })
  })

  // EventService.sendMessage //

  describe('sendMessage', () => {

    test('when initialized', () => {
      // Declaration
      const dispatcher = new MessageDispatcher()
      const handleMessage = jest.fn()
      const service = new EventService(dispatcher, handleMessage)
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
