import React from 'react'
import BusDetailsBody from './BusDetailsBody'

function BusCreateForm(Component) {
    return function BusCreateForm(props) {
        return <div >
            New Driver:
            <Component {...props} />
            
        </div>
    }
}


export default BusCreateForm(BusDetailsBody);
