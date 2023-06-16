import React, { useEffect, useState } from 'react'
import ReactModal from 'react-modal'
import { useDispatch, useSelector } from 'react-redux'
import { deleteTrail, getTrailById, updateTrail } from '../../actions/actions'
import TrailDetailsBody from './components/TrailDetailsBody'
import TrailDetailsHeader from './components/TrailDetailsHeader'
import './trailDetails.css'

ReactModal.setAppElement('#root');

export default function TrailDetails({ id, isEditing, exitEditing }) {
    const [trail, setTrail] = useState({})
    const trails = useSelector(state => state.trails)
    const dispatch = useDispatch()

    const [trailNameVald, setTrailNameVal] = useState('*')

    const closeModal = () => {
        exitEditing(false)
    };

    useEffect(() => {
        getTrailById(id, setTrail)
    }, [])

    const handleDelete = () => {
        deleteTrail(dispatch, trail, trails, closeModal)
    }

    const checkTrailForm = () => {
        setTrailNameVal('*')
        let valide = true

        if (trail.name === '') {
            setTrailNameVal('required')
            valide = false
        }

        return valide
    }

    const handleUpdate = () => {
        if(!checkTrailForm()) return

        updateTrail(dispatch, trail, trails, closeModal)
    }

    const handleName = (e) => {
        setTrail({ ...trail, name: e.target.value })
    }

    const handleDescription = (e) => {
        setTrail({ ...trail, description: e.target.value })
    }

    return (
        <div  className='trailDetails'>
            <ReactModal isOpen={isEditing} onRequestClose={closeModal} className='trailModal' shouldCloseOnOverlayClick={false}>
                <TrailDetailsHeader handleUpdate={handleUpdate} handleDelete={handleDelete} handleCancel={closeModal} />
                <TrailDetailsBody
                    trail={trail}
                    handleName={handleName}
                    handleDescription={handleDescription}
                    trailNameVald={trailNameVald}
                />
            </ReactModal>
        </div>
    )
}
