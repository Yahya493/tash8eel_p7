import { AgGridReact } from 'ag-grid-react'
import React from 'react'
import { useMemo } from 'react'
import { useState } from 'react'
import MilestoneDetails from '../MilestoneDetails'

export default function MilestonesBody({milestones , setMilestones}) {

  const [milestoneId, setMilestoneId] = useState('')
  const [isEditing, setIsEditing] = useState(false)

  const columnDefs = [
    {
      field: 'name',
      flex: 2,
    },
    {
      field: 'location',
      flex: 1
    },
    {
      field: 'photos',
      flex: 1,
      valueFormatter: p => p.value.length
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

    setMilestoneId(e.data._id)
    setIsEditing(true)
  }

  return (
    <div id='milestonePageBody' className="ag-theme-alpine" >
      {isEditing?<MilestoneDetails id={milestoneId} isEditing={isEditing} milestones={milestones} setMilestones={setMilestones} exitEditing={setIsEditing}/>:null}
      <AgGridReact
        defaultColDef={defaultColDef}
        columnDefs={columnDefs}
        rowData={milestones.filter(milestone => milestone._id !== '')}
        onRowDoubleClicked={handleRowDoubleClick}
        // onCellMouseOver={handleMouseOver}
        animateRows={true}
      />
    </div>
  )
}
