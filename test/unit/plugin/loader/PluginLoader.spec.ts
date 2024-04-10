import PluginLoader, { PluginLoadStates } from "../../../../src/lib/plugin/loader/PluginLoader"

describe('PluginLoader', () => {

  /* TEST DATA */


  /* TEST SETUP */

  let spyHelpersFetchPlugin: any

  beforeEach(() => {
  })

  afterEach(() => {
    jest.restoreAllMocks()
  })

  /* TEST CASES */

  // constructor //

  describe('constructor', () => {

    test('When fetch returns an error', async () => {
      // Declaration
      const loader = new PluginLoader()
      // Assertion
      expect(loader.urls).toEqual([])
      expect(loader.hasData('')).toBe(false)
      expect(loader.getData('')).toBeUndefined()
      expect(loader.isLoaded('')).toBe(false)
      expect(loader.getState('')).toBe(PluginLoadStates.NONE)
      expect(loader.getErrors('')).toEqual([])
    })
  })

  // load //

  describe('load', () => {

    test('When the url was excluded', async () => {
      // Declaration
      const loader = new PluginLoader()
      const url = 'url'
      // Execution
      loader.exclude(url)
      const result = await loader.load(url)
      // Assertion
      expect(result).toBe(false)
      expect(loader.urls).toEqual(['url'])
      expect(loader.hasData(url)).toBe(false)
      expect(loader.isLoaded(url)).toBe(false)
      expect(loader.getState(url)).toBe(PluginLoadStates.EXCLUDED)
    })

    test('When fetch returns an error', async () => {
      // Declaration
      const loader = new PluginLoader()
      const url = 'url'
      // @ts-ignore
      global.fetch = jest.fn((input: URL) => {
        throw 'fetch error'
      })
      // Execution
      const result = await loader.load(url)
      // Assertion
      expect(result).toBe(false)
      expect(loader.urls).toEqual(['url'])
      expect(loader.hasData(url)).toBe(false)
      expect(loader.isLoaded(url)).toBe(false)
      expect(loader.getState(url)).toBe(PluginLoadStates.LOAD_ERROR)
      expect(loader.getErrors(url)).toEqual(['fetch error'])
    })

    test('When json response cant be read returns an error', async () => {
      // Declaration
      const loader = new PluginLoader()
      const url = 'url'
      // @ts-ignore
      global.fetch = jest.fn((input: URL) => Promise.resolve({
        json: () => { throw 'json error' }
      }))
      // Execution
      const result = await loader.load(url)
      // Assertion
      expect(result).toBe(false)
      expect(loader.urls).toEqual(['url'])
      expect(loader.hasData(url)).toBe(false)
      expect(loader.isLoaded(url)).toBe(false)
      expect(loader.getState(url)).toBe(PluginLoadStates.LOAD_ERROR)
      expect(loader.getErrors(url)).toEqual(['json error'])
    })

    test('When the data does not follow the json schema', async () => {
      // Declaration
      const loader = new PluginLoader()
      const url = 'url'
      const data = {
        name: 'name'
      }
      // @ts-ignore
      global.fetch = jest.fn((input: URL) => Promise.resolve({
        json: () => data
      }))
      // Execution
      const result = await loader.load(url)
      // Assertion
      expect(result).toBe(false)
      expect(loader.urls).toEqual(['url'])
      expect(loader.hasData(url)).toBe(true)
      expect(loader.isLoaded(url)).toBe(false)
      expect(loader.getData(url)).toBe(data)
      expect(loader.getState(url)).toBe(PluginLoadStates.VALIDATION_ERROR)
      expect(loader.getErrors(url)).toHaveLength(1)
    })

    test('When the data is valid', async () => {
      // Declaration
      const loader = new PluginLoader()
      const url = 'url'
      const data = {
        name: 'name',
        url: 'url'
      }
      // @ts-ignore
      global.fetch = jest.fn((input: URL) => Promise.resolve({
        json: () => data
      }))
      // Execution
      const result = await loader.load(url)
      // Assertion
      expect(result).toBe(true)
      expect(loader.urls).toEqual(['url'])
      expect(loader.hasData(url)).toBe(true)
      expect(loader.isLoaded(url)).toBe(true)
      expect(loader.getData(url)).toBe(data)
      expect(loader.getState(url)).toBe(PluginLoadStates.LOADED)
      expect(loader.getErrors(url)).toHaveLength(0)
    })
  })

  // reset //

  describe('reset', () => {

    test('Properly reset all internal data', async () => {
      // Declaration
      const loader = new PluginLoader()
      const url = 'url'
      const data = {
        name: 'name',
        url: 'url'
      }
      // @ts-ignore
      global.fetch = jest.fn((input: URL) => Promise.resolve({
        json: () => data
      }))
      // Execution
      const result = await loader.load(url)
      loader.reset(true)
      // Assertion
      expect(loader.urls).toEqual([])
    })

    test('Properly reset all internal data', async () => {
      // Declaration
      const loader = new PluginLoader()
      const url = 'url'
      const data = {
        name: 'name',
        url: 'url'
      }
      // @ts-ignore
      global.fetch = jest.fn((input: URL) => Promise.resolve({
        json: () => data
      }))
      // Execution
      const result = await loader.load(url)
      loader.reset()
      // Assertion
      expect(loader.urls).toEqual([])
    })
  })

  // exclude //

  describe('exclude', () => {

    test('Properly exclude an url', () => {
      // Declaration
      const loader = new PluginLoader()
      const url = 'url'
      // Execution
      loader.exclude(url)
      // Assertion
      expect(loader.excludedUrls).toEqual([url])
    })

    test('When calling exclude twice with the same url', () => {
      // Declaration
      const loader = new PluginLoader()
      const url = 'url'
      // Execution
      loader.exclude(url)
      loader.exclude(url)
      // Assertion
      expect(loader.excludedUrls).toEqual([url])
    })
  })

  // include //

  describe('include', () => {

    test('Properly include previsouly excluded url', () => {
      // Declaration
      const loader = new PluginLoader()
      const url = 'url'
      // Execution
      loader.exclude(url)
      loader.include(url)
      // Assertion
      expect(loader.excludedUrls).toEqual([])
    })

    test('When url was not excluded before', () => {
      // Declaration
      const loader = new PluginLoader()
      const url = 'url'
      // Execution
      loader.include(url)
      // Assertion
      expect(loader.excludedUrls).toEqual([])
    })
  })
})