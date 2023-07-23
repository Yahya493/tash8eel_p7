import React from 'react'
import TrailsHeader from './components/TrailsHeader'
import TrailsBody from './components/TrailsBody'
import TrailCreateForm from './TrailCreateForm'
import './trailStyle.css'
import { useState } from 'react'
import { useEffect } from 'react'
import Cookies from 'js-cookie'
import { useDispatch, useSelector } from 'react-redux'
import { getTrails } from '../../actions/actions'

export default function TrailPage() {

  const user = Cookies.get('user')
  const dispatch = useDispatch()
  const trails = useSelector(state => state.trails)
  const [query, setQuery] = useState('')
  const [isAdding, setIsAdding] = useState(false)

  useEffect(
    () => {
      dispatch({type: "setCurrentPage", currentPage: 2})
      getTrails(dispatch, user)
    },
    []
  )
  
  const handleSearch = (e) => {
    setQuery(e.target.value)
  }

  const handleNew = () => {
    setIsAdding(true)
  }

  const contains = (trail, str) => {
    str = str.toLowerCase()
    return (
      trail.name.toLowerCase().includes(str) ||
      trail.distance + '' === str ||
      trail.description.toLowerCase().includes(str)
    )
  }

  const exitAdding = () => {
    setIsAdding(false)
  }

  return (
    <div id='trails'>
      <TrailsHeader handleSearch={handleSearch} handleNew={handleNew}/>
      {isAdding ? <TrailCreateForm
        isAdding={isAdding}
        exitAdding={exitAdding}
      /> : null}
      <TrailsBody trails={trails.filter(trail => contains(trail, query))}/>
    </div>
  )
}
