import { getBaseUrl } from './urlService'

const getEvents = (dispatch, userId) => {
    const api = `${getBaseUrl()}/events`
    fetch(api, {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify({ user: userId })
    })
        .then(res => res.json())
        .then(events => {
            dispatch({ type: 'setEvents', events: events })
        })
}


const getBuses = (dispatch, userId) => {
    const api = `${getBaseUrl()}/buses`
    fetch(api, {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify({user: userId})
    })
        .then(res => res.json())
        .then(buses => {
            buses = [{ _id: '', name: '__Select__', driver: '', description: '', user: '' }, ...buses]
            dispatch({ type: 'setBuses', buses: buses })
        })
}

const getDrivers = (dispatch, userId) => {
    const api = `${getBaseUrl()}/drivers`
    fetch(api, {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify({user: userId})
    })
        .then(res => res.json())
        .then(drivers => {
            drivers = [{ _id: '', name: '__Select__', phone: '', user: '' }, ...drivers]
            dispatch({ type: 'setDrivers', drivers: drivers })
        })
        .catch(error => console.error("Error: " + error))
}

export { getEvents, getBuses, getDrivers }