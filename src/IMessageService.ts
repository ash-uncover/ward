import Message from './Message'

interface IMessageService {
  id: string
  idShort: string
  onMessage: (message: Message) => void
  sendMessage: (message: Message) => void
}

export default IMessageService