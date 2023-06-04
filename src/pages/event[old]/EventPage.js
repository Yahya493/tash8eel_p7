import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { getBuses, getEvents } from '../../actions/actions'
import './EventPage.css'
import EventPageBody from './components/EventPageBody'
import EventPageHeader from './components/EventPageHeader'
import Cookies from 'js-cookie'

export default function EventPage() {

  const events = useSelector(state => state.events)
  const user = Cookies.get('user')
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
