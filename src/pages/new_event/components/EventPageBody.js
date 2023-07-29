
import { AgGridReact } from 'ag-grid-react';
import React, { useMemo } from 'react';
import { useState } from 'react';
import EventDetails from '../EventDetails'
import EventCard from './EventCard';
import './eventPageBody.css'


export default function EventPageBody({ events }) {

  const [eventId, setEventId] = useState()
  const [isEditing, setIsEditing] = useState(false)

  const dateFormatter = p => {
    const value = p.value.substring(0, 10).split('-')
    return `${value[2]}-${value[1]}-${value[0]}`
  }

  const timeFormatter = p => {
    const value = p.value.substring(11, 16).split(':')
    let time = (+value[0] > 12) ? `${+value[0] % 12}:${value[1]} PM` : `${+value[0]}:${value[1]} AM`
    return time
  }

  const columnDefs = [
    {
      headerName: 'Event Name',
      field: 'name',
      width: 300,
      pinned: true
    },
    {
      field: 'validFrom',
      width: 120,
      valueFormatter: dateFormatter,
    },
    {
      field: 'validTo',
      width: 120,
      valueFormatter: dateFormatter,
    },
    {
      field: 'departureTime',
      width: 140,
      valueFormatter: timeFormatter,
    },
    {
      field: 'arrivalTime',
      width: 120,
      valueFormatter: timeFormatter,
    },
    {
      field: 'departureLocation',
      width: 300
    },
    {
      field: 'arrivalLocation',
      width: 300,
    },
    {
      field: 'duration',
      width: 100,
      valueFormatter: p => p.value + ' h'
    },
    {
      headerName: 'Nb Of Person',
      field: 'numberOfPerson',
      width: 130
    },
    {
      field: 'fees',
      width: 70,
      valueFormatter: p => p.value + '$'
    },
    {
      field: 'buses',
      hide: true,
      valueFormatter: p => p.value.length,
      tooltipValueGetter: p => p.value
    },
    {
      field: 'photos',
      hide: true,
      valueFormatter: p => p.value.length,
    },
    {
      field: 'publishDate',
      width: 120,
      valueFormatter: dateFormatter,
    },
    {
      field: 'description',
      width: 600,
      tooltipValueGetter: p => p.value
    },
  ]

  const defaultColDef = useMemo(() => (
    {
      resizable: true,
      sortable: true,
      // width: 120,
    }
  ), [])

  const handleRowDoubleClick = (e) => {
    // console.log(e)
    // console.log(e.data._id)
    setEventId(e.data._id)
    setIsEditing(true)
  }

  const handleMouseOver = (e) => {
    // const key = e.column.colId
    // console.log(e.value)
  }

  return (
    <div id='eventPageBody' className="ag-theme-alpine">
      {isEditing ? <EventDetails id={eventId} isEditing={isEditing} exitEditing={setIsEditing} /> : null}
      {/* <AgGridReact
        defaultColDef={defaultColDef}
        columnDefs={columnDefs}
        rowData={events}
        onRowDoubleClicked={handleRowDoubleClick}
        onCellMouseOver={handleMouseOver}
        animateRows={true}
      /> */}
      {events.map(e => <div key={e._id} className="cardContainer">
        <EventCard event={e}/>
      </div>)}
    </div>
  )
}
