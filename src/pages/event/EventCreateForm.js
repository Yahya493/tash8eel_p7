import Cookies from 'js-cookie'
import React, { useEffect, useState } from 'react'
import ReactModal from 'react-modal'
import { useDispatch, useSelector } from 'react-redux'
import './EventDetails.css'
import EventCreateBody from './components/EventCreateBody'
import EventCreateHeader from './components/EventCreateHeader'
import { saveEvent } from '../../actions/actions'

ReactModal.setAppElement('#root');

export default function EventCreateForm({ isAdding, exitAdding }) {

    const events = useSelector(state => state.events)
    const user = Cookies.get('user')
    const currentDate = new Date().toISOString().split('T')[0]
    const [newEvent, setNewEvent] = useState({buses: [], photos: []})

    const dispatch = useDispatch()

    const resetValues = () => {
        setNewEvent({
            ...newEvent,
            name: '',
            validFrom: currentDate,
            validTo: currentDate,
            departureTime: '07:00',
            arrivalTime: '18:00',
            departureLocation: '',
            arrivalLocation: '',
            trail: 'trail',
            buses: [],
            numberOfPerson: 30,
            duration: 60,
            photos: [],
            fees: 15,
            publishDate: currentDate,
            description: '',
            user: user,
        })
    }

    const closeModal = () => {
        exitAdding(false)
    };

    useEffect(() => {
        resetValues()
    }, [])


    const chechForm = () => {

        return true
    }

    const eventDataToSave = () => {
        return {
            ...newEvent,
            validFrom: `${newEvent.validFrom}T00:00:00.000Z`,
            validTo: `${newEvent.validTo}T00:00:00.000Z`,
            departureTime: `${newEvent.validFrom}T${newEvent.departureTime}:00.000Z`,
            arrivalTime: `${newEvent.validTo}T${newEvent.arrivalTime}:00.000Z`,
            publishDate: `${newEvent.publishDate}T00:00:00.000Z`,
        }
    }

    const handleSave = () => {
        if (!chechForm()) return

        saveEvent(dispatch, eventDataToSave(), events, closeModal)
        // console.log(eventDataToSave())
        // const api = getBaseUrl()
        // fetch(api + `/insertEvent`,
        //     {
        //         method: 'POST',
        //         headers: {
        //             'Content-Type': 'application/json',
        //         },
        //         body: JSON.stringify(eventDataToSave())
        //     })
        //     .then(res => res.json())
        //     .then(savedEvent => {
        //         dispatch({ type: 'setEvents', events: [savedEvent, ...events] })
        //         console.log(`Event: ${savedEvent.name} has been saved`)
        //         closeModal()
        //     })
    }

    const handleName = (e) => {
        setNewEvent({ ...newEvent, name: e.target.value })
    }

    const handleValidFrom = (e) => {
        setNewEvent({ ...newEvent, validFrom: e.target.value })
    }

    const handleValidTo = (e) => {
        setNewEvent({ ...newEvent, validTo: e.target.value })
    }

    const handleDepartureTime = (e) => {
        setNewEvent({ ...newEvent, departureTime: e.target.value })
    }

    const handleDepartureLocation = (e) => {
        setNewEvent({ ...newEvent, departureLocation: e.target.value })
    }

    const handleArrivalTime = (e) => {
        setNewEvent({ ...newEvent, arrivalTime: e.target.value })
    }

    const handleArrivalLocation = (e) => {
        setNewEvent({ ...newEvent, arrivalLocation: e.target.value })
    }

    const handleNumberOfPerson = (e) => {
        setNewEvent({ ...newEvent, numberOfPerson: e.target.value })
    }

    const handleDuration = (e) => {
        setNewEvent({ ...newEvent, duration: e.target.value })
    }

    const handleFees = (e) => {
        setNewEvent({ ...newEvent, fees: e.target.value })
    }

    const handlePublishDate = (e) => {
        setNewEvent({ ...newEvent, publishDate: e.target.value })
    }

    const handleDescription = (e) => {
        setNewEvent({ ...newEvent, description: e.target.value })
    }

    const handleBuses = (e, index) => {
        const newBuses = [...newEvent.buses]
        newBuses[index] = e.target.value
        setNewEvent({ ...newEvent, buses: newBuses })
    }


    return (
        <div>
            <ReactModal isOpen={isAdding} onRequestClose={closeModal} className='reactModal'>
                <EventCreateHeader
                    handleReset={resetValues}
                    handleSave={handleSave}
                    handleCancel={closeModal}
                />
                <EventCreateBody
                    event={newEvent}
                    handleName={handleName}
                    handleValidFrom={handleValidFrom}
                    handleValidTo={handleValidTo}
                    handleDepartureTime={handleDepartureTime}
                    handleDepartureLocation={handleDepartureLocation}
                    handleArrivalTime={handleArrivalTime}
                    handleArrivalLocation={handleArrivalLocation}
                    handleNumberOfPerson={handleNumberOfPerson}
                    handleDuration={handleDuration}
                    handleFees={handleFees}
                    handlePublishDate={handlePublishDate}
                    handleDescription={handleDescription}
                    handleBuses={handleBuses}
                    setEvent={setNewEvent}
                />
            </ReactModal>
        </div>
    )
}
