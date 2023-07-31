
import { AgGridReact } from 'ag-grid-react';
import React, { useMemo } from 'react';
import { useState } from 'react';
import EventDetails from '../EventDetails'
import EventCard from './EventCard';
import './eventPageBody.css'
import * as ScrollArea from '@radix-ui/react-scroll-area'


export default function EventPageBody({ events }) {

  const [eventId, setEventId] = useState()
  const [isEditing, setIsEditing] = useState(false)

  const dateFormatter = p => {
    const value = p.value.substring(0, 10).split('-')
    return `${value[2]}-${value[1]}-${value[0]}`
  }

  // const timeFormatter = p => {
  //   const value = p.value.substring(11, 16).split(':')
  //   let time = (+value[0] > 12) ? `${+value[0] % 12}:${value[1]} PM` : `${+value[0]}:${value[1]} AM`
  //   return time
  // }


  const handleCardClick = (e) => {
    // console.log(e)
    // console.log(e._id)

    setEventId(e._id)
    setIsEditing(true)
  }

  return (
    <div id='eventPageBody' className="">
      {isEditing ? <EventDetails id={eventId} isEditing={isEditing} exitEditing={setIsEditing} /> : null}

      {/* {events.map(e => <div key={e._id} className="cardContainer">
        <EventCard event={e} handleClick={handleCardClick}/>
      </div>)} */}

      <ScrollArea.Root className="ScrollAreaRoot">
        <ScrollArea.Viewport className="ScrollAreaViewport">
          <div style={{ padding: '5px 25px 5px 10px' }}>
            {events.map(e => <div key={e._id} className="cardContainer">
              <EventCard event={e} handleClick={handleCardClick} />
            </div>)}
          </div>
        </ScrollArea.Viewport>
        <ScrollArea.Scrollbar className="ScrollAreaScrollbar" orientation="vertical">
          <ScrollArea.Thumb className="ScrollAreaThumb" />
        </ScrollArea.Scrollbar>
        <ScrollArea.Scrollbar className="ScrollAreaScrollbar" orientation="horizontal">
          <ScrollArea.Thumb className="ScrollAreaThumb" />
        </ScrollArea.Scrollbar>
        <ScrollArea.Corner className="ScrollAreaCorner" />
      </ScrollArea.Root>
    </div>
  )
}
