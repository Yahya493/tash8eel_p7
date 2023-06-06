import React, { useState } from 'react'
import { useSelector } from 'react-redux'


export default function BusDetailsBody(
    {
        bus,
        driver,
        handleName,
        handleSeats,
        handleDriver,
        handleDriverName,
        handleDriverPhone,
        handleDescription
    }
) {

    const [isNewDriver, setIsNewDriver] = useState(false)

    const drivers = useSelector(state => state.drivers)

    const handleAddingNewDiver = (e) => {
        setIsNewDriver(!isNewDriver)
    }

    return (
        <div id='busDetailsBody'>
            <table>
                <tbody>
                    <tr>
                        <td>
                            <label htmlFor='busName'>Name</label>
                        </td>
                        <td>
                            <input id='busName' type='text' value={bus.name} onChange={handleName} />
                        </td>
                    </tr>
                    <tr>
                        <td>
                            <label htmlFor='driverName'>Driver</label>
                        </td>
                        <td>
                            {!isNewDriver ? <select id='driverName' onChange={handleDriver} value={driver._id}>
                                {drivers.map(userDriver => <option key={userDriver._id} value={userDriver._id}>{userDriver.name}</option>)}
                            </select> :
                                <input id='driverName' type='text' value={driver.name} onChange={handleDriverName} />}
                            {isNewDriver ? null : <button onClick={handleAddingNewDiver}>New</button>}
                        </td>
                    </tr>
                    <tr>
                        <td>
                            <label htmlFor='phone'>Phone</label>
                        </td>
                        <td>
                            <input id='phone' type='text' value={driver.phone} onChange={isNewDriver ? handleDriverPhone : () => { }} />
                        </td>
                    </tr>
                    <tr>
                        <td>
                            <label htmlFor='seats'>Seats</label>
                        </td>
                        <td>
                            <input id='seats' type='number' value={bus.seats} onChange={handleSeats} />
                        </td>
                    </tr>
                    <tr>
                        <td>
                            <label htmlFor='description'>Description</label>
                        </td>
                        <td>
                            <input id='description' type='text' value={bus.description} onChange={handleDescription} />
                        </td>
                    </tr>
                </tbody>
            </table>
        </div>
    )
}
