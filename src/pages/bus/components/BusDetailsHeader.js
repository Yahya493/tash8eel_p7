import React from 'react'

export default function BusDetailsHeader({ handleCancel, handleDelete, handleUpdate }) {

  return (
    <div className='header'>
      <button onClick={handleCancel} className='btnCancel'>Cancel</button>
      <button onClick={handleDelete} className='btnDelete'>Delete</button>
      <button onClick={handleUpdate}>Update</button>
    </div>
  )
}
