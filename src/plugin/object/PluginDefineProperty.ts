
class PluginDefineProperty {

  // Attributes //

  #plugin: string
  #name: string
  #type: string

  #mandatory: boolean
  #array: boolean

  // Constructor //

  constructor(
    plugin: string,
    name: string,
    type: string
  ) {
    this.#plugin = plugin
    this.#array = false
    this.#mandatory = true

    let actualName = name
    if (actualName.endsWith('?')) {
      this.#mandatory = false
      actualName = actualName.substring(0, actualName.length - 1)
    }
    this.#name = actualName

    let actualType = type
    if (actualType.endsWith('[]')) {
      this.#array = true
      actualType = actualType.substring(0, actualType.length - 2)
    }
    this.#type = actualType
  }

  // Getters & Setters //

  get plugin () { return this.#plugin }
  get name () { return this.#name }
  get type () { return this.#type }

  get array () { return this.#array }
  get mandatory () { return this.#mandatory }

  // Public Methods //

  // Internal Methods //

}

export default PluginDefineProperty