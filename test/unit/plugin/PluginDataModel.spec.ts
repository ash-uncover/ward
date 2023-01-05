import {
  PluginData,
  PluginDataDefine,
  PluginDataDefines,
  PluginDataErrors,
  PluginDataProvide,
  PluginDataProvideElement,
  PluginDataValidator
} from '../../../src/lib/plugin/model/PluginDataModel'

describe('PluginDataModel', () => {

  /* TEST DATA */


  /* TEST SETUP */

  let spyCheckPluginDataDefines: any
  let spyCheckPluginDataDefine: any
  let spyCheckPluginDataDefineProperties: any
  let spyCheckPluginDataDefineAtributes: any
  let spyCheckPluginDataDefineAttribute: any
  let spyCheckPluginDataDefineElements: any
  let spyCheckPluginDataDefineElement: any
  let spyCheckPluginDataProvides: any
  let spyCheckPluginDataProvide: any
  let spyCheckPluginDataProvideAttributes: any
  let spyCheckPluginDataProvideElements: any
  let spyCheckPluginDataProvideElement: any

  beforeEach(() => {
  })

  afterEach(() => {
    jest.restoreAllMocks()
  })


  /* TEST CASES */

  // PluginDataValidator //

  describe('PluginDataValidator', () => {

    describe('checkPluginData', () => {

      beforeEach(() => {
        spyCheckPluginDataDefines = jest.spyOn(PluginDataValidator, 'checkPluginDataDefines')
        spyCheckPluginDataProvides = jest.spyOn(PluginDataValidator, 'checkPluginDataProvides')
      })

      test('When data has no name & no url defined', async () => {
        // Declaration
        // @ts-ignore
        const data: PluginData = {}
        // Execution
        const result = PluginDataValidator.checkPluginData(data)
        // Assertion
        const expected = [
          PluginDataErrors.NAME_MISSING,
          PluginDataErrors.URL_MISSING
        ]
        expect(result).toEqual(expected)
        expect(spyCheckPluginDataDefines).toHaveBeenCalledTimes(0)
        expect(spyCheckPluginDataProvides).toHaveBeenCalledTimes(0)
      })

      test('When data name & url are not a string', async () => {
        // Declaration
        const data: PluginData = {
          // @ts-ignore
          name: true,
          // @ts-ignore
          url: 1
        }
        // Execution
        const result = PluginDataValidator.checkPluginData(data)
        // Assertion
        const expected = [
          PluginDataErrors.NAME_TYPE,
          PluginDataErrors.URL_TYPE
        ]
        expect(result).toEqual(expected)
        expect(spyCheckPluginDataDefines).toHaveBeenCalledTimes(0)
        expect(spyCheckPluginDataProvides).toHaveBeenCalledTimes(0)
      })

      test('When data name & url are valid', async () => {
        // Declaration
        const data: PluginData = {
          name: 'name',
          url: 'url',
          defines: {},
          provides: {}
        }
        const definesError = 'definesError'
        const providesError = 'providesError'
        spyCheckPluginDataDefines.mockImplementation(() => [definesError])
        spyCheckPluginDataProvides.mockImplementation(() => [providesError])
        // Execution
        const result = PluginDataValidator.checkPluginData(data)
        // Assertion
        const expected = [definesError, providesError]
        expect(result).toEqual(expected)
        expect(spyCheckPluginDataDefines).toHaveBeenCalledTimes(1)
        expect(spyCheckPluginDataProvides).toHaveBeenCalledTimes(1)
      })
    })

    describe('checkPluginDataDefines', () => {

      beforeEach(() => {
        spyCheckPluginDataDefine = jest.spyOn(PluginDataValidator, 'checkPluginDataDefine')
      })

      test('When "defines" is not an object', () => {
        // Declaration
        // @ts-ignore
        const data: PluginDataDefines = 'hello'
        // Execution
        const result = PluginDataValidator.checkPluginDataDefines(data)
        // Assertion
        const expected: string[] = [PluginDataErrors.DEFINES_TYPE]
        expect(result).toEqual(expected)
        expect(spyCheckPluginDataDefine).toHaveBeenCalledTimes(0)
      })

      test('When "defines" is a valid object', () => {
        // Declaration
        const data: PluginDataDefines = {
          // @ts-ignore
          define1: 'define1Error',
          // @ts-ignore
          define2: 'define2Error'
        }
        spyCheckPluginDataDefine.mockImplementation((define: any) => [define])
        // Execution
        const result = PluginDataValidator.checkPluginDataDefines(data)
        // Assertion
        const expected = [
          data.define1,
          data.define2
        ]
        expect(result).toEqual(expected)
        expect(spyCheckPluginDataDefine).toHaveBeenCalledTimes(2)
      })
    })

    describe('checkPluginDataDefine', () => {

      beforeEach(() => {
        spyCheckPluginDataDefines = jest.spyOn(PluginDataValidator, 'checkPluginDataDefines')
      })

      test('', () => {
        // Declaration
        const data: PluginDataDefine = {}
        // Execution
        const result = PluginDataValidator.checkPluginDataDefine(data)
        // Assertion
        const expected: string[] = []
        expect(result).toEqual(expected)
      })
    })

    describe('checkPluginDataDefineProperties', () => {

      beforeEach(() => {
        spyCheckPluginDataDefines = jest.spyOn(PluginDataValidator, 'checkPluginDataDefines')
      })

      test('', () => {
        // Declaration
        const data = {}
        // Execution
        const result = PluginDataValidator.checkPluginDataDefineProperties(data)
        // Assertion
        const expected: string[] = []
        expect(result).toEqual(expected)
      })
    })

    describe('checkPluginDataDefineAttributes', () => {

      beforeEach(() => {
        spyCheckPluginDataDefines = jest.spyOn(PluginDataValidator, 'checkPluginDataDefines')
      })

      test('', () => {
        // Declaration
        const data = {}
        // Execution
        const result = PluginDataValidator.checkPluginDataDefineAttributes(data)
        // Assertion
        const expected: string[] = []
        expect(result).toEqual(expected)
      })
    })

    describe('checkPluginDataDefineElements', () => {

      beforeEach(() => {
        spyCheckPluginDataDefines = jest.spyOn(PluginDataValidator, 'checkPluginDataDefines')
      })

      test('', () => {
        // Declaration
        const data = {}
        // Execution
        const result = PluginDataValidator.checkPluginDataDefineElements(data)
        // Assertion
        const expected: string[] = []
        expect(result).toEqual(expected)
      })
    })

    describe('checkPluginDataDefineElement', () => {

      beforeEach(() => {
        spyCheckPluginDataDefines = jest.spyOn(PluginDataValidator, 'checkPluginDataDefines')
      })

      test('', () => {
        // Declaration
        const data = {}
        // Execution
        const result = PluginDataValidator.checkPluginDataDefineElement(data)
        // Assertion
        const expected: string[] = []
        expect(result).toEqual(expected)
      })
    })

    describe('checkPluginDataProvides', () => {

      beforeEach(() => {
        spyCheckPluginDataDefines = jest.spyOn(PluginDataValidator, 'checkPluginDataDefines')
      })

      test('', () => {
        // Declaration
        const data = {}
        // Execution
        const result = PluginDataValidator.checkPluginDataProvides(data)
        // Assertion
        const expected: string[] = []
        expect(result).toEqual(expected)
      })
    })

    describe('checkPluginDataProvide', () => {

      beforeEach(() => {
        spyCheckPluginDataDefines = jest.spyOn(PluginDataValidator, 'checkPluginDataDefines')
      })

      test('', () => {
        // Declaration
        const data: PluginDataProvide = {
          name: 'name'
        }
        // Execution
        const result = PluginDataValidator.checkPluginDataProvide(data)
        // Assertion
        const expected: string[] = []
        expect(result).toEqual(expected)
      })
    })

    describe('checkPluginDataProvideAttributes', () => {

      beforeEach(() => {
        spyCheckPluginDataDefines = jest.spyOn(PluginDataValidator, 'checkPluginDataDefines')
      })

      test('', () => {
        // Declaration
        const data = {}
        // Execution
        const result = PluginDataValidator.checkPluginDataProvideAttributes(data)
        // Assertion
        const expected: string[] = []
        expect(result).toEqual(expected)
      })
    })

    describe('checkPluginDataProvideElements', () => {

      beforeEach(() => {
        spyCheckPluginDataDefines = jest.spyOn(PluginDataValidator, 'checkPluginDataDefines')
      })

      test('', () => {
        // Declaration
        const data = {}
        // Execution
        const result = PluginDataValidator.checkPluginDataProvideElements(data)
        // Assertion
        const expected: string[] = []
        expect(result).toEqual(expected)
      })
    })

    describe('checkPluginDataProvideElement', () => {

      beforeEach(() => {
        spyCheckPluginDataDefines = jest.spyOn(PluginDataValidator, 'checkPluginDataDefines')
      })

      test('', () => {
        // Declaration
        const data: PluginDataProvideElement = {
          url: 'url',
          type: 'component'
        }
        // Execution
        const result = PluginDataValidator.checkPluginDataProvideElement(data)
        // Assertion
        const expected: string[] = []
        expect(result).toEqual(expected)
      })
    })
  })
})
