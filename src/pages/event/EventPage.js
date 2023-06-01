import React, { useEffect } from 'react'
import EventPageHeader from './components/EventPageHeader'
import EventPageBody from './components/EventPageBody'
import './EventPage.css'
import { useDispatch, useSelector } from 'react-redux'

export default function EventPage() {

  const api = useSelector(state => state.api)
  const user = useSelector(state => state.user._id)
  const dispatch = useDispatch()
  const events = useSelector(state => state.events)

  useEffect(() => {
    fetch(api + "/events?user=" + user)
    .then(res => res.json())
    .then(events => {
      dispatch({type: 'setEvents', events: events})
    })
  },[])

  return (
    <div>
        <EventPageHeader />
        <EventPageBody events={events}/>
    </div>
  )
}
