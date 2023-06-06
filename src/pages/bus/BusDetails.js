import React, { useEffect, useState } from 'react'
import BusDetailsHeader from './components/BusDetailsHeader'
import BusDetailsBody from './components/BusDetailsBody'
import './BusDetails.css'
import { useNavigate, useParams } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import { getBaseUrl } from '../../actions/urlService'
import ReactModal from 'react-modal';

ReactModal.setAppElement('#root');

export default function BusDetails({ id, isEditing , exitEditing}) {
    const [bus, setBus] = useState({})
    const [driver, setDriver] = useState({})
    const drivers = useSelector(state => state.drivers)
    const buses = useSelector(state => state.buses)
    // const { id } = useParams()
    const dispatch = useDispatch()
    const navigate = useNavigate()

    // const [isOpen, setIsOpen] = useState(isEditing);

    // const openModal = () => {
    //     setIsOpen(true);
    // };

    const closeModal = () => {
        exitEditing(false)
    };

    useEffect(() => {
        const api = getBaseUrl()
        fetch(api + "/buses/" + id)
            .then(res => res.json())
            .then(bus => {
                fetch(api + "/drivers/" + bus.driver)
                    .then(res => res.json())
                    .then(driver => {
                        setBus(bus)
                        setDriver(driver)
                    })
            })
    }, [])

    const handleDelete = () => {
        const busInit = buses.find(item => item._id === bus._id)
        const api = getBaseUrl()
        fetch(api + `/busesByDriver?user=${busInit.user}&driver=${busInit.driver}`)
            .then(res => res.json())
            .then(busArray => {
                if (busArray.length === 1) {
                    fetch(api + `/deleteDriver/${busInit.driver}`, {
                        method: 'DELETE',
                        headers: {
                            'Content-Type': 'application/json',
                        },
                    })
                        .then(res => res.json())
                        .then(deletedDriver => {
                            dispatch({ type: 'setDrivers', drivers: drivers.filter(driver => driver._id !== deletedDriver.data._id) })
                            console.log(`${deletedDriver.data.name}: ${deletedDriver.status}`)
                        })
                }
                fetch(api + `/deleteBus/${busInit._id}`, {
                    method: 'DELETE',
                    headers: {
                        'Content-Type': 'application/json',
                    },
                })
                    .then(res => res.json())
                    .then(deletedBus => {
                        dispatch({ type: 'setBuses', buses: buses.filter(buses => buses._id !== deletedBus.data._id) })
                        console.log(`${deletedBus.data.name}: ${deletedBus.status}`)
                        // dispatch({type:'update'})
                        closeModal()
                    })
            })
    }

    const handleUpdate = () => {
        const api = getBaseUrl()
        if (bus.name === '' || bus.driver === '') {
            console.log("Bus name and driver shoudn't be empty!")
            return
        }
        fetch(api + `/updateBus/${bus._id}`,
            {
                method: 'PATCH',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(bus)
            })
            .then(res => res.json())
            .then(updatedBus => {
                dispatch({ type: 'setBuses', buses: [updatedBus, ...buses.filter(buses => buses._id !== updatedBus._id)] })
                console.log(`Bus: ${updatedBus.name} has been updated`)
                // dispatch({type:'update'})
                closeModal()
            })
    }

    const handleName = (e) => {
        setBus({ ...bus, name: e.target.value })
    }

    const handleSeats = (e) => {
        setBus({ ...bus, seats: e.target.value })
    }

    const handleDescription = (e) => {
        setBus({ ...bus, description: e.target.value })
    }

    const handleDriver = (e) => {
        setBus({ ...bus, driver: e.target.value })
        setDriver(drivers.find(driver => driver._id === e.target.value))
    }

    return (
        <div>

            {/* <button onClick={openModal}>Open Modal</button> */}
            <ReactModal isOpen={isEditing} onRequestClose={closeModal}>
                <BusDetailsHeader handleUpdate={handleUpdate} handleDelete={handleDelete} handleCancel={closeModal}/>
                <BusDetailsBody
                    bus={bus}
                    driver={driver}
                    handleName={handleName}
                    handleSeats={handleSeats}
                    handleDriver={handleDriver}
                    handleDescription={handleDescription}
                />
            </ReactModal>
        </div>
    )
}
