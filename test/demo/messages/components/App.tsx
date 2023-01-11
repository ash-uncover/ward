import React, { useEffect, useState } from 'react'
// Libs
import MessageDispatcher, {
  getDispatchers,
  getServices,
  getDispatcherId
} from '../../../../src/lib/message/MessageDispatcher'
import IMessageService from '../../../../src/lib/message/IMessageService'
// Components
import Frame from './Frame'
import Service from './Service'

let SERVICE = 1
let FRAME = 1

interface AppProperties {
}

const App = ({
}: AppProperties) => {

  // Hooks //

  let id = 'TOP'
  let horizontal = false
  const params = new URLSearchParams(window.location.search)
  if (params.has('id')) {
    id = params.get('id')!
  }
  if (params.has('horizontal')) {
    horizontal = true
  }

  const [services, setServices] = useState<string[]>([])
  const [nbServices, setNbServices] = useState<number>(0)
  const [frames, setFrames] = useState<string[]>([])
  const [nbFrames, setNbFrames] = useState<number>(0)

  useEffect(() => {
    const addServiceBase = MessageDispatcher.addService
    MessageDispatcher.addService = (service: IMessageService) => {
      const result = addServiceBase(service)
      setNbServices(getServices().length)
      setNbFrames(getDispatchers().length)
      return result
    }
    const removeServiceBase = MessageDispatcher.removeService
    MessageDispatcher.removeService = (service: IMessageService) => {
      removeServiceBase(service)
      setNbServices(getServices().length)
      setNbFrames(getDispatchers().length)
    }
    MessageDispatcher.start(id)
    handleAddService()
    window.addEventListener('beforeunload', () => {
      console.log(`${getDispatcherId()} before unload`)
    }, {capture: true})
  }, [])

  // Events //

  const handleAddService = () => {
    const serviceId = `${id}-S${SERVICE++}`
    setServices([...services, serviceId])
  }

  const handleStopService = (serviceId: string) => {
    setServices(services.filter(service => service !== serviceId))
  }

  const handleAddFrame = () => {
    setFrames([...frames, `${id}-F${FRAME++}`])
  }

  const handleCloseFrame = (frameId: string) => {
    setFrames(frames.filter(frame => frame !== frameId))
  }

  // Rendering //

  const isTop = window === window.top

  return (
    <div
      className='app'
      style={{
        width: '100%',
        height: '100%',
        border: '4px solid #222',
        background: '#DDD',
        boxSizing: 'border-box',
        display: 'flex',
        flexDirection: 'column'
      }}
    >
      <div
        className='app-toolbar'
        style={{
          flexShrink: 0,
          display: 'flex',
          padding: '10px',
          paddingTop: '5px',
          gap: '5px',
          background: '#222',
          color: '#EEE',
          alignItems: 'center'
        }}
      >
        <span style={{ marginRight: 'auto' }}>
          {id}
        </span>
        <button onClick={handleAddService}>
          Add Service
        </button>
        <button onClick={handleAddFrame}>
          Add Frame
        </button>
        {!isTop ?
          <button
            onClick={() => handleCloseFrame(id)}
            style={{
              marginRight: '20px'
            }}
          >
            X
          </button>
          : null}
      </div>

      <div
        className='app-content'
        style={{
          flexGrow: 1,
          display: 'flex',
          flexDirection: horizontal ? 'column' : 'row',
          gap: '4px',
          padding: '4px',
          overflow: 'hidden'
        }}
      >
        <div
          className='app-services'
          style={{
            border: '1px solid #888',
            overflow: 'auto'
          }}
        >
          <div>#Services: {nbServices}</div>
          <div
            style={{
              display: 'flex',
              flexDirection: horizontal ? 'row' : 'column'
            }}
          >
            {services.map((serviceId) => {
              return (
                <Service
                  key={serviceId}
                  id={serviceId}
                  onStop={() => handleStopService(serviceId)}
                />)
            })}
          </div>
        </div>
        <div
          className='app-frames'
          style={{
            display: 'flex',
            flexDirection: 'column',
            flexGrow: 1,
            border: '1px solid #888',
            padding: '4px',
            overflow: 'auto',
            minHeight: '300px'

          }}
        >
          <div>#Frames: {nbFrames}</div>
          <div
            style={{
              display: 'flex',
              flexGrow: 1,
              flexDirection: horizontal ? 'row' : 'column',
              gap: '4px',
            }}
          >
            {frames.map((frameId) => {
              return (
                <Frame
                  key={frameId}
                  id={frameId}
                  onClose={() => handleCloseFrame(frameId)}
                />
              )
            })}
          </div>
        </div>
      </div>
    </div>
  )

}

export default App
