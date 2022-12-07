import { LogConfig } from '@uncover/js-utils-logger';
import MessageService from '../../src'
import MessageDispatcher, { getDispatcherId, getDispatcherIdShort } from '../../src/MessageDispatcher';

const DISPATCHER_ID = 'dispatcherId'
const DISPATCHER_ID_SHORT = 'dispatcherIdShort'

jest.mock('../../src/MessageDispatcher', () => ({
  ...(jest.requireActual('../../src/MessageDispatcher')),
  __esModule: true,
  getDispatcherId: jest.fn(() => DISPATCHER_ID),
  getDispatcherIdShort: jest.fn(() => DISPATCHER_ID_SHORT)
}))

LogConfig.off()

describe('MessageService', () => {

  /* TEST DATA */


  /* TEST SETUP */

  let spyDispatcherAddService: any
  let spyDispatcherSendMessage: any

  beforeAll(() => {

  })

  beforeEach(() => {
    spyDispatcherAddService = jest.spyOn(MessageDispatcher, 'addService')
    spyDispatcherSendMessage = jest.spyOn(MessageDispatcher, 'sendMessage')
  })

  afterEach(() => {
    jest.clearAllMocks()
  })

  /* TEST CASES */

  // new MessageService //

  describe('constructor', () => {

    test('when an id is sent to the constructor ', () => {
      // Declaration
      const id: string = 'serviceId'
      // Execution
      const service = new MessageService(id)
      // Assertion
      expect(service.id).toBe(id)
      expect(service.idShort).toBe(`${DISPATCHER_ID_SHORT}-eId`)
    })

    test('when the id is auto generated', () => {
      // Declaration
      // Execution
      const service = new MessageService()
      // Assertion
      expect(service.id).not.toBeNull()
      expect(service.idShort).not.toBeNull()
      expect(service.id.endsWith(service.idShort.split(`${DISPATCHER_ID_SHORT}-`)[1])).toBe(true)
    })
  })

  // MessageService.init //

  describe('init', () => {
    test('when initializing a service', () => {
      // Declaration
      const service = new MessageService()
      const handler = jest.fn()
      const closure = jest.fn()
      spyDispatcherAddService.mockReturnValue(closure)
      // Execution
      service.init(handler)
      // Assertion
      expect(spyDispatcherAddService).toHaveBeenCalledTimes(1)
    })

    test('when initializing and closing a service', () => {
      // Declaration
      const service = new MessageService()
      const handler = jest.fn()
      const closure = jest.fn()
      spyDispatcherAddService.mockReturnValue(closure)
      // Execution
      service.init(handler)()
      // Assertion
      expect(spyDispatcherAddService).toHaveBeenCalledTimes(1)
      expect(closure).toHaveBeenCalledTimes(1)
    })
  })

  // MessageService.onMessage //

  describe('onMessage', () => {
    test('when not initialized', () => {
      // Declaration
      const service = new MessageService()
      // Execution
      service.onMessage({ type: 'type', payload: 'paylaod' })
      // Assertion
      expect(true).toBe(true) // Nothing to expect
    })

    test('when initialized', () => {
      // Declaration
      const service = new MessageService()
      const handler = jest.fn()
      // Execution
      service.init(handler)
      service.onMessage({ type: 'type', payload: 'paylaod' })
      // Assertion
      expect(handler).toHaveBeenCalledTimes(1)
      expect(handler).toHaveBeenCalledWith({
        type: 'type',
        payload: 'paylaod'
      })
    })
  })

  // MessageService.sendMessage //

  describe('sendMessage', () => {
    test('when not initialized', () => {
      // Declaration
      const service = new MessageService()
      // Execution
      service.sendMessage({ type: 'type', payload: 'paylaod' })
      // Assertion
      expect(true).toBe(true) // Nothing to expect
    })

    test('when initialized', () => {
      // Declaration
      const service = new MessageService()
      const handler = jest.fn()
      // Execution
      service.init(handler)
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
