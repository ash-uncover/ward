
class PluginDefineElementEvent {

  // Events //

  #name: string

  // Constructor //

  constructor(
    name: string
  ) {
    this.#name = name
  }

  // Getters & Setters //

  get name () { return this.#name }
}

export default PluginDefineElementEvent