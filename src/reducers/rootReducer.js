
const initState = {
    logedIn: false,
    buses: [],
    events: [],
    trails: [],
    // milestones: [],
    drivers: [{ name: '', phone: '' }],
}

const rootReducer = (state = initState, action) => {
    switch (action.type) {
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
        case 'setTrails':
            state = { ...state, trails: action.trails }
            break
        // case 'setMilestones':
        //     state = { ...state, milestones: action.milestones }
        //     break
        default:
            break
    }

    return state
}

export default rootReducer;