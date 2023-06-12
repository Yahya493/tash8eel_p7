import Cookies from 'js-cookie'
import React, { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { saveDriver } from '../../../actions/actions'


export default function BusDetailsBody(
    {
        bus,
        driver,
        handleName,
        handleSeats,
        handleDriver,
        // handleDriverName,
        // handleDriverPhone,
        handleDescription,
        busNameVald,
        driverVald,
    }
) {

    const [isNewDriver, setIsNewDriver] = useState(false)
    const user = Cookies.get('user')
    const drivers = useSelector(state => state.drivers)
    const dispatch = useDispatch()

    const [newDriver, setNewDriver] = useState({ name: '', phone: '', user: user })

    const [nameVald, setNameVal] = useState('*')
    const [phoneVald, setPhoneVal] = useState('*')

    const checkDriverForm = () => {
        setNameVal('*')
        setPhoneVal('*')
        let valide = true

        if (newDriver.name === '') {
            setNameVal('required')
            valide = false
        }
        else {
            for (let driver of drivers) {
                if (driver.name.toLowerCase() === newDriver.name.toLowerCase()) {
                    setNameVal('alredy used')
                    valide = false
                    break
                }
            }
        }
        if (newDriver.phone === '') {
            setPhoneVal('required')
            valide = false
        }

        return valide
    }

    const handleAddingNewDiver = (e) => {
        setIsNewDriver(!isNewDriver)
    }

    const handleSave = () => {
        if (!checkDriverForm()) return

        saveDriver(dispatch, newDriver, drivers)
        setIsNewDriver(false)
    }

    const handleDriverName = (e) => {
        setNewDriver({ ...newDriver, name: e.target.value })
    }

    const handleDriverPhone = (e) => {
        setNewDriver({ ...newDriver, phone: e.target.value })
    }

    const handleCancel = () => {
        setIsNewDriver(false)
    }

    return (
        <div className='busDetailsBody'>
            <table>
                <tbody>
                    <tr>
                        <td colSpan={2}>
                            <label htmlFor='busName'>Name</label>
                            <input id='busName' type='text' value={bus.name} onChange={handleName} />
                            <p className='inputValidation'>{busNameVald}</p>
                        </td>
                        <td>
                            <label htmlFor='driverName'>Driver</label>
                            <select id='driverName' onChange={handleDriver} value={driver._id}>
                                {drivers.map(userDriver => <option key={userDriver._id} value={userDriver._id}>{userDriver.name}</option>)}
                            </select>
                            <p className='inputValidation'>{driverVald}</p>
                            {/* {isNewDriver ? null : <button onClick={handleAddingNewDiver}>New</button>} */}
                            {/* {!isNewDriver ? <select id='driverName' onChange={handleDriver} value={driver._id}>
                                {drivers.map(userDriver => <option key={userDriver._id} value={userDriver._id}>{userDriver.name}</option>)}
                            </select> :
                                <input id='driverName' type='text' value={driver.name} onChange={handleDriverName} />} */}
                        </td>
                    </tr>
                    <tr>
                        <td>
                            <label htmlFor='seats'>Seats</label>
                            <input id='seats' type='number' value={bus.seats} onChange={handleSeats} />
                        </td>
                        <td width={'25%'}>
                        </td>

                        <td>
                            <label htmlFor='phone'>Phone</label>
                            <input id='phone' type='text' value={driver.phone} />
                        </td>
                    </tr>
                    <tr>
                        <td colSpan={3}>
                            <label htmlFor='description'>Description</label><br />
                            <textarea id='description' value={bus.description} onChange={handleDescription} aria-multiline />
                        </td>
                    </tr>
                </tbody>
            </table>
            <table id='newDriver'>
                <tr>
                    {!isNewDriver ? null :
                        <td>
                            <label >Name</label>
                            <input id='driverName' type='text' value={newDriver.name} onChange={handleDriverName} />
                            <p className='inputValidation'>{nameVald}</p>
                        </td>}
                </tr>
                <tr>
                    {!isNewDriver ? null :
                        <td>
                            <label >Phone</label>
                            <input id='phone' type='text' value={newDriver.phone} onChange={handleDriverPhone} />
                            <p className='inputValidation'>{phoneVald}</p>
                        </td>}

                </tr>
                <tr>

                    <td id='btnCell'>
                        <button onClick={isNewDriver ? handleCancel : handleAddingNewDiver} className={isNewDriver ? 'btnCancel' : ''}>{isNewDriver ? 'Cancel' : 'New Driver'}</button>
                        {isNewDriver ? <button onClick={handleSave}>Save</button> : null}
                    </td>
                </tr>
            </table>
        </div>
    )
}
