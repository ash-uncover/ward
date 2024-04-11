
class PluginDefineElementProperty {

  // Properties //

  #name: string
  #type: string

  // Constructor //

  constructor(
    name: string,
    type: string
  ) {
    this.#name = name
    this.#type = type
  }

  // Getters & Setters //

  get type () { return this.#type }
  get name () { return this.#name }
}

export default PluginDefineElementProperty