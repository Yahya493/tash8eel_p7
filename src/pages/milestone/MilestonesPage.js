import React, { useEffect, useState } from 'react'
import MilestonesHeader from './components/MilestonesHeader'
import MilestonesBody from './components/MilestonesBody'
import './milestonesStyle.css'
import Cookies from 'js-cookie'
import { useDispatch, useSelector } from 'react-redux'
import { getMilestones, getTrails } from '../../actions/actions'
import MilestoneCreateForm from './MilestoneCreateForm'

export default function MilestonesPage() {
  const user = Cookies.get('user')
  const dispatch = useDispatch()
  const [milestones, setMilestones] = useState([])
  const trails = useSelector(state => state.trails)
  const [query, setQuery] = useState('')
  const [isAdding, setIsAdding] = useState(false)
  const [trailId, setTrailId] = useState('')

  useEffect(
    () => {
      if (trails.length === 0)
        getTrails(dispatch, user)
    },
    []
  )

  useEffect(
    () => {
      dispatch({type: "setCurrentPage", currentPage: 3})
      if(trailId === '') return
      getMilestones(setMilestones, trailId)
      // console.log('selected trail: '+ trailId)
    },
    [trailId]
  )

  const hasStart = (milestone) => {
    return milestones.filter(m => m._id !== milestone._id && m.type === 'Start').length >= 1
  }

  const hasEnd = (milestone) => {
    return milestones.filter(m => m._id !== milestone._id && m.type === 'End').length >= 1
  }

  const handleTrail = (e) => {
    setMilestones([])
    setTrailId(e.target.value)
  }

  const handleSearch = (e) => {
    setQuery(e.target.value)
  }

  const handleNew = () => {
    if(trailId === '') {
      alert('Please select a trail first')
      return
    }
    setIsAdding(true)
  }

  const contains = (milestone, str) => {
    str = str.toLowerCase()
    return (
      milestone.name.toLowerCase().includes(str) ||
      milestone.description.toLowerCase().includes(str)
    )
  }

  const exitAdding = () => {
    setIsAdding(false)
  }

  return (
    <div id='milestones'>
      <MilestonesHeader 
          handleSearch={handleSearch} 
          handleNew={handleNew} 
          trails={trails}
          trailId={trailId}
          handleTrail={handleTrail}
      />
      {isAdding ? <MilestoneCreateForm
        isAdding={isAdding}
        exitAdding={exitAdding}
        milestones={milestones}
        setMilestones={setMilestones}
        trailId={trailId}
        hasStart={hasStart}
        hasEnd={hasEnd}
      /> : null}
      <MilestonesBody 
        milestones={milestones.filter(milestone => contains(milestone, query))} 
        setMilestones={setMilestones}
        hasStart={hasStart}
        hasEnd={hasEnd}
      />
    </div>
  )
}
