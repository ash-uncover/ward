import Ajv from 'ajv'
import {
  PluginDefineAttributesSchema,
  PluginDefineElementAttributesSchema,
  PluginDefineElementEventsSchema,
  PluginDefineElementPropertiesSchema,
  PluginDefineElementSchema,
  PluginDefineElementsSchema,
  PluginDefinePropertiesSchema,
  PluginDefineSchema,
  PluginDefinesSchema,
} from '../../../../../src/plugin/loader/schema'

describe('PluginDefinesSchema', () => {

  /* TEST DATA */


  /* TEST SETUP */

  let validate: any

  beforeEach(() => {
    const ajv = new Ajv({
      allowUnionTypes: true,
      schemas: [
        PluginDefineAttributesSchema,
        PluginDefineElementAttributesSchema,
        PluginDefineElementEventsSchema,
        PluginDefineElementPropertiesSchema,
        PluginDefineElementSchema,
        PluginDefineElementsSchema,
        PluginDefinePropertiesSchema,
        PluginDefineSchema,
        PluginDefinesSchema,
      ]
    })
    // Execution
    validate = ajv.getSchema('WardPluginDefinesSchema')!
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
        define1: {
          properties: {
            prop: "string"
          },
          attributes: {
            att: "string"
          },
          elements: {
            elem: {}
          }
        },
      }
      // Execution
      const valid = validate(data)
      // Assertion
      expect(valid).toBe(true)
      expect(validate.errors).toEqual(null)
    })
  })
})