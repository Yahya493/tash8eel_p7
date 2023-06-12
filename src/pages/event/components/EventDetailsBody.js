import React from 'react'
import { useSelector } from 'react-redux'
import FilesUpload from '../../../components/FilesUpload'
import ReactImageGallery from 'react-image-gallery'
import { useState } from 'react'
import emptyPhoto from '../../../components/empty-photo.jpg'



export default function EventDetailsBody(
    {
        event,
        handleName,
        handleValidFrom,
        handleValidTo,
        handleDepartureTime,
        handleDepartureLocation,
        handleArrivalTime,
        handleArrivalLocation,
        handleNumberOfPerson,
        handleDuration,
        handleFees,
        handlePublishDate,
        handleDescription,
        handleBuses,
        setEvent,
    }) {

    const buses = useSelector(state => state.buses)

    const [nameVald, setNameVald] = useState('*')
    const [validFromVald, setValidFromVald] = useState('*')
    const [validToVald, setValidToVald] = useState('*')
    const [publishDateVald, setPublishDateVald] = useState('*')
    const [departureLocationVald, setDepartureLocationVald] = useState('*')
    const [arrivalLocatioVald, setArrivalLocatioVald] = useState('*')
    const [trailVald, setTrailVald] = useState('*')
    const [busesVald, setBusesVald] = useState('*')

    return (
        <div className='eventDetailsBody'>
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
                                        <select /*key={busId}*/ onChange={(e) => handleBuses(e /*, index*/)} value={event.buses[0]/*busId*/}>
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
            <div className='gallery'>
                <FilesUpload uploadTo='event' object={event} setter={setEvent} />
                <ReactImageGallery items={(event.photos.length === 0)?
                    [{
                        original: emptyPhoto,
                    }]
                :
                event.photos.map(photo => {
                    return {
                        original: photo,
                    }
                })} autoPlay/>
            </div>
        </div>
    )
}
