import React from 'react'
import { WardElement } from '../../commons/WardElement'
import { useProvider } from '../../commons/WardProvider'

export interface ViewerProperties {
  viewerId: string
}

export const Viewer = ({
  viewerId
}: ViewerProperties) => {

  // Rendering //


  const viewer = useProvider(`ward-demo/viewers/${viewerId}`)

  if (!viewer) {
    return (
      <div>VIEWER NOT LOADED</div>
    )
  }
  console.log(viewer.elements)
  const element = viewer.elements.viewer

  return (
    <WardElement
      key={viewerId}
      element={element}
    />
  )
}

