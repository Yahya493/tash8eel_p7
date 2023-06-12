import Cookies from 'js-cookie'
import React, { useEffect, useState } from 'react'
import ReactModal from 'react-modal'
import { useDispatch, useSelector } from 'react-redux'
import { saveBus } from '../../actions/actions'
import { getBaseUrl } from '../../actions/urlService'
import './BusDetails.css'
import BusCreateBody from './components/BusCreateBody'
import BusCreateHeader from './components/BusCreateHeader'

ReactModal.setAppElement('#root');

export default function BusCreateForm({ isAdding, exitAdding }) {

    const buses = useSelector(state => state.buses)
    const drivers = useSelector(state => state.drivers)
    const user = Cookies.get('user')
    const [newBus, setNewBus] = useState({ name: '', driver: '', seats: 30, description: '', user: user })
    const [newDriver, setNewDriver] = useState({ name: '', phone: '', user: user })


    const dispatch = useDispatch()

    const [busNameVald, setBusNameVal] = useState('*')
    const [driverVald, setDriverVal] = useState('*')

    const resetValues = () => {
        setNewBus({
            ...newBus,
            name: '',
            driver: '',
            seats: 30,
            description: '',
        })
        setNewDriver({
            ...newDriver,
            _id: '',
            name: '',
            phone: ''
        })
    }

    const closeModal = () => {
        exitAdding(false)
    };

    useEffect(() => {
        resetValues()
    }, [])

    const checkBusForm = () => {
        setBusNameVal('*')
        setDriverVal('*')
        let valide = true

        if (newBus.name === '') {
            setBusNameVal('required')
            valide = false
        }
        if (newBus.driver === '') {
            setDriverVal('required')
            valide = false
        }

        return valide
    }

    // const checkForm = () => {
    //     if (newBus.name === '') {
    //         console.log("Bus name shouldn't be empty!")
    //         return false
    //     }
    //     if (newBus.driver === '' && newDriver.name === '') {
    //         console.log('Select a driver!')
    //         return false
    //     }

    //     return true
    // }

    const handleSave = async () => {
        if (!checkBusForm()) return

        saveBus(dispatch, newBus, /*newDriver,*/ buses, /*drivers,*/ closeModal)
        // const api = getBaseUrl()
        // try {
        //     fetch(api + '/insertDriver', {
        //         method: 'POST',
        //         headers: {
        //             'Content-Type': 'application/json',
        //         },
        //         body: JSON.stringify(newDriver)
        //     })
        //         .then(res => res.json())
        //         .then(driverRes => {
        //             // setNewDriver(driverRes)
        //             dispatch({ type: 'setDrivers', drivers: [...drivers, driverRes] })
        //             try {
        //                 fetch(api + '/insertBus', {
        //                     method: 'POST',
        //                     headers: {
        //                         'Content-Type': 'application/json',
        //                     },
        //                     body: JSON.stringify({ ...newBus, driver: driverRes._id })
        //                 })
        //                     .then(res => res.json())
        //                     .then(busRes => {
        //                         console.log(busRes)
        //                         dispatch({ type: 'setBuses', buses: [busRes, ...buses] })
        //                         closeModal()
        //                     })
        //             }
        //             catch (error) {
        //                 console.error('Error:', error)
        //             }
        //         })
        // }
        // catch (error) {
        //     console.error("Error: " + error)
        // }

    }

    const handleName = (e) => {
        setNewBus({ ...newBus, name: e.target.value })
    }

    const handleSeats = (e) => {
        setNewBus({ ...newBus, seats: e.target.value })
    }

    const handleDescription = (e) => {
        setNewBus({ ...newBus, description: e.target.value })
    }

    const handleDriver = (e) => {
        setNewBus({ ...newBus, driver: e.target.value })
        setNewDriver(drivers.find(driver => driver._id === e.target.value))
    }

    const handleDriverName = (e) => {
        setNewDriver({ ...newDriver, name: e.target.value })
    }

    const handleDriverPhone = (e) => {
        setNewDriver({ ...newDriver, phone: e.target.value })
    }


    return (
        <div className='busCreateForm'>
            <ReactModal isOpen={isAdding} onRequestClose={closeModal} className='busModal'>
                <BusCreateHeader
                    handleReset={resetValues}
                    handleSave={handleSave}
                    handleCancel={closeModal}
                />
                <BusCreateBody
                    bus={newBus}
                    driver={newDriver}
                    handleName={handleName}
                    handleFees={handleSeats}
                    handleDriver={handleDriver}
                    handleDescription={handleDescription}
                    busNameVald={busNameVald}
                    driverVald={driverVald}
                />
            </ReactModal>
        </div>
    )
}
