import PluginDefineProperty from '../../../../src/plugin/object/PluginDefineProperty'

describe('PluginDefineProperty', () => {

  describe('constructor', () => {

    test('when attribute is mandatory and not an array', () => {
      // Declaration
      const plugin = 'plugin'
      const name = 'name'
      const type = 'type'
      // Execution
      const result = new PluginDefineProperty(plugin, name, type)
      // Assertion
      expect(result.plugin).toEqual(plugin)
      expect(result.name).toEqual(name)
      expect(result.type).toEqual(type)
      expect(result.mandatory).toEqual(true)
      expect(result.array).toEqual(false)
    })

    test('when attribute is optionnam', () => {
      // Declaration
      const plugin = 'plugin'
      const name = 'name?'
      const type = 'type'
      // Execution
      const result = new PluginDefineProperty(plugin, name, type)
      // Assertion
      expect(result.plugin).toEqual(plugin)
      expect(result.name).toEqual('name')
      expect(result.type).toEqual(type)
      expect(result.mandatory).toEqual(false)
      expect(result.array).toEqual(false)
    })

    test('when attribute is an array', () => {
      // Declaration
      const plugin = 'plugin'
      const name = 'name'
      const type = 'type[]'
      // Execution
      const result = new PluginDefineProperty(plugin, name, type)
      // Assertion
      expect(result.plugin).toEqual(plugin)
      expect(result.name).toEqual(name)
      expect(result.type).toEqual('type')
      expect(result.mandatory).toEqual(true)
      expect(result.array).toEqual(true)
    })
  })
})