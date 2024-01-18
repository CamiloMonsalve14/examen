import { createContext, useReducer, useEffect } from 'react';

const initialState = {
  events: [],
};

const eventReducer = (state, action) => {
  switch (action.type) {
    case 'ADD_EVENT':
      const updatedEvents = [...state.events, action.payload];
      localStorage.setItem('events', JSON.stringify(updatedEvents));
      return { events: updatedEvents };

    case 'GET_EVENTS':
      const storedEvents = JSON.parse(localStorage.getItem('events')) || [];
      return { events: storedEvents };

    case 'GET_EVENT':
      // Implementar lógica para obtener un evento específico si es necesario
      return state;

    case 'EDIT_EVENT':
      const editedEvents = state.events.map((event) =>
        event.id === action.payload.id ? { ...event, ...action.payload.changes } : event
      );
      localStorage.setItem('events', JSON.stringify(editedEvents));
      return { events: editedEvents };

    case 'DELETE_EVENT':
      const remainingEvents = state.events.filter((event) => event.id !== action.payload.id);
      localStorage.setItem('events', JSON.stringify(remainingEvents));
      return { events: remainingEvents };

    default:
      return state;
  }
};

const EventContext = createContext();

const EventProvider = ({ children }) => {
  const [state, dispatch] = useReducer(eventReducer, initialState);

  useEffect(() => {
    dispatch({ type: 'GET_EVENTS' });
  }, []);

  return (
    <EventContext.Provider value={{ state, dispatch }}>
      {children}
    </EventContext.Provider>
  );
};

export { EventContext, EventProvider };

