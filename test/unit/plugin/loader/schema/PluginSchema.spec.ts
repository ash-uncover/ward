import Ajv from 'ajv'
import {
  PluginDefineAttributesSchema,
  PluginDefineElementSchema,
  PluginDefineElementsSchema,
  PluginDefinePropertiesSchema,
  PluginDefineSchema,
  PluginDefinesSchema,

  PluginProvideAttributesSchema,
  PluginProvideElementSchema,
  PluginProvideElementsSchema,
  PluginProvidePropertiesSchema,
  PluginProvideSchema,
  PluginProvidesSchema,

  PluginSchema
} from '../../../../../src/lib/plugin/loader/schema'

describe('PluginSchema', () => {

  /* TEST DATA */


  /* TEST SETUP */

  let validate: any

  beforeEach(() => {
    const ajv = new Ajv({
      allowUnionTypes: true,
      schemas: [
        PluginDefineAttributesSchema,
        PluginDefineElementSchema,
        PluginDefineElementsSchema,
        PluginDefinePropertiesSchema,
        PluginDefineSchema,
        PluginDefinesSchema,

        PluginProvideAttributesSchema,
        PluginProvideElementSchema,
        PluginProvideElementsSchema,
        PluginProvidePropertiesSchema,
        PluginProvideSchema,
        PluginProvidesSchema,

        PluginSchema
      ]
    })
    // Execution
    validate = ajv.getSchema('WardPluginSchema')!
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

    test('when receiving basic object', () => {
      // Declaration
      const data = {
        name: 'name',
        url: 'url',
        dependencies: ['dep1', 'dep2'],
        defines: {},
        provides: {}
      }
      // Execution
      const valid = validate(data)
      // Assertion
      expect(valid).toBe(true)
      expect(validate.errors).toEqual(null)
    })

    test('when missing name', () => {
      // Declaration
      const data = {
        url: 'url',
        dependencies: [],
        defines: {},
        provides: {}
      }
      // Execution
      const valid = validate(data)
      // Assertion
      expect(valid).toBe(false)
      expect(validate.errors).toHaveLength(1)
    })

    test('when missing url', () => {
      // Declaration
      const data = {
        name: 'name',
        dependencies: [],
        defines: {},
        provides: {}
      }
      // Execution
      const valid = validate(data)
      // Assertion
      expect(valid).toBe(false)
      expect(validate.errors).toHaveLength(1)
    })

    test('when dependencies are invalid', () => {
      // Declaration
      const data = {
        name: 'name',
        url: 'url',
        dependencies: [1, 2],
        defines: {},
        provides: {}
      }
      // Execution
      const valid = validate(data)
      // Assertion
      expect(valid).toBe(false)
      expect(validate.errors).toHaveLength(1)
    })
  })
})