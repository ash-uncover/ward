import React from 'react'

interface FrameProperties {
  id: string
  onClose: () => void
}

const Frame = ({
  id,
  onClose,
}: FrameProperties) => {

  // Hooks //

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
        src={`http://localhost:27001?id=${id}`}
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