import Ajv from 'ajv'
import {
  PluginDefinePropertiesSchema,
} from '../../../../../src/lib/plugin/loader/schema'

describe('PluginDefinePropertiesSchema', () => {

  /* TEST DATA */


  /* TEST SETUP */

  let validate: any

  beforeEach(() => {
    const ajv = new Ajv({
      allowUnionTypes: true,
      schemas: [
        PluginDefinePropertiesSchema,
      ]
    })
    // Execution
    validate = ajv.getSchema('https://ash-uncover.github.io/ward/ward-plugin-define-properties.schema.json')!
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
        property1: 'string',
        property2: 'number',
        property3: 'boolean'
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
        property1: 'string',
        property2: 'test'
      }
      // Execution
      const valid = validate(data)
      // Assertion
      expect(valid).toBe(false)
      expect(validate.errors).toHaveLength(1)
    })

    test('when receiving object with non string entries', () => {
      // Declaration
      const data = {
        property1: 'string',
        property2: true
      }
      // Execution
      const valid = validate(data)
      // Assertion
      expect(valid).toBe(false)
      expect(validate.errors).toHaveLength(1)
    })
  })
})