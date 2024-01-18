import React, { useContext, useEffect, useState } from 'react';
import { EventContext } from '../context/EventContext';
import { CustomButton } from '../common/CustomButton';

const EventList = () => {
  const { state, dispatch } = useContext(EventContext);
  const { events } = state;

  const [editingEvent, setEditingEvent] = useState(null);
  const [editedFields, setEditedFields] = useState({});

  // Obtener eventos almacenados en localStorage al cargar la página
  useEffect(() => {
    const storedEvents = localStorage.getItem('events');
    if (storedEvents) {
      dispatch({ type: 'SET_EVENTS', payload: JSON.parse(storedEvents) });
    }
  }, [dispatch]);

  const handleEditEvent = (event) => {
    setEditingEvent(event);
    // Inicializamos editedFields con los valores actuales del evento
    setEditedFields({ ...event });
  };

  const handleSaveChanges = () => {
    dispatch({ type: 'EDIT_EVENT', payload: { id: editingEvent.id, changes: editedFields } });
    setEditingEvent(null);
    setEditedFields({});
  };

  const handleCancelEdit = () => {
    setEditingEvent(null);
    setEditedFields({});
  };

  const handleDeleteEvent = (eventId) => {
    dispatch({ type: 'DELETE_EVENT', payload: { id: eventId } });
  };

  return (
    <div>
      <h2>Lista de eventos</h2>
      {events.length > 0 ? (
        <ul>
          {events.map((event) => (
            <li key={event.id}>
              <strong>Id:</strong> {event.id} <br />
              <strong>Nombre:</strong>{' '}
              {editingEvent === event ? (
                <input
                  type="text"
                  value={editedFields.name || ''}
                  onChange={(e) => setEditedFields({ ...editedFields, name: e.target.value })}
                />
              ) : (
                event.name
              )}
              <br />
              <strong>Fecha:</strong>{' '}
              {editingEvent === event ? (
                <input
                  type="text"
                  value={editedFields.date || ''}
                  onChange={(e) => setEditedFields({ ...editedFields, date: e.target.value })}
                />
              ) : (
                event.date
              )}
              <br />
              <strong>Lugar:</strong>{' '}
              {editingEvent === event ? (
                <input
                  type="text"
                  value={editedFields.place || ''}
                  onChange={(e) => setEditedFields({ ...editedFields, place: e.target.value })}
                />
              ) : (
                event.place
              )}
              <br />
              <strong>Número de Asistentes:</strong>{' '}
              {editingEvent === event ? (
                <input
                  type="number"
                  value={editedFields.numberOfPeople || ''}
                  onChange={(e) => setEditedFields({ ...editedFields, numberOfPeople: e.target.value })}
                />
              ) : (
                event.numberOfPeople
              )}
              <br />
              {editingEvent === event ? (
                <div>
                  <CustomButton onClick={handleSaveChanges}>Guardar Cambios</CustomButton>
                  <CustomButton onClick={handleCancelEdit}>Cancelar</CustomButton>
                </div>
              ) : (
                <CustomButton onClick={() => handleEditEvent(event)}>Editar</CustomButton>
              )}
              <CustomButton onClick={() => handleDeleteEvent(event.id)}>Eliminar</CustomButton>
            </li>
          ))}
        </ul>
      ) : (
        <p>No hay eventos en el momento</p>
      )}
      <CustomButton onClick={() => console.log('Refrescar eventos')}>Refrescar Eventos</CustomButton>
    </div>
  );
};

export default EventList;





