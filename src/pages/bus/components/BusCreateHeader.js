import React from 'react'

export default function EventCreateHeader({handleReset, handleSave, handleCancel}) {

  return (
    <div id='header'>
      <button onClick={handleCancel} className='btnCancel'>Cancel</button>
      <button onClick={handleReset} className='btnDelete'>Reset</button>
      <button onClick={handleSave}>Save</button>
    </div>
  )
}
