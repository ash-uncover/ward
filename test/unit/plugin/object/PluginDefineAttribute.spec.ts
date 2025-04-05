import PluginDefineAttribute from '../../../../src/plugin/object/PluginDefineAttribute'

describe('PluginDefineAttribute', () => {

  describe('constructor', () => {

    test('when this is a basic attribute', () => {
      // Declaration
      const plugin = 'plugin'
      const name = 'name'
      const type = 'type'
      // Execution
      const result = new PluginDefineAttribute(plugin, name, type)
      // Assertion
      expect(result.plugin).toEqual(plugin)
      expect(result.name).toEqual(name)
      expect(result.type).toEqual(type)
      expect(result.mandatory).toEqual(true)
      expect(result.array).toEqual(false)
    })

    test('when this is an optionnal attribute', () => {
      // Declaration
      const plugin = 'plugin'
      const name = 'name?'
      const type = 'type'
      // Execution
      const result = new PluginDefineAttribute(plugin, name, type)
      // Assertion
      expect(result.plugin).toEqual(plugin)
      expect(result.name).toEqual('name')
      expect(result.type).toEqual(type)
      expect(result.mandatory).toEqual(false)
      expect(result.array).toEqual(false)
    })

    test('when this is an array attribute', () => {
      // Declaration
      const plugin = 'plugin'
      const name = 'name'
      const type = 'type[]'
      // Execution
      const result = new PluginDefineAttribute(plugin, name, type)
      // Assertion
      expect(result.plugin).toEqual(plugin)
      expect(result.name).toEqual(name)
      expect(result.type).toEqual('type')
      expect(result.mandatory).toEqual(true)
      expect(result.array).toEqual(true)
    })
  })
})