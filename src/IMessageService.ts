import Message from './Message'

export interface IMessageService {
  id: string
  idShort: string
  onMessage: (message: Message) => void
  sendMessage: (message: Message) => void
}