const getBaseUrl = ()=>{

    return 'https://tash8eel-p7-api-1ad6.vercel.app/api';
    // return 'http://localhost:4000/api';
}

const getMapboxToken = () => {
    return "pk.eyJ1IjoieWFoeWE0OTMiLCJhIjoiY2xrZmY5ajlhMTVhMjNxdTg4eHN6ODRxYSJ9.ORckd2AyE1nD7m7oami5rw"
    // return "sk.eyJ1IjoieWFoeWE0OTMiLCJhIjoiY2xrZmZxbHZmMXQyZjNwbXdpdDF3c2x3OSJ9.dYxjNXuPS8D1MaWrWZbxlg"
}

export {
    getBaseUrl,
    getMapboxToken
}