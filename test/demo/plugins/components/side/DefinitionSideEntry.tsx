import React from 'react'
// Hooks
import {
  useDefinition,
  useProviders
} from '../../../commons/WardProvider'
// Components
import {
  Link
} from 'react-router-dom'

import './DefinitionSideEntry.css'

export interface DefinitionSideEntryProperties {
  definitionId: string
  selectedPluginId?: string
}

export const DefinitionSideEntry = ({
  definitionId,
  selectedPluginId
}: DefinitionSideEntryProperties) => {

  // Rendering //

  const definition = useDefinition(definitionId)
  const providers = useProviders(definitionId)

  if (!definition) {
    return (
      <li>PROBLEM</li>
    )
  }

  const classes = ['definition-side-entry']
  if (selectedPluginId === definition.plugin) {
    classes.push('selected')
  }

  return (
    <li
      className={classes.join(' ')}
      title={definition.name}
    >
      <Link
        to={`${window.btoa(encodeURIComponent(definition.plugin))}`}
      >
        {definition.name}
      </Link>
      <ul className='definition-side-entry__entries'>
        {providers.map(provider => {
          const classes = ['definition-side-entry']
          if (provider.plugin === selectedPluginId) {
            classes.push('selected')
          }
          return (
            <li
              className={classes.join(' ')}
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