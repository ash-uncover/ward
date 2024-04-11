import PluginDefineElementEvent from '../../../../src/lib/plugin/object/PluginDefineElementEvent'

describe('PluginDefineElementEvent', () => {

  describe('constructor', () => {

    test('when there are no attributes and no elements', () => {
      // Declaration
      const name = 'name'
      // Execution
      const result = new PluginDefineElementEvent(name)
      // Assertion
      expect(result.name).toEqual(name)
    })
  })
})