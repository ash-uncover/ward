import React, { CSSProperties, useState } from 'react'

export interface WardElementProperties {
  element: {
    plugin: string
    properties?: { [key: string]: string }
    url: string
    type: string
  }
  style?: CSSProperties
}

export const WardElement = ({
  element,
  style,
}: WardElementProperties) => {

  // Hooks //

  const urlBase = new URL(element.url)
  if (element.properties) {
    Object.keys(element.properties).forEach((property) => {
      urlBase.searchParams.set(property, element.properties![property])
    })
  }
  const [url] = useState(urlBase.toString())

  // Rendering //

  switch (element.type) {
    case 'iframe': {
      return (
        <iframe
          src={url}
          height='100%'
          width='100%'
          style={{
            ...style,
            width: '100%',
            height: '100%',
            border: 'none'
          }}
        />
      )
    }
    default: {
      return (
        <div>NOT SUPPORTED</div>
      )
    }
  }
}

