import React, { useEffect, useState } from 'react'
import ReactImageGallery from 'react-image-gallery'
import { getBaseUrl } from '../../../actions/urlService'
import FilesUpload from '../../../components/FilesUpload'
import emptyPhoto from '../../../components/empty-photo.jpg'



export default function MilestoneCreateBody(
  {
    milestone,
    handleName,
    handleDescription,
    handleLocation,
    milestoneNameVald,
    locationVald,
    setMilestone
  }) {

  const [photos, setPhotos] = useState([])
  const api = getBaseUrl()

  // useEffect(
  //   () => {
  //     for (const photoId of milestone.photos) {
  //       console.log(`downloading: ${photoId}`)
  //       fetch(api + '/photos', {
  //         method: 'POST',
  //         headers: {
  //           "Content-Type": "application/json"
  //         },
  //         body: JSON.stringify({ _id: photoId })
  //       })
  //         .then(res => res.json())
  //         .then(photo => {
  //           setPhotos(p => [...p, photo.myFile])
  //           console.log(`download finished: ${photoId}`)
  //         })
  //     }
  //   },
  //   [milestone.photos]
  // )

  return (
    <div className='milestoneDetailsBody'>
      <div className='info'>
        <div >
          <label htmlFor='milestoneName'>Milestone name</label><br />
          <input id='milestoneName' type='text' name='milestoneName' value={milestone.name} onChange={handleName} />
          <p className='inputValidation'>{milestoneNameVald}</p>
        </div>
        <div>
          <label htmlFor='location'>Location</label><br />
          <input id='location' type='text' name='location' value={milestone.location} onChange={handleLocation} />
          <p className='inputValidation'>{locationVald}</p>
        </div>
        <div >
          <label htmlFor='description'>Description</label><br />
          <textarea id='description' value={milestone.description} name='description' onChange={handleDescription} aria-multiline />
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
