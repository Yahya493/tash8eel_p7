import Cookies from 'js-cookie'
import React, { useEffect, useState } from 'react'
import ReactModal from 'react-modal'
import { useDispatch, useSelector } from 'react-redux'
import { deleteTrail, saveTrail } from '../../actions/actions'
import TrailCreateBody from './components/TrailCreateBody'
import TrailCreateHeader from './components/TrailCreateHeader'
import './trailDetails.css'

ReactModal.setAppElement('#root');

export default function TrailDetails({ isAdding, exitAdding }) {
    const [trail, setTrail] = useState({})
    const trails = useSelector(state => state.trails)
    const dispatch = useDispatch()
    const user = Cookies.get('user')
    const [newTrail, setNewTrail] = useState({name:'', user: user, description: ''})

    const [trailNameVald, setTrailNameVal] = useState('*')

    const resetValues = () => {
        setNewTrail({
            ...newTrail,
            name: '',
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
        let valide = true

        if (newTrail.name === '') {
            setTrailNameVal('required')
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

    const handleDescription = (e) => {
        setNewTrail({ ...newTrail, description: e.target.value })
    }

    return (
        <div  className='trailDetails'>
            <ReactModal isOpen={isAdding} onRequestClose={closeModal} className='trailModal' shouldCloseOnOverlayClick={false}>
                <TrailCreateHeader handleSave={handleSave} handleReset={resetValues} handleCancel={closeModal} />
                <TrailCreateBody
                    trail={trail}
                    handleName={handleName}
                    handleDescription={handleDescription}
                    trailNameVald={trailNameVald}
                />
            </ReactModal>
        </div>
    )
}
