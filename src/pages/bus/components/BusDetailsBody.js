import React from 'react'
import { useSelector } from 'react-redux'


export default function BusDetailsBody({ bus, driver }) {

    const drivers = useSelector(state => state.drivers)

    return (
        <div id='busDetailsBody'>
            <table>
                <tbody>
                    <tr>
                        <td>
                            <label htmlFor='busName'>Name</label>
                        </td>
                        <td>
                            <input id='busName' type='text' value={bus.name} />
                        </td>
                    </tr>
                    <tr>
                        <td>
                            <label htmlFor='driverName'>Driver</label>
                        </td>
                        <td>
                            <select id='driverName'>
                                {drivers.map(userDriver => <option key={userDriver._id} value={userDriver._id} selected={userDriver._id==driver._id}>{userDriver.name}</option>)}
                            </select>
                            {/* <input id='driverName' type='text' value={driver.name} /> */}
                        </td>
                    </tr>
                    <tr>
                        <td>
                            <label htmlFor='phone'>Phone</label>
                        </td>
                        <td>
                            <input id='phone' type='text' value={driver.phone} />
                        </td>
                    </tr>
                    <tr>
                        <td>
                            <label htmlFor='seats'>Seats</label>
                        </td>
                        <td>
                            <input id='seats' type='number' value={bus.seats} />
                        </td>
                    </tr>
                    <tr>
                        <td>
                            <label htmlFor='description'>Description</label>
                        </td>
                        <td>
                            <input id='description' type='text' value={bus.description} />
                        </td>
                    </tr>
                </tbody>
            </table>
        </div>
    )
}
