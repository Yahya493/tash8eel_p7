import React, { useState } from 'react'


export default function BusDetailsBody({bus, driver}) {

    return (
        <div id='busDetailsBody'>
            <form >
                <table>
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
                            <input id='driverName' type='text' value={driver.name} />
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
                </table>
            </form>
        </div>
    )
}
