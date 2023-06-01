import React, { useEffect, useState } from 'react'
import EventDetailsHeader from './components/EventDetailsHeader'
import EventDetailsBody from './components/EventDetailsBody'
import './EventDetails.css'
import { useParams } from 'react-router-dom'
import { useSelector } from 'react-redux'

export default function EventDetails() {
    const [event, setEvent] = useState({buses:[]})
    const { id } = useParams()
    const api = useSelector(state => state.api)

    useEffect(() => {
        fetch(api + "/events/" + id)
            .then(res => res.json())
            .then(event => {
                setEvent({
                    ...event,
                    validFrom: event.validFrom.substring(0, 10),
                    validTo: event.validTo.substring(0, 10),
                    departureTime: event.departureTime.substring(11, 19),
                    arrivalTime: event.arrivalTime.substring(11, 19),
                    publishDate: event.publishDate.substring(0, 10),
                })
                // fetch(api + "/buses/" + event.buses[0])
                //     .then(res => res.json())
                //     .then(buss => {
                //         setBus(buss)

                //     })
            })
    }, [])

    const handleDelete = () => {
        alert(`delete event ${event._id}`)
    }

    const handleUpdate = () => {
        alert(`update event ${event._id}`)
    }

    const handleName = (e) => {
        setEvent({ ...event, name: e.target.value })
    }

    const handleValidFrom = (e) => {
        setEvent({ ...event, validFrom: e.target.value })
    }

    const handleValidTo = (e) => {
        setEvent({ ...event, validTo: e.target.value })
    }

    const handleDepartureTime = (e) => {
        setEvent({ ...event, departureTime: e.target.value })
    }

    const handleDepartureLocation = (e) => {
        setEvent({ ...event, departureLocation: e.target.value })
    }

    const handleArrivalTime = (e) => {
        setEvent({ ...event, arrivalTime: e.target.value })
    }

    const handleArrivalLocation = (e) => {
        setEvent({ ...event, arrivalLocation: e.target.value })
    }

    const handleNumberOfPerson = (e) => {
        setEvent({ ...event, numberOfPerson: e.target.value })
    }

    const handleDuration = (e) => {
        setEvent({ ...event, duration: e.target.value })
    }

    const handleFees = (e) => {
        setEvent({ ...event, fees: e.target.value })
    }

    const handlePublishDate = (e) => {
        setEvent({ ...event, publishDate: e.target.value })
    }

    const handleDescription = (e) => {
        setEvent({ ...event, description: e.target.value })
    }

    return (
        <div>
            <EventDetailsHeader
                handleUpdate={handleUpdate}
                handleDelete={handleDelete}
            />
            <EventDetailsBody
                event={event}
                handleName={handleName}
                handleValidFrom={handleValidFrom}
                handleValidTo={handleValidTo}
                handleDepartureTime={handleDepartureTime}
                handleDepartureLocation={handleDepartureLocation}
                handleArrivalTime={handleArrivalTime}
                handleArrivalLocation={handleArrivalLocation}
                handleNumberOfPerson={handleNumberOfPerson}
                handleDuration={handleDuration}
                handleFees={handleFees}
                handlePublishDate={handlePublishDate}
                handleDescription={handleDescription}
            />
        </div>
    )
}
