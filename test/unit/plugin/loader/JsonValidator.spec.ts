import { validate } from '../../../../src/lib/plugin/loader/JsonValidator'

describe('JsonValidator', () => {

  /* TEST DATA */


  /* TEST SETUP */


  beforeEach(() => {
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
  })
})