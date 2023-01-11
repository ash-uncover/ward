import React from 'react'
import { PluginManager } from '../../../../src'
import { WardElement } from '../../commons/WardElement'

export interface ViewerProperties {
  viewerId: string
}

export const Viewer = ({
  viewerId
}: ViewerProperties) => {

  // Rendering //

  const viewer = PluginManager.getProvider(`ward-demo/viewers/${viewerId}`)
  console.log(viewer.elements)
  const element = viewer.elements.viewer

  return (
    <WardElement
      key={viewerId}
      element={element}
    />
  )
}

