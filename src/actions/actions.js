import { useSelector } from 'react-redux'
import { getBaseUrl } from './urlService'

const getEvents = (dispatch, userId) => {
    const api = `${getBaseUrl()}/events`
    fetch(api, {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
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
            if (deletedEvent.status !== 'deleted') {
                console.log(`${event.name}: ${deletedEvent.status}`)
                return
            }
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
                        if (deletedDriver.status !== 'deleted') {
                            // console.log(`${busInit.driver.name}: ${deletedDriver.status}`)
                            return
                        }
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
                    if (deletedBus.status !== 'deleted') {
                        // console.log(`${trail.name}: ${deletedBus.status}`)
                        return
                    }
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

const getTrails = (dispatch, userId) => {
    const api = `${getBaseUrl()}/trails`
    fetch(api, {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify({ user: userId })
    })
        .then(res => res.json())
        .then(trails => {
            trails = [{ _id: '', name: '__Select__', distance: '', user: '', description: '' }, ...trails]
            dispatch({ type: 'setTrails', trails: trails })
        })
        .catch(error => console.error("Error: " + error))
}

const getTrailById = (trailId, setTrail) => {
    const api = `${getBaseUrl()}/trails`
    fetch(api, {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify({ _id: trailId })
    })
        .then(res => res.json())
        .then(trail => {
            setTrail(trail)
        })
        .catch(error => console.error("Error: " + error))
}

const deleteTrail = (dispatch, trail, trails, closeModal) => {
    const api = getBaseUrl()
    fetch(api + `/deleteTrail`, {
        method: 'DELETE',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({ _id: trail._id })
    })
        .then(res => res.json())
        .then(deletedTrail => {
            if (deletedTrail.status !== 'deleted') {
                console.log(`${trail.name}: ${deletedTrail.status}`)
                return
            }
            dispatch({ type: 'setTrails', trails: trails.filter(trails => trails._id !== trail._id) })
            console.log(`${deletedTrail.data.name}: ${deletedTrail.status}`)
            closeModal()
        })
}

const updateTrail = (dispatch, trail, trails, closeModal) => {
    const api = getBaseUrl()
    fetch(api + `/updateTrail`,
        {
            method: 'PATCH',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(trail)
        })
        .then(res => res.json())
        .then(updatedTrail => {
            dispatch({ type: 'setTrails', trails: [updatedTrail, ...trails.filter(trail => trail._id !== updatedTrail._id)] })
            console.log(`Trail: ${updatedTrail.name} has been updated`)
            closeModal()
        })
}

const saveTrail = (dispatch, trail, trails, closeModal) => {
    const api = getBaseUrl()
    fetch(api + `/insertTrail`,
        {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(trail)
        })
        .then(res => res.json())
        .then(savedTrail => {
            dispatch({ type: 'setTrails', trails: [...trails, savedTrail] })
            console.log(`Trail: ${savedTrail.name} has been saved`)
            closeModal()
        })
}

//
const getMilestones = (setMilestones, trailId) => {
    const api = `${getBaseUrl()}/milestones`
    fetch(api, {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify({ trail: trailId })
    })
        .then(res => res.json())
        .then(milestones => {
            milestones = [{ _id: '', name: '__Select__', photos: [], trail: '', description: '' }, ...milestones]
            // dispatch({ type: 'setMilestones', milestones: milestones })
            setMilestones(milestones)
        })
        .catch(error => console.error("Error: " + error))
}

const getMilestoneById = (milestoneId, setMilestone) => {
    const api = `${getBaseUrl()}/milestones`
    fetch(api, {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify({ _id: milestoneId })
    })
        .then(res => res.json())
        .then(milestone => {
            setMilestone(milestone)
        })
        .catch(error => console.error("Error: " + error))
}

const deleteMilestone = (milestone, milestones, setMilestone, closeModal) => {
    const api = getBaseUrl()
    fetch(api + `/deleteMilestone`, {
        method: 'DELETE',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({ _id: milestone._id })
    })
        .then(res => res.json())
        .then(deletedMilestone => {
            if (deletedMilestone.status !== 'deleted') {
                console.log(`${milestone.name}: ${deletedMilestone.status}`)
                return
            }
            // dispatch({ type: 'setMilestones', milestones: milestones.filter(milestones => milestones._id !== milestone._id) })
            setMilestone(milestones.filter(milestones => milestones._id !== milestone._id))
            console.log(`${deletedMilestone.data.name}: ${deletedMilestone.status}`)
            closeModal()
        })
}

const updateMilestone = (milestone, milestones, setMilestones, closeModal) => {
    const api = getBaseUrl()
    fetch(api + `/updateMilestone`,
        {
            method: 'PATCH',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(milestone)
        })
        .then(res => res.json())
        .then(updatedMilestone => {
            // dispatch({ type: 'setMilestones', milestones: [updatedMilestone, ...milestones.filter(milestone => milestone._id !== updatedMilestone._id)]})
            setMilestones([updatedMilestone, ...milestones.filter(milestone => milestone._id !== updatedMilestone._id)])
            console.log(`Milestone: ${updatedMilestone.name} has been updated`)
            closeModal()
        })
}

const saveMilestone = (milestone, milestones, setMilestones, closeModal) => {
    const api = getBaseUrl()
    fetch(api + `/insertMilestone`,
        {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(milestone)
        })
        .then(res => res.json())
        .then(savedMilestone => {
            // dispatch({ type: 'setMilestones', milestones: [savedMilestone, ...milestones] })
            setMilestones([savedMilestone, ...milestones])
            console.log(`Milestone: ${savedMilestone.name} has been saved`)
            closeModal()
        })
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
    getTrails,
    getTrailById,
    deleteTrail,
    updateTrail,
    saveTrail,
    getMilestones,
    getMilestoneById,
    updateMilestone,
    saveMilestone,
    deleteMilestone,
}