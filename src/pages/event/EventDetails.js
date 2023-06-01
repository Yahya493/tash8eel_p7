import React, { useEffect, useState } from 'react'
import EventDetailsHeader from './components/EventDetailsHeader'
import EventDetailsBody from './components/EventDetailsBody'
import './EventDetails.css'
import { useParams } from 'react-router-dom'
import { useSelector } from 'react-redux'

export default function EventDetails() {
    const [event, setEvent] = useState({})
    const { id } = useParams()
    const api = useSelector(state => state.api)

    useEffect(() => {
        fetch(api + "/events/" + id)
            .then(res => res.json())
            .then(event => {
                setEvent(event)
                // fetch(api + "/drivers/" + event.driver)
                //     .then(res => res.json())
                //     .then(driver => {
                //         setEvent(event)
                //         setDriver(driver)
                //     })
            })
    }, [])

    const handleDelete = () => {
        alert(`delete event ${event._id}`)
    }
    
    const handleUpdate = () => {
        alert(`update event ${event._id}`)
    }

  return (
    <div>
        <EventDetailsHeader handleUpdate={handleUpdate} handleDelete={handleDelete}/>
        <EventDetailsBody event={event}/>
    </div>
  )
}
