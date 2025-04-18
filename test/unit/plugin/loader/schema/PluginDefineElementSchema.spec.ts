import Ajv from 'ajv'
import {
  PluginDefineElementAttributesSchema,
  PluginDefineElementEventsSchema,
  PluginDefineElementPropertiesSchema,
  PluginDefineElementSchema,
} from '../../../../../src/plugin/loader/schema'

describe('PluginDefineElementSchema', () => {

  /* TEST DATA */


  /* TEST SETUP */

  let validate: any

  beforeEach(() => {
    const ajv = new Ajv({
      allowUnionTypes: true,
      schemas: [
        PluginDefineElementAttributesSchema,
        PluginDefineElementEventsSchema,
        PluginDefineElementPropertiesSchema,
        PluginDefineElementSchema
      ]
    })
    // Execution
    validate = ajv.getSchema('WardPluginDefineElementSchema')!
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

  // validate //

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

    test('when receiving non object', () => {
      // Declaration
      const data = 'test'
      // Execution
      const valid = validate(data)
      // Assertion
      expect(valid).toBe(false)
      expect(validate.errors).toHaveLength(1)
    })
  })
})