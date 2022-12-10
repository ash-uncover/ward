import React, { FormEvent, useEffect, useState } from 'react'
import Message from '../lib/Message'
import MessageService from '../lib/MessageService'
import { getService } from '../lib/MessageDispatcher'

interface ServiceProperties {
  id: string
  onStop: () => void
}

const Service = ({
  id,
  onStop
}: ServiceProperties) => {

  // Hooks //

  const [type, setType] = useState(`T: ${id}`)
  const [payload, setPayload] = useState(`P: ${id}`)
  const [messages, setMessages] = useState<Message[]>([])

  const handleMessage = (message: Message) => {
    setMessages(messages => ([
      ...messages,
      message
    ]))
  }

  useEffect(() => {
    const service = new MessageService(id)
    return service.init(handleMessage)
  }, [])

  // Events //

  const handleTypeChange = (event: FormEvent<HTMLInputElement>) => {
    setType(event.currentTarget.value)
  }

  const handlePayloadChange = (event: FormEvent<HTMLInputElement>) => {
    setPayload(event.currentTarget.value)
  }

  const handleSendClick = () => {
    getService(id)!.sendMessage({ type, payload })
  }

  // Rendering //

  return (
    <div
      className='service'
      style={{
        flexGrow: 1,
        border: '1px solid grey',
        margin: '2px 4px',
        padding: '4px',
        minHeight: '200px'
      }}
    >
      <div
        style={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between'
        }}
      >
        <h4 style={{ margin: 0 }}>{`Service ${id}`}</h4>
        <button onClick={onStop}>X</button>
      </div>
      <div>
        <label style={{ width: '4rem', display: 'inline-block' }}>Type</label>
        <input value={type} onChange={handleTypeChange} />
      </div>
      <div>
        <label style={{ width: '4rem', display: 'inline-block' }}>Payload</label>
        <input value={payload} onChange={handlePayloadChange} />
      </div>
      <button onClick={handleSendClick} style={{ width: '100%', display: 'block' }}>
        Send
      </button>
      <h5
        style={{
          margin: '0.5rem 0',
        }}>
        Events
      </h5>
      <ul style={{ margin: 0 }}>
        {messages.map((message, index) => {
          return (
            <li key={`event-${index}`}>
              <div>
                {message.type}
              </div>
              <div>
                {message.payload}
              </div>
            </li>
          )
        })}
      </ul>
    </div>
  )

}

export default Service