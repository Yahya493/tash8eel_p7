import React from 'react'
import MilestonesHeader from './components/MilestonesHeader'
import MilestonesBody from './components/MilestonesBody'
import './milestonesStyle.css'

export default function MilestonesPage() {
  return (
    <div id='milestones'>
      <MilestonesHeader />
      <MilestonesBody />
    </div>
  )
}
