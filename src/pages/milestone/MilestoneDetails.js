import React, { useEffect, useState } from 'react'
import ReactModal from 'react-modal'
import { deleteMilestone, getMilestoneById, updateMilestone } from '../../actions/actions'
import MilestoneDetailsBody from './components/MilestoneDetailsBody'
import MilestoneDetailsHeader from './components/MilestoneDetailsHeader'
import './milestoneDetails.css'

ReactModal.setAppElement('#root');

export default function MilestoneDetails({ id, isEditing, exitEditing, milestones, setMilestones, hasStart, hasEnd }) {
  const [milestone, setMilestone] = useState({photos: []})
  // const dispatch = useDispatch()

  const [milestoneNameVald, setMilestoneNameVal] = useState('*')
  const [locationVald, setLocationVal] = useState('*')
  const [typeVald, setTypeVal] = useState('*')


  const closeModal = () => {
    exitEditing(false)
  };

  useEffect(() => {
    getMilestoneById(id, setMilestone)
  }, [])

  const handleDelete = () => {
    deleteMilestone(milestone, milestones, setMilestones, closeModal)
  }

  const checkMilestoneForm = () => {
    setMilestoneNameVal('*')
    setLocationVal('*')
    setTypeVal('*')
    let valide = true

    if (milestone.name === '') {
      setMilestoneNameVal('required')
      valide = false
    }

    if (milestone.location === '') {
      setLocationVal('required')
      valide = false
    }

    if(hasStart(milestone) && milestone.type === 'Start' ) {
      setTypeVal("Already has a Start")
      valide = false
    }

    if(hasEnd(milestone) && milestone.type === 'End' ) {
      setTypeVal("Already has an End")
      valide = false
    }

    return valide
  }

  const handleUpdate = () => {
    if (!checkMilestoneForm()) return

    updateMilestone(milestone, milestones, setMilestones, closeModal)
  }

  const handleName = (e) => {
    setMilestone({ ...milestone, name: e.target.value })
  }

  const handleLocation = (e) => {
    setMilestone({ ...milestone, location: e.target.value })
  }

  const handleType = (e) => {
    setMilestone({ ...milestone, type: e.target.value })
  }

  const handleDescription = (e) => {
    setMilestone({ ...milestone, description: e.target.value })
  }

  return (
    <div className='milestoneDetails'>
      <ReactModal isOpen={isEditing} onRequestClose={closeModal} className='milestoneModal' shouldCloseOnOverlayClick={false}>
        <MilestoneDetailsHeader handleUpdate={handleUpdate} handleDelete={handleDelete} handleCancel={closeModal} />
        <MilestoneDetailsBody
          milestone={milestone}
          handleName={handleName}
          handleLocation={handleLocation}
          handleType={handleType}
          handleDescription={handleDescription}
          milestoneNameVald={milestoneNameVald}
          locationVald={locationVald}
          setMilestone={setMilestone}
          typeVald={typeVald}
        />
      </ReactModal>
    </div>
  )
}
