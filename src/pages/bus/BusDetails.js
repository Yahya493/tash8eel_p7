import React, { useEffect, useState } from 'react'
import BusDetailsHeader from './components/BusDetailsHeader'
import BusDetailsBody from './components/BusDetailsBody'
import './BusDetails.css'
import { useParams } from 'react-router-dom'
import { useSelector } from 'react-redux'

export default function BusDetails() {
    const [bus, setBus] = useState({})
    const [driver, setDriver] = useState({})
    const drivers = useSelector(state => state.drivers)
    const { id } = useParams()
    const api = useSelector(state => state.api)

    useEffect(() => {
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
        alert(`delete bus ${bus._id}`)
    }
    
    const handleUpdate = () => {
        alert(`update bus ${bus._id}`)
    }

    const handleName = (e) => {
        setBus({...bus, name: e.target.value})
    }

    const handleSeats = (e) => {
        setBus({...bus, seats: e.target.value})
    }

    const handleDescription = (e) => {
        setBus({...bus, description: e.target.value})
    }

    const handleDriver = (e) => {
        setBus({...bus, driver: e.target.value})
        setDriver(drivers.find(driver => driver._id === e.target.value))
    }

  return (
    <div>
        <BusDetailsHeader handleUpdate={handleUpdate} handleDelete={handleDelete}/>
        <BusDetailsBody 
            bus={bus} 
            driver={driver}
            handleName={handleName}
            handleSeats={handleSeats}
            handleDriver={handleDriver}
            handleDescription={handleDescription}
        />
    </div>
  )
}
