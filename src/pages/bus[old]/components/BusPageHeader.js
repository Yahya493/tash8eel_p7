import React from 'react'

export default function BusPageHeader({isAdding, handleNew, handleSearch, handleSave}) {

  return (
    <div id='header'>
      <input id='search' type='text' placeholder='Search...' onChange={handleSearch}/>
      <button className={isAdding?'btnCancel':''} onClick={handleNew}>{isAdding?'Cancel':'New'}</button>
      {isAdding?<button onClick={handleSave}>Save</button>:null}
    </div>
  )
}
