import React from 'react'
import { useSelector } from 'react-redux'

export default function Home() {

  const userName = useSelector(state => state.user.name)

  return (
    <div>
      <h1>{`Welcome ${userName}`}</h1>
    </div>
  )
}
