import React, { useEffect, useState } from 'react'
import ReactImageGallery from 'react-image-gallery'
import { getBaseUrl } from '../../../actions/urlService'
import FilesUpload from '../../../components/FilesUpload'
import emptyPhoto from '../../../components/empty-photo.jpg'



export default function MilestoneDetailsBody(
  {
    milestone,
    handleName,
    handleDescription,
    handleLocation,
    handleType,
    milestoneNameVald,
    locationVald,
    setMilestone,
    typeVald,
  }) {

  const [photos, setPhotos] = useState([])
  const api = getBaseUrl()

  useEffect(
    () => {
      if (photos.length > 0) return
      for (const photoId of milestone.photos) {
        console.log(`downloading: ${photoId}`)
        fetch(api + '/photos', {
          method: 'POST',
          headers: {
            "Content-Type": "application/json"
          },
          body: JSON.stringify({ _id: photoId })
        })
          .then(res => res.json())
          .then(photo => {
            setPhotos(p => [...p, photo.myFile])
            console.log(`download finished: ${photoId}`)
          })
      }
    },
    [milestone.photos]
  )

  return (
    <div className='milestoneDetailsBody'>
      <div className='info'>
        <div >
          <label htmlFor='milestoneName'>Milestone name</label><br />
          <input id='milestoneName' type='text' value={milestone.name} onChange={handleName} />
          <p className='inputValidation'>{milestoneNameVald}</p>
        </div>
        <div>
          <label htmlFor='location'>Location</label><br />
          <input id='location' type='text' value={milestone.location} onChange={handleLocation} />
          <p className='inputValidation'>{locationVald}</p>
        </div>
        <label>Type</label>
        <div id='type'>
          <div>
            <input id='radio1' type='radio' name='type' value='Start' checked={milestone.type === 'Start'} onChange={handleType} />
            <label htmlFor='radio1'>Start</label>
          </div>
          <div>
            <input id='radio3' type='radio' name='type' value='End' checked={milestone.type === 'End'} onChange={handleType} />
            <label htmlFor='radio3'>End</label>
          </div>
          <div>
            <input id='radio2' type='radio' name='type' value='On The Trail' checked={milestone.type === 'On The Trail'} onChange={handleType} />
            <label htmlFor='radio2'>On The Trail</label>
          </div>
        </div>
        <p className='inputValidation'>{typeVald}</p>
        <div >
          <label htmlFor='description'>Description</label><br />
          <textarea id='description' value={milestone.description} onChange={handleDescription} aria-multiline />
        </div>
      </div>
      <div className='galleryCard'>
        <FilesUpload uploadTo='milestone' object={milestone} setter={setMilestone} photos={photos} setPhotos={setPhotos} />
        <ReactImageGallery items={(photos.length === 0) ?
          [{
            original: emptyPhoto,
          }]
          :
          photos.map(photo => {
            return {
              original: photo,
            }
          })} autoPlay />
      </div>
    </div>
  )
}
