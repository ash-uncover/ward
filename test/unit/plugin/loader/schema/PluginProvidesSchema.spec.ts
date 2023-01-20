import Ajv from 'ajv'
import {
  PluginProvideAttributesSchema,
  PluginProvideElementSchema,
  PluginProvideElementsSchema,
  PluginProvidePropertiesSchema,
  PluginProvideSchema,
  PluginProvidesSchema,
} from '../../../../../src/lib/plugin/loader/schema'

describe('PluginProvidesSchema', () => {

  /* TEST DATA */


  /* TEST SETUP */

  let validate: any

  beforeEach(() => {
    const ajv = new Ajv({
      allowUnionTypes: true,
      schemas: [
        PluginProvideAttributesSchema,
        PluginProvideElementSchema,
        PluginProvideElementsSchema,
        PluginProvidePropertiesSchema,
        PluginProvideSchema,
        PluginProvidesSchema,
      ]
    })
    // Execution
    validate = ajv.getSchema('https://ash-uncover.github.io/ward/ward-plugin-provides.schema.json')!
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
        define1: {},
      }
      // Execution
      const valid = validate(data)
      // Assertion
      expect(valid).toBe(true)
      expect(validate.errors).toEqual(null)
    })
  })
})