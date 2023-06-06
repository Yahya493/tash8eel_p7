
const initState = {
    user: {},
    logedIn: false,
    buses: [],
    events: [],
    drivers: [{name:'', phone:''}],
    update: 0,
}

const rootReducer = (state = initState, action) => {
    switch (action.type) {
        // case 'setUser':
        //     state = { ...state, user: action.user }
        //     break
        case 'setLogIn':
            state = { ...state, logedIn: action.logedIn }
            break
        case 'setBuses':
            state = { ...state, buses: action.buses }
            break
        case 'setDrivers':
            state = { ...state, drivers: action.drivers }
            break
        case 'setEvents':
            state = { ...state, events: action.events }
            break
        case 'update':
            state = { ...state, update: state.update + 1 }
            break
        default:
            break
    }

    return state
}

export default rootReducer;