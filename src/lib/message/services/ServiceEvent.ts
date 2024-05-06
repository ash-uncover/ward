import { ArrayUtils, UUID } from "@uncover/js-utils";
import { Logger, LogLevels } from "@uncover/js-utils-logger";
import { Message, MessageService, MessageServiceTypes } from "../model/model";
import MessageDispatcher from "../MessageDispatcher";

const LOGGER = new Logger("EventService", LogLevels.DEBUG);

export interface EventService extends MessageService {
  addHandler: (
    handler: (message: Message) => void
  ) => (message: Message) => void;
  removeHandler: (handler: (message: Message) => void) => void;
}

export class ServiceEvent implements EventService {
  // Attributes //

  #id: string;
  #dispatcher: MessageDispatcher;

  #handlers: ((message: Message) => void)[] = [];

  // Constructor //

  constructor(dispatcher: MessageDispatcher, id?: string) {
    this.#id = id || UUID.next();
    this.#dispatcher = dispatcher;
    this.#dispatcher.addService(this);
    LOGGER.info(`[DISP-${this.dispatcherId}/EVENT-${this.id}] created`);
  }

  // Getters & Setters //

  get id() {
    return this.#id;
  }
  get dispatcherId() {
    return this.#dispatcher.id;
  }
  get type() {
    return MessageServiceTypes.EVENT;
  }

  // Public methods //

  terminate() {
    LOGGER.info(`[DISP-${this.dispatcherId}/EVENT-${this.id}] terminate`);
    this.#dispatcher.removeService(this);
  }

  addHandler(handler: (message: Message) => void) {
    LOGGER.debug(`[DISP-${this.dispatcherId}/EVENT-${this.id}] add handler`);
    this.#handlers.push(handler);
    return this.removeHandler.bind(this, handler);
  }
  removeHandler(handler: (message: Message) => void) {
    LOGGER.debug(`[DISP-${this.dispatcherId}/EVENT-${this.id}] add handler`);
    this.#handlers = ArrayUtils.removeElement(this.#handlers, handler);
  }

  onMessage(message: Message) {
    LOGGER.debug(`[DISP-${this.dispatcherId}/EVENT-${this.id}] onMessage`);
    this.#handlers.forEach((handler) => {
      try {
        handler(message);
      } catch (error) {
        LOGGER.error(
          `[DISP-${this.dispatcherId}/EVENT-${this.id}] handler failed with error`
        );
        LOGGER.error(`${error}`);
      }
    });
  }

  sendMessage(message: Message) {
    LOGGER.info(`[DISP-${this.dispatcherId}/EVENT-${this.id}] sendMessage`);
    this.#dispatcher.sendMessage({
      ...message,
      _serviceId: this.id,
    });
  }

  // Internal methods //
}
