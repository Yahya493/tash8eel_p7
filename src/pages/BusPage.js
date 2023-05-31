import React, { useEffect } from 'react'
import BusPageHeader from '../components/BusPageHeader'
import BusPageBody from '../components/BusPageBody'
import '../styles/BusPage.css'
import { useDispatch, useSelector } from 'react-redux'

export default function BusPage() {

  const api = useSelector(state => state.api)
  const user = useSelector(state => state.user._id)
  const dispatch = useDispatch()
  const buses = useSelector(state => state.buses)

  useEffect(() => {
    fetch(api + "/buses?user=" + user)
    .then(res => res.json())
    .then(buses => {
      console.log(buses)
      dispatch({type: 'setBuses', buses: buses})
    })
  },[])

  return (
    <div>
        <BusPageHeader />
        <BusPageBody buses={buses}/>
    </div>
  )
}
