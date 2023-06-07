import React from 'react'
import EventDetailsBody from './EventDetailsBody'

function EventCreateForm(Component) {
    return function EventCreateForm(props) {
        return <div >
            New Event:
            <Component {...props} />
            
        </div>
    }
}


export default EventCreateForm(EventDetailsBody);
