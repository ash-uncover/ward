import React from 'react'
import { PluginManager } from '../../../../../src'

import './PluginProvider.css'

export interface PluginProviderProperties {
  providerId: string
}

export const PluginProvider = ({
  providerId
}: PluginProviderProperties) => {

  // Rendering //

  const provider = PluginManager.getProvider(providerId)

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