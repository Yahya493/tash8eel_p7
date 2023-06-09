import React, { useEffect } from 'react'
import BusPageHeader from './components/BusPageHeader'
import BusPageBody from './components/BusPageBody'
import './BusPage.css'
import { useDispatch, useSelector } from 'react-redux'
import { useState } from 'react'
import BusCreateForm from './BusCreateForm'
import { getBuses, getDrivers } from '../../actions/actions'
import Cookies from 'js-cookie'

export default function BusPage() {

  const user = Cookies.get('user')
  const buses = useSelector(state => state.buses)
  const drivers = useSelector(state => state.drivers)
  const [isAdding, setIsAdding] = useState(false)
  const [query, setQuery] = useState('')
  const dispatch = useDispatch()
  // const [newBus, setNewBus] = useState({ name: '', driver: '', seats: 30, description: '', user: user })
  // const [newDriver, setNewDriver] = useState({ name: '', phone: '', user: user })

  useEffect(() => {
    if (buses.length === 0) {
      getBuses(dispatch, user)
    }
    getDrivers(dispatch, user)
  }, [])

  const handleNew = () => {
    setIsAdding(true)
  }

  const exitAdding = () => {
    setIsAdding(false)
  }

  const handleSearch = (e) => {
    setQuery(e.target.value)
  }

  const contains = (bus, str) => {
    str = str.toLowerCase()
    const busDriver = drivers.find(driver => driver._id === bus.driver)
    return bus.name.toLowerCase().includes(str) ||
      bus.seats + '' === str ||
      bus.description.toLowerCase().includes(str) ||
      busDriver.name.toLowerCase().includes(str) ||
      busDriver.phone.includes(str)
  }

  return (
    <div>
      <BusPageHeader
        handleNew={handleNew}
        handleSearch={handleSearch}
      />
      {isAdding ? <BusCreateForm
        isAdding={isAdding}
        exitAdding={exitAdding}
      /> : null}
      <BusPageBody buses={buses.filter(bus => contains(bus, query))} />
    </div>
  )
}
