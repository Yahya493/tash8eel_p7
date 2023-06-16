import React from 'react'

export default function MilestoneDetailsHeader(handleSearch, handleNew) {
  return (
    <div className='header'>
      <input id='search' type='text' placeholder='Search...' onChange={handleSearch}/>
      <button onClick={handleNew}>New</button>
    </div>
  )
}
