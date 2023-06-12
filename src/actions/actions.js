import { useSelector } from 'react-redux'
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
        body: JSON.stringify({ user: userId })
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
        body: JSON.stringify({ user: userId })
    })
        .then(res => res.json())
        .then(drivers => {
            drivers = [{ _id: '', name: '__Select__', phone: '', user: '' }, ...drivers]
            dispatch({ type: 'setDrivers', drivers: drivers })
        })
        .catch(error => console.error("Error: " + error))
}

const updateEvent = (dispatch, event, events, closeModal) => {
    const api = getBaseUrl()
    fetch(api + `/updateEvent`,
        {
            method: 'PATCH',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(event)
        })
        .then(res => res.json())
        .then(updatedEvent => {
            dispatch({ type: 'setEvents', events: [updatedEvent, ...events.filter(events => events._id !== updatedEvent._id)] })
            console.log(`Event: ${updatedEvent.name} has been updated`)
            closeModal()
        })
}

const deleteEvent = (dispatch, event, events, closeModal) => {
    const api = getBaseUrl()
    fetch(api + `/deleteEvent/${event._id}`, {
        method: 'DELETE',
        headers: {
            'Content-Type': 'application/json',
        },
    })
        .then(res => res.json())
        .then(deletedEvent => {
            dispatch({ type: 'setEvents', events: events.filter(events => events._id !== event._id) })
            console.log(`${deletedEvent.data.name}: ${deletedEvent.status}`)
            closeModal()
        })
}

const getEventById = (id, setEvent) => {
    const api = getBaseUrl()
    fetch(api + "/events", {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify({ _id: id })
    })
        .then(res => res.json())
        .then(event => {
            setEvent({
                ...event,
                validFrom: event.validFrom.substring(0, 10),
                validTo: event.validTo.substring(0, 10),
                departureTime: event.departureTime.substring(11, 16),
                arrivalTime: event.arrivalTime.substring(11, 16),
                publishDate: event.publishDate.substring(0, 10),
            })
        })
}

const saveEvent = (dispatch, event, events, closeModal) => {
    const api = getBaseUrl()
    fetch(api + `/insertEvent`,
        {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(event)
        })
        .then(res => res.json())
        .then(savedEvent => {
            dispatch({ type: 'setEvents', events: [savedEvent, ...events] })
            console.log(`Event: ${savedEvent.name} has been saved`)
            closeModal()
        })
}

const getBusById = (id, setBus, setDriver) => {
    const api = getBaseUrl()
    fetch(api + "/buses", {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify({ _id: id })
    })
        .then(res => res.json())
        .then(bus => {
            fetch(api + "/drivers", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify({ _id: bus.driver })
            })
                .then(res => res.json())
                .then(driver => {
                    setBus(bus)
                    setDriver(driver)
                })
        })
}

const deleteBus = (dispatch, bus, buses, drivers, closeModal) => {
    const busInit = buses.find(item => item._id === bus._id)
    const api = getBaseUrl()
    fetch(api + '/buses' /*`/busesByDriver?user=${busInit.user}&driver=${busInit.driver}`*/, {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify({ user: busInit.user, driver: busInit.driver })
    })
        .then(res => res.json())
        .then(busArray => {
            if (busArray.length === 1) {
                fetch(api + `/deleteDriver/${busInit.driver}`, {
                    method: 'DELETE',
                    headers: {
                        'Content-Type': 'application/json',
                    },
                })
                    .then(res => res.json())
                    .then(deletedDriver => {
                        dispatch({ type: 'setDrivers', drivers: drivers.filter(driver => driver._id !== deletedDriver.data._id) })
                        console.log(`${deletedDriver.data.name}: ${deletedDriver.status}`)
                    })
            }
            fetch(api + `/deleteBus/${busInit._id}`, {
                method: 'DELETE',
                headers: {
                    'Content-Type': 'application/json',
                },
            })
                .then(res => res.json())
                .then(deletedBus => {
                    dispatch({ type: 'setBuses', buses: buses.filter(buses => buses._id !== deletedBus.data._id) })
                    console.log(`${deletedBus.data.name}: ${deletedBus.status}`)
                    // dispatch({type:'update'})
                    closeModal()
                })
        })
}

const updateBus = (dispatch, bus, buses, closeModal) => {
    const api = getBaseUrl()
    if (bus.name === '' || bus.driver === '') {
        console.log("Bus name and driver shoudn't be empty!")
        return
    }
    fetch(api + "/updateBus",
        {
            method: 'PATCH',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(bus)
        })
        .then(res => res.json())
        .then(updatedBus => {
            dispatch({ type: 'setBuses', buses: [updatedBus, ...buses.filter(buses => buses._id !== updatedBus._id)] })
            console.log(`Bus: ${updatedBus.name} has been updated`)
            // dispatch({type:'update'})
            closeModal()
        })
}

const saveBus = (dispatch, bus, /*driver,*/ buses, /*drivers,*/ closeModal) => {
    const api = getBaseUrl()
    // try {
    //     fetch(api + '/insertDriver', {
    //         method: 'POST',
    //         headers: {
    //             'Content-Type': 'application/json',
    //         },
    //         body: JSON.stringify(driver)
    //     })
    //         .then(res => res.json())
    //         .then(driverRes => {
    //             // setNewDriver(driverRes)
    //             dispatch({ type: 'setDrivers', drivers: [...drivers, driverRes] })
    try {
        fetch(api + '/insertBus', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(bus/*{ ...bus, driver: driverRes._id }*/)
        })
            .then(res => res.json())
            .then(busRes => {
                console.log(busRes)
                dispatch({ type: 'setBuses', buses: [busRes, ...buses] })
                closeModal()
            })
    }
    catch (error) {
        console.error('Error:', error)
    }
    //         })
    // }
    // catch (error) {
    //     console.error("Error: " + error)
    // }
}

const saveDriver = (dispatch, driver, drivers) => {
    const api = getBaseUrl()
    try {
        fetch(api + '/insertDriver', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(driver)
        })
            .then(res => res.json())
            .then(driverRes => {
                // setNewDriver(driverRes)
                dispatch({ type: 'setDrivers', drivers: [...drivers, driverRes] })
            })
    }
    catch (error) {
        console.error("Error: " + error)
    }
}

export {
    getEvents,
    getBuses,
    getDrivers,
    updateEvent,
    deleteEvent,
    getEventById,
    saveEvent,
    getBusById,
    deleteBus,
    updateBus,
    saveBus,
    saveDriver,
}