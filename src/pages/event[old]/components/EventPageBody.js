import React from 'react'
import { Link } from 'react-router-dom'

export default function EventPageBody({ events }) {
  return (
    <div id='body'>
      {events.map(event => <div className='eventCard' key={event._id}>
        <Link to={`/events/${event._id}`} >
          <img src={event.photos[0]} className='photo' />
          <div id='details'>
            <h5>{event.name}</h5>
            Valid From: {event.validFrom}<br />
            Valid To: {event.validTo}<br />
            Departure Time: {event.departureTime}<br />
            Arrival Time: {event.arrivalTime}<br />
            Departure Location: {event.departureLocation}<br />
            Trail: {event.trail}<br />
            Buses: {event.buses}<br />
            Number Of Person: {event.numberOfPerson}<br />
            Duration: {event.duration}<br />
            Photos: {event.photos}<br />
            Fees: {event.fees}<br />
            Publish Date: {event.publishDate}<br />
            Description: {event.description}
          </div>
        </Link>
      </div>)}
    </div>
  )
}
