import PluginProvideAttribute from '../../../../src/plugin/object/PluginProvideAttribute'

describe('PluginProvideAttribute', () => {

  describe('constructor', () => {

    test('properly fills the object', () => {
      // Declaration
      const plugin = 'plugin'
      const name = 'name'
      const value = 'value'
      // Execution
      const result = new PluginProvideAttribute(plugin, name, value)
      // Assertion
      expect(result.plugin).toEqual(plugin)
      expect(result.name).toEqual(name)
      expect(result.value).toEqual(value)
    })
  })
})