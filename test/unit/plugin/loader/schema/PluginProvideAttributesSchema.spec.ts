import Ajv from 'ajv'
import {
  PluginProvideAttributesSchema,
} from '../../../../../src/lib/plugin/loader/schema'

describe('PluginProvideAttributesSchema', () => {

  /* TEST DATA */

  /* TEST SETUP */

  let validate: any

  beforeEach(() => {
    const ajv = new Ajv({
      allowUnionTypes: true,
      schemas: [
        PluginProvideAttributesSchema,
      ]
    })
    // Execution
    validate = ajv.getSchema('https://ash-uncover.github.io/ward/ward-plugin-provide-attributes.schema.json')!
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
        attribute1: 'string',
        attribute2: 1,
        attribute3: false
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
        attribute1: 'string',
        attribute2: {}
      }
      // Execution
      const valid = validate(data)
      // Assertion
      expect(valid).toBe(false)
      expect(validate.errors).toHaveLength(1)
    })
  })
})