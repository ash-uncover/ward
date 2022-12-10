import React, { useEffect, useRef, useState } from 'react'
import { getDispatcherId } from '../lib/MessageDispatcher'

interface FrameProperties {
  id: string
  onClose: () => void
}

const Frame = ({
  id,
  onClose,
}: FrameProperties) => {

  // Hooks //

  const frame = useRef<HTMLIFrameElement>(null)

  useEffect(() => {
    if (frame.current) {
      frame.current.addEventListener('load', () => {
        console.log(`${getDispatcherId()} load ${id}`)
        frame.current!.contentWindow!.addEventListener('unload', () => {
          console.log(`${getDispatcherId()} unload ${id}`)
          onClose()
        })
        frame.current!.addEventListener('beforeunload', () => {
          console.log('before unload 1')
        }, {capture: true})
        frame.current!.contentWindow!.addEventListener('beforeunload', () => {
          console.log('before unload 2')
        }, {capture: true})
      })
    }
  }, [frame])

  // Events //

  // Rendering //

  return (
    <div
      className='frame'
      style={{
        flexGrow: 1,
        minHeight: '300px',
        position: 'relative',
      }}
    >
      <iframe
        src={`http://localhost:8080?id=${id}`}
        ref={frame}
        height='100%'
        width='100%'
        style={{
          border: 0
        }}
      />
      <button
        onClick={onClose}
        style={{
          color: 'red',
          position: 'absolute',
          top: '9px',
          right: '5px'
        }}
      >
        X
      </button>
    </div>
  )

}

export default Frame