import Ajv from 'ajv'
import {
  PluginProvideElementSchema,
  PluginProvideElementsSchema,
} from '../../../../../src/lib/plugin/loader/schema'

describe('PluginProvideElementsSchema', () => {

  /* TEST DATA */


  /* TEST SETUP */

  let validate: any

  beforeEach(() => {
    const ajv = new Ajv({
      allowUnionTypes: true,
      schemas: [
        PluginProvideElementSchema,
        PluginProvideElementsSchema,
      ]
    })
    // Execution
    validate = ajv.getSchema('https://ash-uncover.github.io/ward/ward-plugin-provide-elements.schema.json')!
  })

  afterEach(() => {
    jest.restoreAllMocks()
  })


  /* TEST CASES */

  // compile //

  describe('compile', () => {

    test('properly loads schema', () => {
      // Declaration
      // Execution
      // Assertion
      expect(validate).toBeDefined()
    })
  })

  describe('validate', () => {

    test('when receiving empty object', () => {
      // Declaration
      const data = {}
      // Execution
      const valid = validate(data)
      // Assertion
      expect(valid).toBe(true)
      expect(validate.errors).toEqual(null)
    })

    test('when receiving object with some entries', () => {
      // Declaration
      const data = {
        element1: { url: 'url', type: 'iframe' },
        element2: { url: 'url', type: 'iframe' }
      }
      // Execution
      const valid = validate(data)
      // Assertion
      expect(valid).toBe(true)
      expect(validate.errors).toEqual(null)
    })

    test('when receiving object with some invalid entries', () => {
      // Declaration
      const data = {
        element1: { url: 'url', type: 'iframe' },
        element2: 'test'
      }
      // Execution
      const valid = validate(data)
      // Assertion
      expect(valid).toBe(false)
      expect(validate.errors).toHaveLength(1)
    })
  })
})