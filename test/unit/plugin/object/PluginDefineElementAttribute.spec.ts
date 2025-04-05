import PluginDefineElementAttribute from '../../../../src/plugin/object/PluginDefineElementAttribute'

describe('PluginDefineElementAttribute', () => {

  describe('constructor', () => {

    test('when there are no attributes and no elements', () => {
      // Declaration
      const name = 'name'
      const type = 'type'
      // Execution
      const result = new PluginDefineElementAttribute(name, type)
      // Assertion
      expect(result.name).toEqual(name)
      expect(result.type).toEqual(type)
    })
  })
})