export interface Message {
  _serviceId?: string
  _dispatcherId?: string
  type: string
  payload: any
}

type MessageServiceType =
  'event' |
  'frame' |
  'navigation'

export const MessageServiceTypes: {
  EVENT: MessageServiceType
  FRAME: MessageServiceType
  NAVIGATION: MessageServiceType
} = {
  EVENT: 'event',
  FRAME: 'frame',
  NAVIGATION: 'navigation',
}

export interface MessageService {
  id: string
  type: MessageServiceType
  terminate: () => void
  onMessage: (message: Message) => void
  sendMessage: (message: Message) => void
}
