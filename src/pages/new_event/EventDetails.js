import React, { useEffect, useState } from 'react'
import ReactModal from 'react-modal'
import { useDispatch, useSelector } from 'react-redux'
import { deleteEvent, getEventById, updateEvent } from '../../actions/actions'
import EventDetailsBody from './components/EventDetailsBody'
import EventDetailsHeader from './components/EventDetailsHeader'
import './EventDetails.css'

ReactModal.setAppElement('#root');

export default function EventDetails({ id, isEditing, exitEditing }) {

    const events = useSelector(state => state.events)
    const [event, setEvent] = useState({ buses: [], photos: [] })
    const dispatch = useDispatch()

    const [nameVald, setNameVald] = useState('*')
    const [validFromVald, setValidFromVald] = useState('*')
    const [validToVald, setValidToVald] = useState('*')
    const [publishDateVald, setPublishDateVald] = useState('*')
    const [departureLocationVald, setDepartureLocationVald] = useState('*')
    const [arrivalLocatioVald, setArrivalLocatioVald] = useState('*')
    const [trailVald, setTrailVald] = useState('*')
    const [busesVald, setBusesVald] = useState('*')

    const closeModal = () => {
        exitEditing(false)
    };

    useEffect(() => {
        getEventById(id, setEvent)
    }, [id])

    const handleDelete = () => {
        deleteEvent(dispatch, event, events, closeModal)
    }

    const chechForm = () => {
        setNameVald('*')
        setValidFromVald('*')
        setValidToVald('*')
        setPublishDateVald('*')
        setDepartureLocationVald('*')
        setArrivalLocatioVald('*')
        setTrailVald('*')
        setBusesVald('*')

        let valide = true
        // const today = new Date().toISOString().split('T')[0]

        if(event.name === '') {
            setNameVald('required')
            valide = false
        }
        // if(event.validFrom < today) {
        //     setValidFromVald("Can't be less than today")
        //     valide = false
        // }
        if(event.validTo < event.validFrom) {
            setValidToVald("Can't be less than valide from")
            valide = false
        }
        // if(event.publishDate < today) {
        //     setPublishDateVald("Can't be less than today")
        //     valide = false
        // }
        if(event.departureLocation === '') {
            setDepartureLocationVald('required')
            valide = false
        }
        if(event.arrivalLocation === '') {
            setArrivalLocatioVald('required')
            valide = false
        }
        if(event.trail === '') {
            setTrailVald('required')
            valide = false
        }
        if(event.buses[0] === '') {
            setBusesVald('required')
            valide = false
        }

        return valide
    }

    const eventDataToUpload = () => {
        return {
            ...event,
            validFrom: `${event.validFrom}T00:00:00.000Z`,
            validTo: `${event.validTo}T00:00:00.000Z`,
            departureTime: `${event.validFrom}T${event.departureTime}:00.000Z`,
            arrivalTime: `${event.validTo}T${event.arrivalTime}:00.000Z`,
            publishDate: `${event.publishDate}T00:00:00.000Z`,
        }
    }

    const handleUpdate = () => {
        if (!chechForm()) return

        updateEvent(dispatch, eventDataToUpload(), events, closeModal)
    }

    const handleName = (e) => {
        setEvent({ ...event, name: e.target.value })
    }

    const handleValidFrom = (e) => {
        setEvent({ ...event, validFrom: e.target.value })
    }

    const handleValidTo = (e) => {
        setEvent({ ...event, validTo: e.target.value })
    }

    const handleDepartureTime = (e) => {
        setEvent({ ...event, departureTime: e.target.value })
    }

    const handleDepartureLocation = (e) => {
        setEvent({ ...event, departureLocation: e.target.value })
    }

    const handleArrivalTime = (e) => {
        setEvent({ ...event, arrivalTime: e.target.value })
    }

    const handleArrivalLocation = (e) => {
        setEvent({ ...event, arrivalLocation: e.target.value })
    }

    const handleNumberOfPerson = (e) => {
        setEvent({ ...event, numberOfPerson: +e.target.value })
    }

    const handleDuration = (e) => {
        setEvent({ ...event, duration: +e.target.value })
    }

    const handleFees = (e) => {
        setEvent({ ...event, fees: +e.target.value })
    }

    const handlePublishDate = (e) => {
        setEvent({ ...event, publishDate: e.target.value })
    }

    const handleDescription = (e) => {
        setEvent({ ...event, description: e.target.value })
    }

    const handleBuses = (e, index) => {
        const newBuses = [...event.buses]
        newBuses[index] = e.target.value
        setEvent({ ...event, buses: newBuses })
    }

    const handleTrail = (e) => {
        setEvent({ ...event, trail: e.target.value })
    }

    return (
        <div className='eventDetails'>
            <ReactModal isOpen={isEditing} onRequestClose={closeModal} className='eventModal' shouldCloseOnOverlayClick={false}>
                <EventDetailsHeader
                    handleUpdate={handleUpdate}
                    handleDelete={handleDelete}
                    handleCancel={closeModal}
                />
                <EventDetailsBody
                    event={event}
                    handleName={handleName}
                    nameVald={nameVald}
                    handleValidFrom={handleValidFrom}
                    validFromVald={validFromVald}
                    handleValidTo={handleValidTo}
                    validToVald={validToVald}
                    handleDepartureTime={handleDepartureTime}
                    handleDepartureLocation={handleDepartureLocation}
                    departureLocationVald={departureLocationVald}
                    handleArrivalTime={handleArrivalTime}
                    handleArrivalLocation={handleArrivalLocation}
                    arrivalLocatioVald={arrivalLocatioVald}
                    handleNumberOfPerson={handleNumberOfPerson}
                    handleDuration={handleDuration}
                    handleFees={handleFees}
                    handlePublishDate={handlePublishDate}
                    publishDateVald={publishDateVald}
                    handleDescription={handleDescription}
                    handleBuses={handleBuses}
                    handleTrail={handleTrail}
                    busesVald={busesVald}
                    trailVald={trailVald}
                    setEvent={setEvent}
                    
                />
            </ReactModal>
        </div>
    )
}
