import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { getBuses, getEvents } from '../../actions/actions'
import './EventPage.css'
import EventPageBody from './components/EventPageBody'
import EventPageHeader from './components/EventPageHeader'
import Cookies from 'js-cookie'
import { useState } from 'react'
import EventCreateForm from './EventCreateForm'

export default function EventPage() {

  const events = useSelector(state => state.events)
  const user = Cookies.get('user')
  const dispatch = useDispatch()
  const [isAdding, setIsAdding] = useState(false)
  const [query, setQuery] = useState('')

  const handleNew = () => {
    setIsAdding(true)
  }

  useEffect(() => {
    getEvents(dispatch, user)
    getBuses(dispatch, user)
  }, [])

  const exitAdding = () => {
    setIsAdding(false)
  }

  const handleSearch = (e) => {
    setQuery(e.target.value)
  }

  const contains = (event, str) => {
    str = str.toLowerCase()
    return event.name.toLowerCase().includes(str) ||
      event.validFrom.includes(str) ||
      event.validTo.includes(str) ||
      event.departureTime.includes(str) ||
      event.arrivalTime.includes(str) ||
      event.departureLocation.toLowerCase().includes(str) ||
      event.arrivalLocation.toLowerCase().includes(str) ||
      event.duration + '' === str ||
      event.numberOfPerson + '' === str ||
      event.fees + '' === str ||
      event.publishDate.includes(str) ||
      event.description.toLowerCase().includes(str)
  }

  return (
    <div>
      <EventPageHeader
        handleNew={handleNew}
        handleSearch={handleSearch}
      />
      {isAdding ? <EventCreateForm
        isAdding={isAdding}
        exitAdding={exitAdding}
      /> : null}
      <EventPageBody events={events.filter(event => contains(event, query))} />
    </div>
  )
}
