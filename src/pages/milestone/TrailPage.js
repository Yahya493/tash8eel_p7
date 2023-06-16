import React from 'react'
import Trails from './Trails'
import Milestones from './Milestones'
import MilestoneDetails from './MilestoneDetails'
import './trailStyle.css'

export default function TrailPage() {
  return (
    <div id='trailPage'>
        <Trails />
        <Milestones />
        <MilestoneDetails />
    </div>
  )
}
