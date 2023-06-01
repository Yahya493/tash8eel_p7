import React from 'react'
import EventPageHeader from './components/EventPageHeader'
import EventPageBody from './components/EventPageBody'
import './EventPage.css'
import {  useSelector } from 'react-redux'

export default function EventPage() {

  const events = useSelector(state => state.events)

  return (
    <div>
        <EventPageHeader />
        <EventPageBody events={events}/>
    </div>
  )
}
