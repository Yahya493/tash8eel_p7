import React from 'react'
import { Link } from 'react-router-dom'

export default function BusPageBody({ buses }) {
  return (
    <div id='body'>
      {buses.map(bus => <div className='busCard' key={bus._id}>
        <Link to={`/buses/${bus._id}`}>
          <h5>{bus.name}</h5>
          <div>
            Seats: {bus.seats}<br />
            Description: {bus.description}
          </div>
        </Link>
      </div>)}
    </div>
  )
}
