import PluginDefineAttribute from "./PluginDefineAttribute"
import PluginProvideAttribute from "./PluginProvideAttribute"

class PluginProviderAttribute {

  // Attributes //

  #name: string
  #type: string

  #mandatory: boolean
  #array: boolean

  #value: string | string[] | number | number[] | boolean | boolean[]

  // Constructor //

  constructor(
    pluginUrl: string,
    attributeDefinition: PluginDefineAttribute,
    attribute: PluginProvideAttribute
  ) {
    this.#name = attributeDefinition.name
    this.#type = attributeDefinition.type
    this.#mandatory = attributeDefinition.mandatory
    this.#array = attributeDefinition.array

    const value = attribute.value

    switch (this.#type) {
      case 'url': {
        if (Array.isArray(value)) {
          this.#value = value.map((value) => `${pluginUrl}${value}`)
        } else {
          this.#value = `${pluginUrl}${value}`
        }
        break;
      }
      default: {
        this.#value = value
        break;
      }
    }

  }

  // Getters & Setters //

  get name () { return this.#name }
  get type () { return this.#type }
  get mandatory () { return this.#mandatory }
  get array () { return this.#array }

  get value () { return this.#value }

  // Public Methods //

  // Internal Methods //

}

export default PluginProviderAttribute