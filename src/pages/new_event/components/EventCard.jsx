import React from 'react'
import { useState } from 'react'
import { useEffect } from 'react'
import { formatDate, formatTime, getCoverPhoto } from '../actions/eventActions'
import './eventCard.css'
import emptyPhoto from '../../../components/empty-photo.jpg'
import loadingPhoto from '../../../components/ben-redblock-loading.gif'

export default function EventCard({ event, handleClick }) {

    const [coverPhoto, setcoverPhoto] = useState(() => { return {data: '', state: 0} })

    useEffect(
        () => {
            getCoverPhoto(event.photos[0], setcoverPhoto)
        },
        []
    )

    return (
        <div className='eventCard' onClick={() => handleClick(event)}>
            <div className='coverPhoto'>
                <img src={coverPhoto.state === 0?emptyPhoto:(coverPhoto.state === 1?loadingPhoto:coverPhoto.data)} alt="cover photo" />
            </div>
            <div className='body'>
                <div className='title'>{event.name}</div>
                <div className="infos">
                    <div className='row'>
                        <div><label>Valid From: </label><span>{formatDate(event.validFrom)}</span></div>
                        <div><label>Valid To: </label><span>{formatDate(event.validTo)}</span></div>
                        <div><label>Publish Date: </label><span>{formatDate(event.publishDate)}</span></div>
                    </div>
                    <div className='row'>
                        <div><label>Number: </label><span>{event.numberOfPerson} Persons</span></div>
                        <div><label>Fees: </label><span>{event.fees} $</span></div>
                        <div><label>Duration: </label><span>{event.duration} Hours</span></div>
                    </div>
                    <div className='row'>
                        <div><label>Departure Time: </label><span>{formatTime(event.departureTime)}</span></div>
                        <div><label>Arrival Time: </label><span>{formatTime(event.arrivalTime)}</span></div>
                    </div>
                    <div className='row'>
                        <div><label>Departure Location: </label><span>{event.departureLocation}</span></div>
                    </div>
                    <div className='row'>
                        <div><label>Arrival Location: </label><span>{event.arrivalLocation}</span></div>
                    </div>
                </div>
            </div>
        </div>
    )
}
