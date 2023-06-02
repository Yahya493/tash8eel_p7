import React, { useEffect } from 'react'
import BusPageHeader from './components/BusPageHeader'
import BusPageBody from './components/BusPageBody'
import './BusPage.css'
import { useSelector } from 'react-redux'
import { useState } from 'react'
import BusCreateForm from './components/BusCreateForm'

export default function BusPage() {

  const user = useSelector(state => state.user)
  const buses = useSelector(state => state.buses)
  const drivers = useSelector(state => state.drivers)
  const [isAdding, setIsAdding] = useState(false)

  const [newBus, setNewBus] = useState({ name: '', driver: '', seats: 30, description: '', user: user._id })
  const [newDriver, setNewDriver] = useState({ name: '', phone: '', user: user._id })


  const handleSearch = () => {

  }

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
      name: '',
      phone: ''
    })
  }

  const handleNew = () => {
    resetValues()
    setIsAdding(!isAdding)
  }

  const checkForm = () => {
    if (newBus.name === '') {
      console.log("Bus name shouldn't be empty!")
      return false
    }
    if (newBus.driver === '' && newDriver.name === '') {
      console.log('Select a driver!')
      return false
    }

    return true
  }

  const handleSave = () => {
    // console.log('Save cliked')
    if (checkForm()) {
      console.log(`Save bus: ${JSON.stringify(newBus)} driver: ${JSON.stringify(newDriver)}`)
      ///Save
      setIsAdding(false)
    }
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
    <div>
      <BusPageHeader
        isAdding={isAdding}
        handleNew={handleNew}
        handleSearch={handleSearch}
        handleSave={handleSave}
      />
      {isAdding ? <BusCreateForm
        bus={newBus}
        driver={newDriver}
        handleName={handleName}
        handleDriver={handleDriver}
        handleDriverName={handleDriverName}
        handleDriverPhone={handleDriverPhone}
        handleSeats={handleSeats}
        handleDescription={handleDescription}
      /> : null}
      <BusPageBody buses={buses} />
    </div>
  )
}
