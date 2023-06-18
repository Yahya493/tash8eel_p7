import React, { useEffect, useState } from 'react'
import ReactModal from 'react-modal'
import { saveMilestone } from '../../actions/actions'
import MilestoneCreateHeader from './components/MilestoneCreateHeader'
import MilestoneDetailsBody from './components/MilestoneDetailsBody'
import './milestoneDetails.css'
import MilestoneCreateBody from './components/MilestoneCreateBody'

ReactModal.setAppElement('#root');

export default function MilestoneCreateForm({trailId, isAdding, exitAdding, milestones, setMilestones , hasStart, hasEnd}) {
  const [milestone, setMilestone] = useState({photos: []})
  // const dispatch = useDispatch()

  const [milestoneNameVald, setMilestoneNameVal] = useState('*')
  const [locationVald, setLocationVal] = useState('*')
  const [typeVald, setTypeVal] = useState('*')

  const resetValues = () => {
    setMilestone({
      name: '',
      location: '',
      type: 'On The Trail',
      trail: trailId,
      description: ''
    })
  }

  const closeModal = () => {
    exitAdding(false)
  };

  useEffect(() => {
    resetValues()
  }, [])

  const handleReset = () => {
    resetValues()
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

  const handleSave = () => {
    if (!checkMilestoneForm()) return

    saveMilestone(milestone, milestones, setMilestones, closeModal)
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
      <ReactModal isOpen={isAdding} onRequestClose={closeModal} className='milestoneModal' shouldCloseOnOverlayClick={false}>
        <MilestoneCreateHeader handleSave={handleSave} handleReset={handleReset} handleCancel={closeModal} />
        <MilestoneCreateBody
          milestone={milestone}
          handleName={handleName}
          handleLocation={handleLocation}
          handleType={handleType}
          handleDescription={handleDescription}
          milestoneNameVald={milestoneNameVald}
          locationVald={locationVald}
          typeVald={typeVald}
          setMilestone={setMilestone}
        />
      </ReactModal>
    </div>
  )
}
