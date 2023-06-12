import React, { useState } from 'react';
import { getBaseUrl } from '../actions/urlService';
import { useDispatch, useSelector } from 'react-redux';

const FilesUpload = ({ uploadTo , object, setter}) => {

    const [photos, setPhotos] = useState()
    const events = useSelector(state => state.events)
    const dispatch = useDispatch()

    const handleChange = (e) => {
        console.log(e.target.files[0])
        setPhotos(e.target.files[0])
    }

    const handleUpload = (e) => {
        e.preventDefault()
        if (!photos) {
            console.error('No file selected');
            return;
        }

        const formData = new FormData();
        // formData.append('type', uploadTo)
        // formData.append('_id', object._id)
        formData.append('file' , photos)
        console.log(formData)
        fetch(getBaseUrl() + `/upload`, {
            method: 'POST',
            body: formData,
        })
            .then((response) => {
                if (response.ok) {
                    console.log('File uploaded successfully');
                } else {
                    console.error('Error uploading file:', response.status);
                }
                return response.json()
            }).then(data => {
                // console.log(data.url)
                if(!data.url) return
                if(uploadTo === 'event') {
                    // dispatch({type: 'setEvent', events: [data, ...events.filter(event => event._id !== data._id)]})
                    setter({...object, photos: [...object.photos, data.url]})
                    return
                }
                if(uploadTo === 'milestone') {
                    console.log('setMilestone')
                    return
                }
            })
            .catch((error) => {
                console.error('Error uploading file:', error);
            });

    }

    return (
        <div className="filesUpload">
            <form id='file' method='POST' encType='multipart/form-data' action='http://localhost:4000/api/upload'>
                <h3>Photo Upload</h3>
                <div className="form-group">
                    {/* <label htmlFor='file'>files</label> */}
                    <input className='fileInput' type="file" accept="image/*" onChange={handleChange} />
                </div>
                <div className="form-group">
                    <button className="" type="submit" onClick={handleUpload}>Upload</button>
                </div>
            </form>
        </div>
    )

}

export default FilesUpload