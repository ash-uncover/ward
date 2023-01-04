import React, { FormEvent, ReactNode, useEffect, useState } from 'react'

import PluginManager from '../../../../src/lib/plugin/PluginManager'

import { Link } from 'react-router-dom'

import './Plugin.css'

interface PluginProperties {
  pluginId?: string
}

const Plugin = ({
  pluginId
}: PluginProperties) => {

  const pluginIdClear = decodeURIComponent(atob(pluginId!))

  const plugin = PluginManager.getPluginObject(pluginIdClear)
  console.log(plugin)

  // Hooks //

  // Events //


  // Rendering //

  return (
    <div className='plugin'>
      Plugin - {pluginIdClear}
    </div>
  )

}

export default Plugin