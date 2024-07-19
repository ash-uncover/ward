import { UUID } from "@uncover/js-utils";
import { LogConfig, Logger } from "@uncover/js-utils-logger";
import { Message, MessageService, MessageServiceTypes } from "../model/model";
import MessageDispatcher, { CONNECTION_CLOSING } from "../MessageDispatcher";

class FrameService implements MessageService {
  // Attributes //

  #id: string;
  #dispatcher: MessageDispatcher;
  #remoteDispatcherId: string;
  #window: Window;
  #windowRemote: Window;
  #origin: string;
  #logger: Logger

  // Constructor //

  constructor(
    dispatcher: MessageDispatcher,
    wdow: Window,
    wdowRemote: Window,
    origin: string,
    remoteDispatcherId: string,
    id?: string,
    logConfig?: LogConfig
  ) {
    this.#logger = new Logger("FrameService", logConfig);
    this.#dispatcher = dispatcher;
    this.#id = id || UUID.next();
    this.#window = wdow;
    this.#windowRemote = wdowRemote;
    this.#origin = origin;
    this.#remoteDispatcherId = remoteDispatcherId;
    this.logger.info(`[DISP-${this.dispatcherId}/FRAME-${this.id}] created`);
    this.#window.addEventListener("message", this.#handleMessage.bind(this));
    this.#window.addEventListener(
      "beforeUnload",
      this.#handleBeforeUnload.bind(this)
    );
  }

  // Getters & Setters //

  get id() {
    return this.#id;
  }
  get dispatcherId() {
    return this.#dispatcher.id;
  }
  get remoteDispatcherId() {
    return this.#remoteDispatcherId;
  }
  get windowRemote() {
    return this.#windowRemote;
  }

  get type() {
    return MessageServiceTypes.FRAME;
  }

  get logger() {
    return this.#logger;
  }

  // Public Methods //

  onMessage(message: Message) {
    this.logger.info(
      `[DISP-${this.dispatcherId}/FRAME-${this.id}] onMessage ${message.type}`
    );
    if (this.#windowRemote.closed) {
      this.logger.info(
        `[DISP-${this.dispatcherId}/FRAME-${this.id}] onMessage /!\\ window closed /!\\`
      );
      this.terminate();
    } else {
      this.logger.debug(
        `[DISP-${this.dispatcherId}/FRAME-${this.id}] onMessage posting message to ${this.#origin}`
      );
      this.#windowRemote.postMessage(
        {
          ...message,
          _serviceId: this.#id,
        },
        this.#origin
      );
    }
  }

  sendMessage(message: Message) {
    this.logger.debug(
      `[DISP-${this.dispatcherId}/FRAME-${this.id}] sendMessage ${message.type}`
    );
    this.#dispatcher.sendMessage({
      ...message,
      _serviceId: this.id,
    });
  }

  terminate() {
    this.logger.info(`[DISP-${this.dispatcherId}/FRAME-${this.id}] terminate`);
    this.#dispatcher.removeService(this);
  }

  // Private Methods //

  #handleBeforeUnload() {
    this.onMessage({
      type: CONNECTION_CLOSING,
      _dispatcherId: this.dispatcherId,
      payload: {},
    });
    this.terminate();
  }

  #handleMessage(event: MessageEvent) {
    const data = event.data || {};
    if (
      data._serviceId &&
      data._dispatcherId &&
      data._dispatcherId === this.#remoteDispatcherId
    ) {
      this.logger.debug(
        `[DISP-${this.dispatcherId}/FRAME-${this.id}] handleMessage ${event.data.type}`
      );
      if (data.type === CONNECTION_CLOSING) {
        this.terminate();
      } else {
        this.sendMessage({
          _serviceId: this.#id,
          type: data.type,
          payload: data.payload,
        });
      }
    }
  }
}

export default FrameService;
