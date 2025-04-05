import Ajv from 'ajv'
import {
  PluginProvideAttributesSchema,
  PluginProvideElementSchema,
  PluginProvideElementsSchema,
  PluginProvidePropertiesSchema,
  PluginProvideSchema,
} from '../../../../../src/plugin/loader/schema'

describe('PluginProvideSchema', () => {

  /* TEST DATA */

  let validate: any

  /* TEST SETUP */

  beforeEach(() => {
    const ajv = new Ajv({
      allowUnionTypes: true,
      schemas: [
        PluginProvideAttributesSchema,
        PluginProvideElementSchema,
        PluginProvideElementsSchema,
        PluginProvidePropertiesSchema,
        PluginProvideSchema,
      ]
    })
    // Execution
    validate = ajv.getSchema('WardPluginProvideSchema')!
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

    test('when receiving object information', () => {
      // Declaration
      const data = {
        properties: {},
        attributes: {},
        elements: {}
      }
      // Execution
      const valid = validate(data)
      // Assertion
      expect(valid).toBe(true)
      expect(validate.errors).toEqual(null)
    })

    test('when receiving object with invalid entries', () => {
      // Declaration
      const data = {
        test: {}
      }
      // Execution
      const valid = validate(data)
      // Assertion
      expect(valid).toBe(false)
      expect(validate.errors).toHaveLength(1)
    })

    test('when receiving object with invalid properties', () => {
      // Declaration
      const data = {
        properties: 'test',
        attributes: {},
        elements: {}
      }
      // Execution
      const valid = validate(data)
      // Assertion
      expect(valid).toBe(false)
      expect(validate.errors).toHaveLength(1)
    })

    test('when receiving object with invalid attributes', () => {
      // Declaration
      const data = {
        properties: {},
        attributes: 'test',
        elements: {}
      }
      // Execution
      const valid = validate(data)
      // Assertion
      expect(valid).toBe(false)
      expect(validate.errors).toHaveLength(1)
    })

    test('when receiving object with invalid elements', () => {
      // Declaration
      const data = {
        properties: {},
        attributes: {},
        elements: 'test'
      }
      // Execution
      const valid = validate(data)
      // Assertion
      expect(valid).toBe(false)
      expect(validate.errors).toHaveLength(1)
    })
  })
})