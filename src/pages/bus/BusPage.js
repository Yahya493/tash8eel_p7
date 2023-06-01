import React, { useEffect } from 'react'
import BusPageHeader from './components/BusPageHeader'
import BusPageBody from './components/BusPageBody'
import './BusPage.css'
import {  useSelector } from 'react-redux'

export default function BusPage() {

  const buses = useSelector(state => state.buses)

  useEffect(() => {
   
  },[])

  return (
    <div>
        <BusPageHeader />
        <BusPageBody buses={buses}/>
    </div>
  )
}
