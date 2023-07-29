import { getBaseUrl } from "../../../actions/urlService"

const getCoverPhoto = async (photoId, setPhoto) => {
    const api = getBaseUrl()
    const photo = await sessionStorage.getItem(photoId)
    if(photo) {
        setPhoto({
            data: photo,
            state: 2,
        })
        return
    }
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
            sessionStorage.setItem(photo._id, photo.myFile)
            setPhoto({
                data: photo.myFile,
                state: 2,
            })
            console.log(`download finished: ${photoId}`)
        }).catch(error => console.error(error))
}

const formatDate = (date) => {
    return date.split('T')[0].split('-').reverse().join('/')
}

const formatTime = (time) => {
    const data = time.split('T')[1].split(':')
    if (+data[0] > 12) {
        const h = +data[0] % 12
        return `${h<10?`0${h}`:`${h}`}:${data[1]} PM`
    }
    if (+data[0] === 0) {
        return `12:${data[1]} AM`
    }
    if (+data[0] === 12) {
        return `12:${data[1]} PM`
    }
    return `${data[0]}:${data[1]} AM`
}

export {
    getCoverPhoto,
    formatDate,
    formatTime
}