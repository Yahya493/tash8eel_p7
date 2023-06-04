import { getBaseUrl } from './urlService'

const getEvents = (dispatch, id) => {
    const api = `${getBaseUrl()}/events?user`
    fetch(api + "=" + id)
        .then(res => res.json())
        .then(events => {
            dispatch({ type: 'setEvents', events: events })
        })
}


const getBuses = (dispatch, id) => {
    const api = `${getBaseUrl()}/buses?user`
    fetch(api + "=" + id)
        .then(res => res.json())
        .then(buses => {
            dispatch({ type: 'setBuses', buses: buses })
        })
}

const getDrivers = (dispatch, id) => {
    const api = `${getBaseUrl()}/drivers?user`
    fetch(api + "=" + id)
        .then(res => res.json())
        .then(drivers => {
            drivers = [{ _id: '', name: '__Select__', phone: '', user: '' }, ...drivers]
            dispatch({ type: 'setDrivers', drivers: drivers })
        })
        .catch(error => console.error("Error: " + error))
}

export { getEvents, getBuses, getDrivers }