import { createContext, useReducer, useEffect } from 'react';

const initialState = {
    events: [],
};

const eventReducer = (state, action) => {
    switch (action.type) {
        case 'ADD_EVENT':
            return { events: [...state.events, action.payload] };
        case 'GET_EVENTS':
            return state;
        case 'GET_EVENT':
            return state;
        case 'EDIT_EVENT':
            return state;
        case 'DELETE_EVENT':
            return state;
        default:
            return state;
    }
};

const EventContext = createContext();

const EventProvider = ({ children }) => {
    const [state, dispatch] = useReducer(eventReducer, initialState);

    useEffect(() => {
        const storedEvents = JSON.parse(localStorage.getItem('events')) || [];
        dispatch({ type: 'GET_EVENTS', payload: storedEvents });
    }, []);

    return (
        <EventContext.Provider value={{ state, dispatch }}>
            {children}
        </EventContext.Provider>
    );
};

export { EventContext, EventProvider };
