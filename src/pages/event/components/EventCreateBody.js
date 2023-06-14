import React from 'react'
import { useState } from 'react'
import ReactImageGallery from 'react-image-gallery'
import { useSelector } from 'react-redux'
import FilesUpload from '../../../components/FilesUpload'
import emptyPhoto from '../../../components/empty-photo.jpg'
import { useEffect } from 'react'
import { getBaseUrl } from '../../../actions/urlService'


export default function EventCreateBody(
    {
        event,
        handleName,
        nameVald,
        handleValidFrom,
        validFromVald,
        handleValidTo,
        validToVald,
        handleDepartureTime,
        handleDepartureLocation,
        departureLocationVald,
        handleArrivalTime,
        handleArrivalLocation,
        arrivalLocatioVald,
        handleNumberOfPerson,
        handleDuration,
        handleFees,
        handlePublishDate,
        publishDateVald,
        handleDescription,
        handleBuses,
        busesVald,
        trailVald,
        setEvent,
    }) {

    const buses = useSelector(state => state.buses)
    const [photos, setPhotos] = useState([])
    const api = getBaseUrl()

    // useEffect(
    //     () => {
    //         for (const photoId of event.photos)
    //             fetch(api + '/photos', {
    //                 method: 'POST',
    //                 headers: {
    //                     "Content-Type": "application/json"
    //                 },
    //                 body: JSON.stringify({ _id: photoId })
    //             })
    //             .then(res => res.json())
    //             .then(photo => setPhotos([...photos, photo.myFile]))
    //     },
    //     [event.photos]
    // )

    return (
        <div className='eventCreateBody'>
            <table>
                <tbody>
                    <tr>
                        <td colSpan={3}>
                            <label htmlFor='eventName'>Event name</label><br />
                            <input id='eventName' type='text' value={event.name} onChange={handleName} />
                            <p className='inputValidation'>{nameVald}</p>
                        </td>
                    </tr>
                    <tr>
                        <td>
                            <label htmlFor='validFrom'>Valid From</label><br />
                            <input id='validFrom' type='date' value={event.validFrom} onChange={handleValidFrom} />
                            <p className='inputValidation'>{validFromVald}</p>
                        </td>
                        <td>
                            <label htmlFor='validTo'>Valid To</label><br />
                            <input id='validTo' type='date' value={event.validTo} onChange={handleValidTo} />
                            <p className='inputValidation'>{validToVald}</p>
                        </td>
                        <td>
                            <label htmlFor='publishDate'>Publish Date</label><br />
                            <input id='publishDate' type='date' value={event.publishDate} onChange={handlePublishDate} />
                            <p className='inputValidation'>{publishDateVald}</p>
                        </td>
                    </tr>
                    <tr>
                        <td>
                            <label htmlFor='departureTime'>Departure Time</label><br />
                            <input id='departureTime' type='time' value={event.departureTime} onChange={handleDepartureTime} />
                        </td>
                        <td>

                        </td>
                        <td>
                            <label htmlFor='arrivalTime'>Arrival Time</label><br />
                            <input id='arrivalTime' type='time' value={event.arrivalTime} onChange={handleArrivalTime} />
                        </td>
                    </tr>
                    <tr>
                        <td>
                            <label htmlFor='departureLocation'>Departure Location</label><br />
                            <input id='departureLocation' type='text' value={event.departureLocation} onChange={handleDepartureLocation} />
                            <p className='inputValidation'>{departureLocationVald}</p>
                        </td>
                        <td>

                        </td>
                        <td>
                            <label htmlFor='arrivalLocation'>Arrival Location</label><br />
                            <input id='arrivalLocation' type='text' value={event.arrivalLocation} onChange={handleArrivalLocation} />
                            <p className='inputValidation'>{arrivalLocatioVald}</p>
                        </td>
                    </tr>
                    <tr>
                        <td>
                            <label htmlFor='numberOfPerson'>Number of Person</label><br />
                            <input id='numberOfPerson' type='number' value={event.numberOfPerson} onChange={handleNumberOfPerson} />
                        </td>
                        <td>
                            <label htmlFor='fees'>Fees</label><br />
                            <input id='fees' type='number' value={event.fees} onChange={handleFees} />
                        </td>
                        <td>
                            <label htmlFor='duration'>Duration</label><br />
                            <input id='duration' type='number' value={event.duration} onChange={handleDuration} />
                        </td>
                    </tr>
                    <tr>
                        <td colSpan={2}>
                            <label htmlFor='trail'>Trail</label><br />
                            <input id='trail' type='text' value={event.trail} />
                            <p className='inputValidation'>{trailVald}</p>
                        </td>
                        <td>
                            <label >Buses</label><br />
                            <div id="eventBuses">
                                {
                                    (event.buses.length === 0) ?
                                        <select key={Math.random()} onChange={(e) => handleBuses(e, 0)} value={''}>
                                            {buses.map(userBus => <option key={userBus._id} value={userBus._id} >{userBus.name}</option>)}
                                        </select> :
                                        // event.buses.map( (busId, index) => 
                                        <select /*key={busId}*/ onChange={(e) => handleBuses(e, 0)} value={event.buses[0]/*busId*/}>
                                            {buses.map(userBus => <option key={userBus._id} value={userBus._id} >{userBus.name}</option>)}
                                        </select>
                                    // )
                                }
                            </div>
                            <p className='inputValidation'>{busesVald}</p>
                        </td>
                    </tr>
                    <tr>
                        <td colSpan={3}>
                            <label htmlFor='description'>Description</label><br />
                            <textarea id='description' value={event.description} onChange={handleDescription} aria-multiline />
                        </td>
                    </tr>
                </tbody>
            </table>
            <div className='galleryCard'>
                <FilesUpload uploadTo='event' object={event} setter={setEvent} photos={photos} setPhotos={setPhotos}/>
                <ReactImageGallery items={(photos.length === 0) ?
                    [{
                        original: emptyPhoto,
                    }]
                    :
                    photos.map(photo => {
                        return {
                            original: photo,
                        }
                    })} autoPlay />
            </div>
        </div>
    )
}

