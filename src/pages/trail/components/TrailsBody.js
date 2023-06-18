import { AgGridReact } from 'ag-grid-react'
import React, { useMemo, useState } from 'react'
import TrailDetails from '../TrailDetails'

export default function TrailsBody({trails}) {

  const [trailId, setTrailId] = useState('')
  const [isEditing, setIsEditing] = useState(false)

  const columnDefs = [
    {
      field: 'name',
      flex: 2,
    },
    {
      field: 'distance',
      flex: 1,
      valueFormatter: p => p.value + ' km'
    },
    {
      field: 'minHeight',
      flex: 1,
      valueFormatter: p => p.value + ' m'
    },
    {
      field: 'maxHeight',
      flex: 1,
      valueFormatter: p => p.value + ' m'
    },
    {
      field: 'difficulty',
      flex: 1
    },
    {
      field: 'description',
      flex: 3,
    }
  ]

  const defaultColDef = useMemo(() => (
    {
      resizable: true,
      sortable: true,
      // width: 170,
      
    }
  ), [])

  const handleRowDoubleClick = (e) => {
    // console.log(e)
    // console.log(e.data._id)
    // navigate(`/buses/${e.data._id}`)

    setTrailId(e.data._id)
    setIsEditing(true)
  }

  return (
    <div id='trailPageBody' className="ag-theme-alpine" >
      {isEditing?<TrailDetails id={trailId} isEditing={isEditing} exitEditing={setIsEditing}/>:null}
      <AgGridReact
        defaultColDef={defaultColDef}
        columnDefs={columnDefs}
        rowData={trails.filter(trail => trail._id !== '')}
        onRowDoubleClicked={handleRowDoubleClick}
        // onCellMouseOver={handleMouseOver}
        animateRows={true}
      />
    </div>
  )
}
