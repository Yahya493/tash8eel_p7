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

  // const currentDate = new Date().toISOString().split('T')[0]

  const events = useSelector(state => state.events)
  const user = Cookies.get('user')
  const dispatch = useDispatch()
  const [isAdding, setIsAdding] = useState(false)
  // const [newEvent, setNewEvent] = useState({
  //   name: '',
  //   validFrom: currentDate,
  //   validTo: currentDate,
  //   departureTime: '07:00',
  //   arrivalTime: '18:00',
  //   departureLocation: '',
  //   arrivalLocation: '',
  //   trail: '',
  //   buses: [],
  //   numberOfPerson: 30,
  //   duration: 60,
  //   photos: [],
  //   fees: 15,
  //   publishDate: currentDate,
  //   description: '',
  //   user: user
  // })

  // const resetValues = () => {
  //   setNewEvent({
  //     ...newEvent,
  //     name: '',
  //     validFrom: currentDate,
  //     validTo: currentDate,
  //     departureTime: '07:00',
  //     arrivalTime: '18:00',
  //     departureLocation: '',
  //     arrivalLocation: '',
  //     trail: '',
  //     buses: [],
  //     numberOfPerson: 30,
  //     duration: 60,
  //     photos: [],
  //     fees: 15,
  //     publishDate: currentDate,
  //     description: '',
  //   })
  // }

  const handleNew = () => {
    // resetValues()
    setIsAdding(true)
  }

  useEffect(() => {
    getEvents(dispatch, user)
    getBuses(dispatch, user)
  }, [])

  // const handleName = (e) => {
  //   setNewEvent({ ...newEvent, name: e.target.value })
  // }

  // const handleDescription = (e) => {
  //   setNewEvent({ ...newEvent, description: e.target.value })
  // }

  const exitAdding = () => {
    setIsAdding(false)
  }

  return (
    <div>
      <EventPageHeader
        handleNew={handleNew}
      />
      {isAdding ? <EventCreateForm
        isAdding={isAdding}
        exitAdding={exitAdding}
        // event={newEvent}
        // handleName={handleName}
        // handleDriver={handleDriver}
        // handleDriverName={handleDriverName}
        // handleDriverPhone={handleDriverPhone}
        // handleSeats={handleSeats}
        // handleDescription={handleDescription}
      /> : null}
      <EventPageBody events={events} />
    </div>
  )
}
