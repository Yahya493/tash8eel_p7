import Cookies from 'js-cookie'
import React, { useEffect, useState } from 'react'
import ReactModal from 'react-modal'
import { useDispatch, useSelector } from 'react-redux'
import { saveTrail } from '../../actions/actions'
import TrailCreateBody from './components/TrailCreateBody'
import TrailCreateHeader from './components/TrailCreateHeader'
import './trailDetails.css'

ReactModal.setAppElement('#root');

export default function TrailDetails({ isAdding, exitAdding }) {
    // const [trail, setTrail] = useState({})
    const trails = useSelector(state => state.trails)
    const dispatch = useDispatch()
    const user = Cookies.get('user')
    const [newTrail, setNewTrail] = useState({name:'', user: user, description: ''})

    const [trailNameVald, setTrailNameVal] = useState('*')
    const [distanceVald, setDistanceVald] = useState('*')
    const [minHeightVald, setMinHeightVald] = useState('*')
    const [maxHeightVald, setMaxHeightVald] = useState('*')

    const resetValues = () => {
        setNewTrail({
            ...newTrail,
            name: '',
            distance: 0,
            difficulty: 'Moderate',
            minHeight: 0,
            maxHeight: 0,
            description: '',
        })
    }

    useEffect(() => {
        resetValues()
    }, [])


    const closeModal = () => {
        exitAdding(false)
    }

    const checkTrailForm = () => {
        setTrailNameVal('*')
        setDistanceVald('*')
        setMinHeightVald('*')
        setMaxHeightVald('*')
        let valide = true

        if (newTrail.name === '') {
            setTrailNameVal('required')
            valide = false
        }

        if (newTrail.distance <= 0) {
            setDistanceVald('required')
            valide = false
        }

        if (newTrail.minHeight < 0) {
            setMinHeightVald('required')
            valide = false
        }

        if (newTrail.maxHeight <= 0) {
            setMaxHeightVald('required')
            valide = false
        }

        if (newTrail.maxHeight < newTrail.minHeight) {
            setMaxHeightVald("Can't be less than min height")
            valide = false
        }

        return valide
    }

    const handleSave = () => {
        if(!checkTrailForm()) return

        saveTrail(dispatch, newTrail, trails, closeModal)
    }

    const handleName = (e) => {
        setNewTrail({ ...newTrail, name: e.target.value })
    }

    const handleDifficulty = (e) => {
        setNewTrail({ ...newTrail, difficulty: e.target.value })
    }

    const handleDistance = (e) => {
        setNewTrail({ ...newTrail, distance: e.target.value })
    }

    const handleMinHeight = (e) => {
        setNewTrail({ ...newTrail, minHeight: e.target.value })
    }

    const handleMaxHeight = (e) => {
        setNewTrail({ ...newTrail, maxHeight: e.target.value })
    }

    const handleDescription = (e) => {
        setNewTrail({ ...newTrail, description: e.target.value })
    }

    return (
        <div  className='trailDetails'>
            <ReactModal isOpen={isAdding} onRequestClose={closeModal} className='trailModal' shouldCloseOnOverlayClick={false}>
                <TrailCreateHeader handleSave={handleSave} handleReset={resetValues} handleCancel={closeModal} />
                <TrailCreateBody
                    trail={newTrail}
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
