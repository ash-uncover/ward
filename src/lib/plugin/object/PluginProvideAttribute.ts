
class PluginProvideAttribute {

  // Attributes //

  #plugin: string
  #name: string
  #value: string | string[] | number | number[] | boolean | boolean[]

  // Constructor //

  constructor(
    plugin: string,
    name: string,
    value: string | string[] | number | number[] | boolean | boolean[]
  ) {
    this.#plugin = plugin
    this.#name = name
    this.#value = value
  }

  // Getters & Setters //

  get plugin () { return this.#plugin }
  get name () { return this.#name }
  get value () { return this.#value }

  // Public Methods //

  // Internal Methods //

}

export default PluginProvideAttribute