import PluginDefineElementProperty from '../../../../src/plugin/object/PluginDefineElementProperty'

describe('PluginDefineElementProperty', () => {

  describe('constructor', () => {

    test('when there are no attributes and no elements', () => {
      // Declaration
      const name = 'name'
      const type = 'type'
      // Execution
      const result = new PluginDefineElementProperty(name, type)
      // Assertion
      expect(result.name).toEqual(name)
      expect(result.type).toEqual(type)
    })
  })
})