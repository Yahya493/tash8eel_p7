import React from 'react'

export default function MilestonesHeader({ handleSearch, handleNew, trails, trailId ,handleTrail }) {

  return (
    <div className='header'>
      <div id="milestoneTrailSelect">
        <label >Trail: </label>
        <select onChange={handleTrail} value={trailId}>
          {trails.map(trail => <option key={trail._id} value={trail._id} >{trail.name}</option>)}
        </select>
      </div>
      <input id='search' type='text' placeholder='Search...' onChange={handleSearch} />
      <button onClick={handleNew}>New</button>
    </div>
  )
}