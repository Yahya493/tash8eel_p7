
const initState = {
    api: 'http://localhost:4000/api',
    buses: []
}

const rootReducer = (state = initState, action) => {
    switch(action.type) {
        case 'setUser':
            state = {...state, user: action.user}
            break
        case 'setBuses':
            state = {...state, buses: action.buses}
            break
    }

    return state
}

export default rootReducer;