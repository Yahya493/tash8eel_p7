import React, { useState } from 'react'


export default function EventDetailsBody({ event }) {

    return (
        <div id='eventDetailsBody'>
            <table>
                <tr>
                    <td>
                        <label htmlFor='eventName'>Name</label>
                    </td>
                    <td>
                        <input id='eventName' type='text' value={event.name} />
                    </td>
                </tr>
                <tr>
                    <td>
                        <label htmlFor='validFrom'>Valid From</label>
                    </td>
                    <td>
                        <input id='validFrom' type='text' value={event.validFrom} />
                    </td>
                </tr>
                <tr>
                    <td>
                        <label htmlFor='validTo'>Valid To</label>
                    </td>
                    <td>
                        <input id='validTo' type='text' value={event.validTo} />
                    </td>
                </tr>
                <tr>
                    <td>
                        <label htmlFor='departureTime'>Departure Time</label>
                    </td>
                    <td>
                        <input id='departureTime' type='text' value={event.departureTime} />
                    </td>
                </tr>
                <tr>
                    <td>
                        <label htmlFor='arrivalTime'>Arrival Time</label>
                    </td>
                    <td>
                        <input id='arrivalTime' type='text' value={event.arrivalTime} />
                    </td>
                </tr>
                <tr>
                    <td>
                        <label htmlFor='departureLocation'>Departure Location</label>
                    </td>
                    <td>
                        <input id='departureLocation' type='text' value={event.departureLocation} />
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
                        <label htmlFor='buses'>Buses</label>
                    </td>
                    <td>
                        <input id='buses' type='text' value={event.buses} />
                    </td>
                </tr>
                <tr>
                    <td>
                        <label htmlFor='numberOfPerson'>Number of Person</label>
                    </td>
                    <td>
                        <input id='numberOfPerson' type='number' value={event.numberOfPerson} />
                    </td>
                </tr>
                <tr>
                    <td>
                        <label htmlFor='duration'>Duration</label>
                    </td>
                    <td>
                        <input id='duration' type='number' value={event.duration} />
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
                <tr>
                    <td>
                        <label htmlFor='fees'>Fees</label>
                    </td>
                    <td>
                        <input id='fees' type='number' value={event.fees} />
                    </td>
                </tr>
                <tr>
                    <td>
                        <label htmlFor='publishDate'>Publish Date</label>
                    </td>
                    <td>
                        <input id='publishDate' type='text' value={event.publishDate} />
                    </td>
                </tr>
                <tr>
                    <td>
                        <label htmlFor='description'>Description</label>
                    </td>
                    <td>
                        <input id='description' type='text' value={event.description} />
                    </td>
                </tr>
            </table>
        </div>
    )
}
