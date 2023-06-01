import React, { useEffect, useState } from 'react'
import BusDetailsHeader from '../components/BusDetailsHeader'
import BusDetailsBody from '../components/BusDetailsBody'
import '../styles/BusDetails.css'
import { useParams } from 'react-router-dom'
import { useSelector } from 'react-redux'

export default function BusDetails() {
    const [bus, setBus] = useState({})
    const [driver, setDriver] = useState({})
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

  return (
    <div>
        <BusDetailsHeader handleUpdate={handleUpdate} handleDelete={handleDelete}/>
        <BusDetailsBody bus={bus} driver={driver}/>
    </div>
  )
}
