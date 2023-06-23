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
    const [distanceVald, setDistanceVald] = useState('*')
    const [minHeightVald, setMinHeightVald] = useState('*')
    const [maxHeightVald, setMaxHeightVald] = useState('*')

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
        setDistanceVald('*')
        setMinHeightVald('*')
        setMaxHeightVald('*')
        let valide = true

        if (trail.name === '') {
            setTrailNameVal('required')
            valide = false
        }

        if (trail.distance <= 0) {
            setDistanceVald('required')
            valide = false
        }

        if (trail.minHeight < 0) {
            setMinHeightVald('required')
            valide = false
        }

        if (trail.maxHeight <= 0) {
            setMaxHeightVald('required')
            valide = false
        }

        if (trail.maxHeight < trail.minHeight) {
            setMaxHeightVald("Can't be less than min height")
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

    const handleDifficulty = (e) => {
        setTrail({ ...trail, difficulty: e.target.value })
    }

    const handleDistance = (e) => {
        setTrail({ ...trail, distance: +e.target.value })
    }

    const handleMinHeight = (e) => {
        setTrail({ ...trail, minHeight: +e.target.value })
    }

    const handleMaxHeight = (e) => {
        setTrail({ ...trail, maxHeight: +e.target.value })
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
                    handleDifficulty={handleDifficulty}
                    handleDistance={handleDistance}
                    handleMinHeight={handleMinHeight}
                    handleMaxHeight={handleMaxHeight}
                    handleDescription={handleDescription}
                    trailNameVald={trailNameVald}
                    distanceVald={distanceVald}
                    minHeightVald={minHeightVald}
                    maxHeightVald={maxHeightVald}
                />
            </ReactModal>
        </div>
    )
}
