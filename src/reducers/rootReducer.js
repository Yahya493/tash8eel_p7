
const initState = {
    api: 'http://localhost:4000/api',
    logedIn: false,
    buses: [],
    events: [],
}

const rootReducer = (state = initState, action) => {
    switch(action.type) {
        case 'setUser':
            state = {...state, user: action.user}
            break
        case 'setLogIn':
            state = {...state, logedIn: action.logedIn}
            break
        case 'setBuses':
            state = {...state, buses: action.buses}
            break
        case 'setEvents':
            state = {...state, events: action.events}
            break
    }

    return state
}

export default rootReducer;