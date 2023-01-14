import React from 'react'
import { useDefinition } from '../../../commons/WardProvider'

import './PluginDefinition.css'

export interface PluginDefinitionProperties {
  definitionId: string
}

export const PluginDefinition = ({
  definitionId
}: PluginDefinitionProperties) => {

  // Rendering //

  const definition = useDefinition(definitionId)

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