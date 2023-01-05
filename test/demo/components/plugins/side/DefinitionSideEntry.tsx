import React from 'react'
import PluginManager from '../../../../../src/lib/plugin/PluginManager'
import { Link } from 'react-router-dom'

import './DefinitionSideEntry.css'

export interface DefinitionSideEntryProperties {
  definitionId: string
}

export const DefinitionSideEntry = ({
  definitionId
}: DefinitionSideEntryProperties) => {

  // Rendering //

  const definition = PluginManager.getDefinition(definitionId)
  const providers = Object.values(PluginManager.providers).filter(provider => provider.definition === definitionId)

  if (!definition) {
    return (
      <li>PROBLEM</li>
    )
  }

  return (
    <li
      className='definition-side-entry'
      title={definition.name}
    >
      <Link
        to={`${window.btoa(encodeURIComponent(definition.plugin))}`}
      >
        {definition.name}
      </Link>
      <ul className='definition-side-entry__entries'>
        {providers.map(provider => {
          return (
            <li
              className='definition-side-entry'
              key={provider.name}
            >
              <Link
                to={`${window.btoa(encodeURIComponent(provider.plugin))}`}
              >
                {provider.name}
              </Link>
            </li>
          )
        })}
      </ul>
    </li>
  )
}