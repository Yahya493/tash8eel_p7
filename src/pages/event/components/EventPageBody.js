import { AgGridReact } from 'ag-grid-react'
import React, { useMemo, useState } from 'react'
import { Link } from 'react-router-dom'
import 'ag-grid-community/styles/ag-grid.css';
import 'ag-grid-community/styles/ag-theme-alpine.css';

export default function EventPageBody({ events }) {

  const dateFormatter = p => {
    const value = p.value.substring(0, 10).split('-')
    return `${value[2]}-${value[1]}-${value[0]}`
  }

  const timeFormatter = p => {
    const value = p.value.substring(11, 16).split(':')
    let time = (+value[0]>12)?`${+value[0] % 12}:${value[1]} PM`:`${+value[0]}:${value[1]} AM`
    return time
  }

  const columnDefs = [
    {
      headerName: 'Event Name',
      field: 'name',
      pinned: true
    },
    {
      field: 'validFrom',
      valueFormatter: dateFormatter,
    },
    {
      field: 'validTo',
      valueFormatter: dateFormatter,
    },
    {
      field: 'departureTime',
      valueFormatter: timeFormatter,
    },
    {
      field: 'arrivalTime',
      valueFormatter: timeFormatter,
    },
    {
      field: 'departureLocation',
    },
    {
      field: 'duration',
    },
    {
      field: 'numberOfPerson',
    },
    {
      field: 'fees',
    },
    {
      field: 'publishDate',
      valueFormatter: dateFormatter,
    },
    {
      field: 'description',
    },
  ]

  const defaultColDef = useMemo(() => (
    {
      resizable: true,
      sortable: true,
      minWidth: 100,
    }
  ), [])

    const handleRowDoubleClick = (e) => {
      // console.log(e)
      console.log(e.data._id)
    }

  return (
    <div id='body' className="ag-theme-alpine" style={{ height: '400px', width: '100%' }}>
      <AgGridReact
        defaultColDef={defaultColDef}
        columnDefs={columnDefs}
        rowData={events}
        onRowDoubleClicked={handleRowDoubleClick}
      />
      {/* {events.map(event => <div className='eventCard' key={event._id}>
        <Link to={`/events/${event._id}`} >
          <img src={event.photos[0]} className='photo' alt='eventPhoto'/>
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
      </div>)} */}
    </div>
  )
}
