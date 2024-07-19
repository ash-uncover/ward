import { ArrayUtils, UUID } from "@uncover/js-utils";

import PluginManager, { PluginManagerData } from "./plugin/PluginManager";
import MessageDispatcher, {
  MessageDispatcherData,
} from "./message/MessageDispatcher";
import { ServiceEvent, EventService } from "./message/services/ServiceEvent";
import { LogConfig } from "@uncover/js-utils-logger";

export { Message, MessageService } from "./message/model/model";
export { ServiceEvent, EventService } from "./message/services/ServiceEvent";

export interface WardData extends MessageDispatcherData, PluginManagerData {}

declare global {
  interface Window {
    documentPictureInPicture?: any
  }
}

class WardClass {
  // Attributes //

  #wardId: string;

  #pluginManager: PluginManager;
  #messageDispatcher: MessageDispatcher;

  #listeners: ((data: WardData) => void)[] = [];
  #listenersPlugins: ((data: WardData) => void)[] = [];
  #listenersServices: ((data: WardData) => void)[] = [];

  #logConfig: LogConfig = new LogConfig();

  // Constructors //

  constructor(
    wardId?: string,
    pluginManager?: PluginManager,
    messageDispatcher?: MessageDispatcher
  ) {
    this.#wardId = wardId || UUID.next();
    this.#pluginManager =
      pluginManager || new PluginManager(undefined, this.logConfig);
    this.#messageDispatcher =
      messageDispatcher || new MessageDispatcher(undefined, this.logConfig);
    this.#pluginManager.register(this.notifyPlugins.bind(this));
    this.#messageDispatcher.register(this.notifyServices.bind(this));
  }

  // Getters & Setters //

  get id() {
    return this.#wardId;
  }

  get data(): WardData {
    return {
      ...this.#messageDispatcher.data,
      ...this.#pluginManager.data,
    };
  }

  get logConfig() {
    return this.#logConfig;
  }

  // Public methods //

  register(listener: (data: WardData) => void) {
    this.#listeners.push(listener);
    return () => this.unregister(listener);
  }
  unregister(listener: (data: WardData) => void) {
    this.#listeners = ArrayUtils.removeElement(this.#listeners, listener);
  }

  registerPlugins(listener: (data: WardData) => void) {
    this.#listenersPlugins.push(listener);
    return () => this.unregisterPlugins(listener);
  }
  unregisterPlugins(listener: (data: WardData) => void) {
    this.#listenersPlugins = ArrayUtils.removeElement(
      this.#listenersPlugins,
      listener
    );
  }
  notifyPlugins() {
    this.#listenersPlugins.forEach((listener) => {
      listener(this.data);
    });
    this.#listeners.forEach((listener) => {
      listener(this.data);
    });
  }

  registerServices(listener: (data: WardData) => void) {
    this.#listenersServices.push(listener);
    return () => this.unregisterServices(listener);
  }
  unregisterServices(listener: (data: WardData) => void) {
    this.#listenersServices = ArrayUtils.removeElement(
      this.#listenersServices,
      listener
    );
  }
  notifyServices() {
    this.#listenersServices.forEach((listener) => {
      listener(this.data);
    });
    this.#listeners.forEach((listener) => {
      listener(this.data);
    });
  }

  reset() {
    this.#pluginManager.reset();
    this.#messageDispatcher.reset();
  }

  loadPlugin(plugin: string) {
    this.#pluginManager.loadPlugin(plugin);
  }
  unloadPlugin(plugin: string) {
    this.#pluginManager.unloadPlugin(plugin);
  }

  addService(id?: string): EventService {
    return new ServiceEvent(this.#messageDispatcher, id, this.logConfig);
  }
}

let WardInstance: WardClass;
declare global {
  interface Window {
    uncover: any;
  }
}
if (!window.uncover?.ward) {
  WardInstance = new WardClass();
  window.uncover = window.uncover || {};
  window.uncover.ward = WardInstance;
  window.uncover.wardVersion = "0.2.26";
} else {
  console.warn(
    `Ward is already registered with version ${window.uncover.wardVersion || "older than 0.2.21"}`
  );
  WardInstance = window.uncover.ward;
}

export default WardInstance;
