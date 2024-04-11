import { WardPluginDefineElement } from "../loader/model/PluginDataModel"
import PluginDefineElementAttribute from "./PluginDefineElementAttribute"
import PluginDefineElementEvent from "./PluginDefineElementEvent"
import PluginDefineElementProperty from "./PluginDefineElementProperty"

class PluginDefineElement {

  // Attributes //

  #plugin: string
  #name: string
  #attributes: PluginDefineElementAttribute[]
  #properties: PluginDefineElementProperty[]
  #events: PluginDefineElementEvent[]

  // Constructor //

  constructor(
    plugin: string,
    name: string,
    data: WardPluginDefineElement
  ) {
    this.#plugin = plugin
    this.#name = name
    const attributes = data.attributes || {}
    this.#attributes = Object.keys(attributes).map(
      (attributeKey: string) => new PluginDefineElementAttribute(attributeKey, String(attributes[attributeKey]))
    )
    const properties = data.properties || {}
    this.#properties = Object.keys(properties).map(
      (propertyKey: string) => new PluginDefineElementProperty(propertyKey, String(properties[propertyKey]))
    )
    const events = data.events || {}
    this.#events = Object.keys(events).map(
      (eventKey: string) => new PluginDefineElementEvent(eventKey))
  }

  // Getters & Setters //

  get plugin() { return this.#plugin }
  get name() { return this.#name }
  get attributes() { return this.#attributes.slice() }
  get properties() { return this.#properties.slice() }
  get events() { return this.#events.slice() }

  // Public Methods //

  // Internal Methods //

}

export default PluginDefineElement