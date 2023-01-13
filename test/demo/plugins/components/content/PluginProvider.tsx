import React from 'react'
import { useProvider } from '../../../commons/WardProvider'

import './PluginProvider.css'

export interface PluginProviderProperties {
  providerId: string
}

export const PluginProvider = ({
  providerId
}: PluginProviderProperties) => {

  // Rendering //

  const provider = useProvider(providerId)

  if (!provider) {
    return (
      <li>{`PROBLEM - ${providerId}`}</li>
    )
  }

  return (
    <li>
      {provider.name}
    </li>
  )
}