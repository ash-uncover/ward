import { getValidator } from '../../../../src/lib/plugin/loader/JsonValidator'

describe('JsonValidator', () => {

  /* TEST DATA */


  /* TEST SETUP */

  let validate: any

  beforeEach(() => {
    validate = getValidator()
  })

  afterEach(() => {
    jest.restoreAllMocks()
  })


  /* TEST CASES */

  // JsonValidator.validate //

  describe('validate', () => {

    test('validates a basic plugin', () => {
      // Declaration
      const data = {
        name: 'name',
        url: 'url'
      }
      // Execution
      const valid = validate(data)
      // Assertions
      expect(valid).toBe(true)
    })

    test('when missing manadatory informations', () => {
      // Declaration
      const data = {
        name: 'name'
      }
      // Execution
      const valid = validate(data)
      // Assertions
      expect(valid).toBe(false)
      expect(validate.errors).toHaveLength(1)
    })

    test('real use case', () => {
      // Declaration
      const data = {
        name: 'ward-demo',
        url: 'http://localhost:27000',
        dependencies: [
          'http://localhost:27001/plugin.json',
          'http://localhost:27002/plugin.json'
        ],
        defines: {
          viewers: {
            attributes: {
              id: 'string',
              name: 'string'
            },
            elements: {
              viewer: {}
            }
          }
        }
      }
      // Execution
      const valid = validate(data)
      // Assertions
      expect(valid).toBe(true)
    })
  })
})