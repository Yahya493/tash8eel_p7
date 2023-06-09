import { AgGridReact } from 'ag-grid-react';
import React, { useMemo } from 'react';
import { useState } from 'react';
import { useSelector } from 'react-redux'
import BusDetails from '../BusDetails';

export default function BusPageBody({ buses }) {

  const [isEditing, setIsEditing] = useState(false)
  const [busId, setBusId] = useState()

  const drivers = useSelector(state => state.drivers)

  const driverInfo = (key) => {
    if (key === 'name')
      return p => {
        const driver = drivers.find(dr => dr._id === p.data.driver)
        return driver?driver.name:''
      }
    if (key === 'phone')
      return p => {
        const driver = drivers.find(dr => dr._id === p.data.driver)
        return driver?driver.phone:''
      }
  }

  const columnDefs = [
    {
      field: 'name',
      flex: 1,
    },
    {
      field: 'driver',
      flex: 1,
      valueGetter: driverInfo('name')
    },
    {
      headerName: 'Phone',
      field: 'driver',
      flex: 1,
      valueGetter: driverInfo('phone')
    },
    {
      field: 'seats',
      flex:1,
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
    setBusId(e.data._id)
    setIsEditing(true)
  }

  const handleMouseOver = (e) => {
    // const key = e.column.colId
    // console.log(e.value)
  }

  return (
    <div id='busPageBody' className="ag-theme-alpine" /*style={{ height: '83vh', width: '100%' }}*/>
      {isEditing?<BusDetails id={busId} isEditing={isEditing} exitEditing={setIsEditing}/>:null}
      <AgGridReact
        defaultColDef={defaultColDef}
        columnDefs={columnDefs}
        rowData={buses.filter(bus => bus._id !== '')}
        onRowDoubleClicked={handleRowDoubleClick}
        onCellMouseOver={handleMouseOver}
      />
      {/* {buses.map(bus => <div className='busCard' key={bus._id}>
        <Link to={`/buses/${bus._id}`}>
          <h5>{bus.name}</h5>
          <div>
            Seats: {bus.seats}<br />
            Description: {bus.description}
          </div>
        </Link>
      </div>)} */}
    </div>
  )
}
