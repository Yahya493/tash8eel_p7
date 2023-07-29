import React from 'react'
import { useState } from 'react'
import { useEffect } from 'react'
import { formatDate, formatTime, getCoverPhoto } from '../actions/eventActions'
import './eventCard.css'
import emptyPhoto from '../../../components/empty-photo.jpg'

export default function EventCard({ event }) {

    const [coverPhoto, setcoverPhoto] = useState(() => { return {data: '', state: 0} })

    useEffect(
        () => {
            getCoverPhoto(event.photos[0], setcoverPhoto)
        },
        []
    )

    return (
        <div className='eventCard' >
            <div className='coverPhoto'>
                <img src={coverPhoto.state === 0?emptyPhoto:coverPhoto.data} alt="cover photo" />
            </div>
            <div className='body'>
                <h2>{event.name}</h2>
                <div className="infos">
                    <div className='dates'>
                        <div><label>Valid From: </label><span>{formatDate(event.validFrom)}</span></div>
                        <div><label>Valid To: </label><span>{formatDate(event.validTo)}</span></div>
                        <div><label>Publish Date: </label><span>{formatDate(event.publishDate)}</span></div>
                    </div>
                    <div className='times'>
                        <div><label>Departure: </label><span>{formatTime(event.departureTime)}</span></div>
                        <div><label>Arrival: </label><span>{formatTime(event.arrivalTime)}</span></div>
                    </div>
                </div>
            </div>
        </div>
    )
}
