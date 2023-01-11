import React from 'react'
import { useParams } from 'react-router-dom'
// Components
import { Viewer } from '../../components/Viewer'

const RouteViewers = () => {

  // Hooks //

  const params = useParams()
  const viewerId = params.viewerId ? decodeURIComponent(params.viewerId!) : ''

  // Rendering //

  return (
    <Viewer viewerId={viewerId} />
  )
}

export default RouteViewers
