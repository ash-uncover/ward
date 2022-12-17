import { LogConfig } from '@uncover/js-utils-logger';
import MessageDispatcher, { reset } from '../../../src/lib/message/MessageDispatcher';

LogConfig.off()

describe('MessageDispatcher', () => {

  /* TEST DATA */

  /* TEST SETUP */

  let spyWindowAddEventListener: any
  let spyWindowRemoveEventListener: any
  let spyWindowParent: any

  beforeEach(() => {
    reset()
    spyWindowAddEventListener = jest.spyOn(window, 'addEventListener')
    spyWindowRemoveEventListener = jest.spyOn(window, 'removeEventListener')
    spyWindowParent = jest.spyOn(window, 'parent', 'get')
  })

  afterEach(() => {
    jest.clearAllMocks()
  })

  /* TEST CASES */

  // MessageDispatcher.start //

  describe('MessageDispatcher.start', () => {
    test('when there is a different parent window', () => {
      // Declaration
      const postMessage = jest.fn()
      const window2 = {
        ...window,
        postMessage
      }
      spyWindowParent.mockImplementation(() =>  window2)
      // Execution
      MessageDispatcher.start()
      // Assertion
      expect(spyWindowAddEventListener).toHaveBeenCalledTimes(1)
      expect(postMessage).toHaveBeenCalledTimes(1)
    })
  })

  // MessageDispatcher.stop //

  describe('MessageDispatcher.stop', () => {
    test('when called and there is a different window', () => {
      // Declaration
      const postMessage = jest.fn()
      const window2 = {
        ...window,
        postMessage
      }
      spyWindowParent.mockImplementation(() =>  window2)
      // Execution
      MessageDispatcher.start()
      MessageDispatcher.stop()
      // Assertion
      expect(spyWindowRemoveEventListener).toHaveBeenCalledTimes(1)
      expect(postMessage).toHaveBeenCalledTimes(2)
    })
  })
})
