import MessageService from '../../src'
import MessageDispatcher from '../../src/MessageDispatcher';

const DISPATCHER_ID = 'dispatcherId'
const DISPATCHER_ID_SHORT = 'dispatcherIdShort'

describe('MessageService', () => {

  let spyWindowPostMessage
  let spyWindowAddEventListener

  beforeEach(() => {
    spyWindowPostMessage = jest.spyOn(window, 'postMessage')
    spyWindowAddEventListener = jest.spyOn(window, 'addEventListener')

    jest.spyOn(MessageDispatcher, 'id', 'get').mockReturnValue(DISPATCHER_ID)
    jest.spyOn(MessageDispatcher, 'idShort', 'get').mockReturnValue(DISPATCHER_ID_SHORT)
  })

  afterEach(() => {
    jest.clearAllMocks()
  })

  describe('constructor', () => {

    test('when an id is sent to the constructor ', () => {
      // Declaration
      const id: string = 'serviceId'
      // Execution
      const service = new MessageService(id)
      // Asertion
      expect(service.id).toBe(id)
      expect(service.idShort).toBe(`${DISPATCHER_ID_SHORT}-eId`)
    })

    test('when the id is auto generated ', () => {
      // Declaration
      // Execution
      const service = new MessageService()
      // Asertion
      expect(service.id).not.toBeNull()
      expect(service.idShort).not.toBeNull()
      expect(service.id.endsWith(service.idShort.split(`${DISPATCHER_ID_SHORT}-`)[1])).toBe(true)
    })
  })
})
