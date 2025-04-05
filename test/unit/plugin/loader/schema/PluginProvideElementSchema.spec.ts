import Ajv from 'ajv'
import {
  PluginProvideElementSchema,
} from '../../../../../src/plugin/loader/schema'

describe('PluginProvideElementSchema', () => {

  /* TEST DATA */


  /* TEST SETUP */

  let validate: any

  beforeEach(() => {
    const ajv = new Ajv({
      allowUnionTypes: true,
      schemas: [
        PluginProvideElementSchema
      ]
    })
    // Execution
    validate = ajv.getSchema('WardPluginProvideElementSchema')!
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

    test('when receiving an iframe definition', () => {
      // Declaration
      const data = {
        url: 'url',
        type: 'iframe'
      }
      // Execution
      const valid = validate(data)
      // Assertion
      expect(valid).toBe(true)
      expect(validate.errors).toEqual(null)
    })

    test('when receiving a webcomponent definition', () => {
      // Declaration
      const data = {
        url: 'url',
        type: 'webcomponent',
        element: 'element'
      }
      // Execution
      const valid = validate(data)
      // Assertion
      expect(valid).toBe(true)
      expect(validate.errors).toEqual(null)
    })

    test('when receiving an object with additionnal properties', () => {
      // Declaration
      const data = {
        url: 'url',
        type: 'iframe',
        name: 'name'
      }
      // Execution
      const valid = validate(data)
      // Assertion
      expect(valid).toBe(false)
      expect(validate.errors).toHaveLength(1)
    })

    test('when receiving object with invalid type', () => {
      // Declaration
      const data = {
        url: 'url',
        type: 'custom'
      }
      // Execution
      const valid = validate(data)
      // Assertion
      expect(valid).toBe(false)
      expect(validate.errors).toHaveLength(1)
    })

    test('when receiving non object entry', () => {
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