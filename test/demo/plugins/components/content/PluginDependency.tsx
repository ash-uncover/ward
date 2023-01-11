import React from 'react'
import { PluginManager } from '../../../../../src'

import './PluginDependency.css'
import { Link } from 'react-router-dom'

export interface PluginDependencyProperties {
  dependencyUrl: string
}

export const PluginDependency = ({
  dependencyUrl
}: PluginDependencyProperties) => {

  // Rendering //

  const dependency = PluginManager.getPluginByUrl(dependencyUrl)

  if (!dependency) {
    return (
      <li>PROBLEM</li>
    )
  }
console.log(dependency)
  return (
    <li>
      <Link
        to={`/plugins/${window.btoa(encodeURIComponent(dependency.name))}`}
      >
       {dependency.name}
      </Link>
    </li>
  )
}