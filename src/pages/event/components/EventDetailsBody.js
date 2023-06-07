import React from 'react'
import { useSelector } from 'react-redux'


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
    }) {

    const buses = useSelector(state => state.buses)

    return (
        <div id='eventDetailsBody'>
            <table>
                <tbody>
                    <tr>
                        <td>
                            <label htmlFor='eventName'>Name</label>
                        </td>
                        <td>
                            <input id='eventName' type='text' value={event.name} onChange={handleName} />
                        </td>
                    </tr>
                    <tr>
                        <td>
                            <label htmlFor='validFrom'>Valid From</label>
                        </td>
                        <td>
                            <input id='validFrom' type='date' value={event.validFrom} onChange={handleValidFrom} />
                        </td>
                        <td>
                            <label htmlFor='validTo'>Valid To</label>
                        </td>
                        <td>
                            <input id='validTo' type='date' value={event.validTo} onChange={handleValidTo} />
                        </td>
                    </tr>
                    <tr>
                        <td>
                            <label htmlFor='departureTime'>Departure Time</label>
                        </td>
                        <td>
                            <input id='departureTime' type='time' value={event.departureTime} onChange={handleDepartureTime} />
                        </td>
                        <td>
                            <label htmlFor='arrivalTime'>Arrival Time</label>
                        </td>
                        <td>
                            <input id='arrivalTime' type='time' value={event.arrivalTime} onChange={handleArrivalTime} />
                        </td>
                    </tr>
                    <tr>
                        <td>
                            <label htmlFor='departureLocation'>Departure Location</label>
                        </td>
                        <td>
                            <input id='departureLocation' type='text' value={event.departureLocation} onChange={handleDepartureLocation} />
                        </td>
                        <td>
                            <label htmlFor='arrivalLocation'>Arrival Location</label>
                        </td>
                        <td>
                            <input id='arrivalLocation' type='text' value={event.arrivalLocation} onChange={handleArrivalLocation} />
                        </td>
                    </tr>
                    <tr>
                        <td>
                            <label htmlFor='numberOfPerson'>Number of Person</label>
                        </td>
                        <td>
                            <input id='numberOfPerson' type='number' value={event.numberOfPerson} onChange={handleNumberOfPerson} />
                        </td>
                        <td>
                            <label htmlFor='fees'>Fees</label>
                        </td>
                        <td>
                            <input id='fees' type='number' value={event.fees} onChange={handleFees} />
                        </td>
                    </tr>
                    <tr>
                        <td>
                            <label htmlFor='duration'>Duration</label>
                        </td>
                        <td>
                            <input id='duration' type='number' value={event.duration} onChange={handleDuration} />
                        </td>
                        <td>
                            <label htmlFor='publishDate'>Publish Date</label>
                        </td>
                        <td>
                            <input id='publishDate' type='date' value={event.publishDate} onChange={handlePublishDate} />
                        </td>
                    </tr>
                    <tr>
                        <td>
                            <label htmlFor='description'>Description</label>
                        </td>
                        <td>
                            <input id='description' type='text' value={event.description} onChange={handleDescription} />
                        </td>
                    </tr>
                    <tr>
                        <td>
                            <label htmlFor='trail'>Trail</label>
                        </td>
                        <td>
                            <input id='trail' type='text' value={event.trail} />
                        </td>
                    </tr>
                    <tr>
                        <td>
                            <label >Buses</label>
                        </td>
                        <td>
                            <div id="eventBuses">
                                {
                                    (event.buses.length === 0) ?
                                        <select key={Math.random()} onChange={(e) => handleBuses(e, 0)} value={''}>
                                            {buses.map(userBus => <option key={userBus._id} value={userBus._id} >{userBus.name}</option>)}
                                        </select>
                                        : event.buses.map(
                                            (busId, index) => <select key={busId} onChange={(e) => handleBuses(e, index)} value={busId}>
                                                {buses.map(userBus => <option key={userBus._id} value={userBus._id} >{userBus.name}</option>)}
                                            </select>
                                        )
                                }
                            </div>
                            {/* <input id='buses' type='text' value={event.buses} /> */}
                        </td>
                    </tr>
                    <tr>
                        <td>
                            <label htmlFor='photos'>Photos</label>
                        </td>
                        <td>
                            <input id='photos' type='text' value={event.photos} />
                        </td>
                    </tr>
                </tbody>
            </table>
        </div>
    )
}
