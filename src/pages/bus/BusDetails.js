import React, { useEffect, useState } from 'react'
import BusDetailsHeader from './components/BusDetailsHeader'
import BusDetailsBody from './components/BusDetailsBody'
import './BusDetails.css'
import { useNavigate, useParams } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'

export default function BusDetails() {
    const [bus, setBus] = useState({})
    const [driver, setDriver] = useState({})
    const drivers = useSelector(state => state.drivers)
    const buses = useSelector(state => state.buses)
    const { id } = useParams()
    const api = useSelector(state => state.api)
    const dispatch = useDispatch()
    const navigate = useNavigate()

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
        const busInit = buses.find(item => item._id === bus._id)
        fetch(api + `/busesByDriver?user=${busInit.user}&driver=${busInit.driver}`)
        .then(res => res.json())
        .then(busArray => {
            if(busArray.length === 1) {
                fetch(api + `/deleteDriver/${busInit.driver}`, {
                    method: 'DELETE',
                    headers: {
                        'Content-Type': 'application/json',
                      },
                })
                .then(res => res.json())
                .then(deletedDriver => {
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
                console.log(`${deletedBus.data.name}: ${deletedBus.status}`)
                dispatch({type:'update'})
                navigate(-1)
            })
        })
    }
    
    const handleUpdate = () => {
        if(bus.name === '' || bus.driver === '') {
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
            console.log(`Bus: ${updatedBus.name} has been updated`)
            dispatch({type:'update'})
            navigate(-1)
        })
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
