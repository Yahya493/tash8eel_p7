import React from 'react'

export default function BusPageHeader({ handleNew, handleSearch}) {
 
  return (
    <div id='header'>
      <input id='search' type='text' placeholder='Search...' onChange={handleSearch}/>
      <button onClick={handleNew}>New</button>
    </div>
  )
}
