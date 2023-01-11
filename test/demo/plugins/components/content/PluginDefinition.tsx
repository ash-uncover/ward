import React from 'react'
import { PluginManager } from '../../../../../src'

import './PluginDefinition.css'

export interface PluginDefinitionProperties {
  definitionId: string
}

export const PluginDefinition = ({
  definitionId
}: PluginDefinitionProperties) => {

  // Rendering //

  const definition = PluginManager.getDefinition(definitionId)

  if (!definition) {
    return (
      <li>PROBLEM</li>
    )
  }

  return (
    <li>
      {definition.name}
    </li>
  )
}