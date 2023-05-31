import React from 'react'

export default function BusPageBody({buses}) {
  return (
    <div id='body'>
      {buses.map(bus => <div class='busCard' key={bus._id}>
        <h5>{bus.name}</h5>
        Seats: {bus.seats}<br/>
        Description: {bus.description}
      </div>)}
    </div>
  )
}
