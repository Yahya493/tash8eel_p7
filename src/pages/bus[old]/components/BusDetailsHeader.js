import React from 'react'

export default function BusDetailsHeader({handleDelete, handleUpdate}) {

  return (
    <div id='header'>
      <button onClick={handleDelete} className='btnDelete'>Delete</button>
      <button onClick={handleUpdate}>Update</button>
    </div>
  )
}
