import { AgGridReact } from 'ag-grid-react';
import React, { useMemo } from 'react';
import { useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom';

export default function BusPageBody({ buses }) {

  const drivers = useSelector(state => state.drivers)
  const navigate = useNavigate()

  const columnDefs = [
    {
      field: 'name',
      flex: 1
    },
    {
      field: 'driver',
      flex:1,
      valueGetter: p => {
        const driver = drivers.find(dr => dr._id === p.data.driver)
        return driver.name
      }
    },
    {
      headerName: 'Phone',
      field: 'driver',
      flex:1,
      valueGetter: p => {
        const driver = drivers.find(dr => dr._id === p.data.driver)
        return driver.phone
      }
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
    navigate(`/buses/${e.data._id}`)
  }

  const handleMouseOver = (e) => {
    // const key = e.column.colId
    // console.log(e.value)
  }

  return (
    <div id='busPageBody' className="ag-theme-alpine" style={{ height: '400px', width: '100%' }}>
      <AgGridReact
        defaultColDef={defaultColDef}
        columnDefs={columnDefs}
        rowData={buses}
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
