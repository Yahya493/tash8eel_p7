import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { getBuses, getEvents } from '../../actions/actions'
import './EventPage.css'
import EventPageBody from './components/EventPageBody'
import EventPageHeader from './components/EventPageHeader'

export default function EventPage() {

  const events = useSelector(state => state.events)
  const user = useSelector(state => state.user._id)
  const dispatch = useDispatch()
  
  useEffect(() => {
     getEvents(dispatch,user)
     getBuses(dispatch, user)
   } ,[])

  return (
    <div>
        <EventPageHeader />
        <EventPageBody events={events}/>
    </div>
  )
}
