import { ArrayUtils, UUID } from "@uncover/js-utils";
import { LogConfig, Logger } from "@uncover/js-utils-logger";
import { Message, MessageService, MessageServiceTypes } from "../model/model";
import MessageDispatcher from "../MessageDispatcher";

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
  #logger: Logger;

  // Constructor //

  constructor(
    dispatcher: MessageDispatcher,
    id?: string,
    logConfig?: LogConfig
  ) {
    this.#logger = new Logger("EventService", logConfig);
    this.#id = id || UUID.next();
    this.#dispatcher = dispatcher;
    this.#dispatcher.addService(this);
    this.logger.info(`[DISP-${this.dispatcherId}/EVENT-${this.id}] created`);
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

  get logger() {
    return this.#logger;
  }

  // Public methods //

  terminate() {
    this.logger.info(`[DISP-${this.dispatcherId}/EVENT-${this.id}] terminate`);
    this.#handlers = [];
    this.#dispatcher.removeService(this);
  }

  addHandler(handler: (message: Message) => void) {
    this.logger.debug(
      `[DISP-${this.dispatcherId}/EVENT-${this.id}] add handler`
    );
    this.#handlers.push(handler);
    return this.removeHandler.bind(this, handler);
  }
  removeHandler(handler: (message: Message) => void) {
    this.logger.debug(
      `[DISP-${this.dispatcherId}/EVENT-${this.id}] add handler`
    );
    this.#handlers = ArrayUtils.removeElement(this.#handlers, handler);
  }

  onMessage(message: Message) {
    this.logger.debug(`[DISP-${this.dispatcherId}/EVENT-${this.id}] onMessage`);
    this.#handlers.forEach((handler) => {
      try {
        handler(message);
      } catch (error) {
        this.logger.error(
          `[DISP-${this.dispatcherId}/EVENT-${this.id}] handler failed with error`
        );
        this.logger.error(`${error}`);
      }
    });
  }

  sendMessage(message: Message) {
    this.logger.info(
      `[DISP-${this.dispatcherId}/EVENT-${this.id}] sendMessage`
    );
    this.#dispatcher.sendMessage({
      ...message,
      _serviceId: this.id,
    });
  }

  // Internal methods //
}
