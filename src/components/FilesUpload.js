import React, { useState } from 'react';
import { getBaseUrl } from '../actions/urlService';
import { useDispatch, useSelector } from 'react-redux';

const FilesUpload = ({ uploadTo, object, setter, photos, setPhotos}) => {

    // const [photos, setPhotos] = useState()
    // const events = useSelector(state => state.events)
    // const dispatch = useDispatch()

    // const handleChange = (e) => {
    //     console.log(e.target.files[0])
    //     setPhotos(e.target.files[0])
    // }

    // const handleUpload = (e) => {
    //     e.preventDefault()
    //     if (!photos) {
    //         console.error('No file selected');
    //         return;
    //     }

    //     const formData = new FormData();
    //     // formData.append('type', uploadTo)
    //     // formData.append('_id', object._id)
    //     formData.append('file', photos)
    //     console.log(formData)
    //     fetch(getBaseUrl() + `/upload`, {
    //         method: 'POST',
    //         body: formData,
    //     })
    //         .then((response) => {
    //             if (response.ok) {
    //                 console.log('File uploaded successfully');
    //             } else {
    //                 console.error('Error uploading file:', response.status);
    //             }
    //             return response.json()
    //         }).then(data => {
    //             // console.log(data.url)
    //             if (!data.url) return
    //             if (uploadTo === 'event') {
    //                 // dispatch({type: 'setEvent', events: [data, ...events.filter(event => event._id !== data._id)]})
    //                 setter({ ...object, photos: [...object.photos, data.url] })
    //                 return
    //             }
    //             if (uploadTo === 'milestone') {
    //                 console.log('setMilestone')
    //                 return
    //             }
    //         })
    //         .catch((error) => {
    //             console.error('Error uploading file:', error);
    //         });

    // }

    // return (
    //     <div className="filesUpload">
    //         <form id='file' method='POST' encType='multipart/form-data' action='http://localhost:4000/api/upload'>
    //             <h3>Photo Upload</h3>
    //             <div className="form-group">
    //                 {/* <label htmlFor='file'>files</label> */}
    //                 <input className='fileInput' type="file" accept="image/*" onChange={handleChange} />
    //             </div>
    //             <div className="form-group">
    //                 <button className="" type="submit" onClick={handleUpload}>Upload</button>
    //             </div>
    //         </form>
    //     </div>
    // )

    const [postImage, setPostImage] = useState({ myFile: '' })
    const [uploadState, setUploadState] = useState('')
    const [oldFile, setOldFile] = useState({})
    const url = getBaseUrl()

    const createPost = async (newImage) => {
        setUploadState('uploading')
        try {
            await fetch(url + '/uploadPhoto', {
                method: 'POST',
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify(newImage)
            })
                .then(res => res.json())
                .then(photo => {
                    // console.log('Photo id: ' + photo._id)
                    if (uploadTo === 'event') {
                        // dispatch({type: 'setEvent', events: [data, ...events.filter(event => event._id !== data._id)]})
                        setter({ ...object, photos: [...object.photos, photo._id] })
                        setPhotos([...photos, newImage.myFile])
                        setUploadState('uploaded')
                        return
                    }
                })
        }
        catch (error) {
            setUploadState('error')
            console.log(error)
        }
    }

    const handleSubmit = (e) => {
        e.preventDefault()
        if(postImage.myFile === '') {
            console.log('Select a file')
            return
        }
        if(postImage === oldFile) {
            console.log('Select another file')
            return
        }
        setOldFile(postImage)
        createPost(postImage)
        console.log('Uploaded')
    }

    const handleFileUpload = async (e) => {
        const file = e.target.files[0]
        // console.log("file: " + file)
        const base64 = await convertToBase64(file)
        // console.log("Base64: " + base64)
        setPostImage({ ...postImage, myFile: base64 })
    }

    return (
        <div className="filesUpload">
            <form id='file' onSubmit={handleSubmit}>
                <h3>Photo Upload</h3>
                {/* <label htmlFor='file'>files</label> */}
                <input
                    className='fileInput'
                    type="file"
                    name='myFile'
                    accept=".jpeg, .png, .jpg"
                    onChange={(e) => handleFileUpload(e)}
                />
                {uploadState === 'uploading'
                    ?
                    <button className="btnCancel" disabled>Uploading...</button>
                    :
                    <button className="" type="submit">Upload</button>
                }
                
            </form>
        </div>
    )

}

function convertToBase64(file) {
    return new Promise((resolve, reject) => {
        const fileReader = new FileReader();
        fileReader.readAsDataURL(file)
        fileReader.onload = () => {
            resolve(fileReader.result)
        }
        fileReader.onerror = (error) => {
            reject(error)
        }
    })
}

export default FilesUpload