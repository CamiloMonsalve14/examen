import React, { useContext, useState } from 'react';
import { useParams } from 'react-router-dom';
import { EventContext } from '../context/EventContext';
import { CustomButton } from '../common/CustomButton';

const EventDetails = () => {
    const { id } = useParams();
    const { state, dispatch } = useContext(EventContext);
    const { events, selectedEvent } = state;

    const currentEvent = selectedEvent || events.find((event) => event.id === id);

    const [isEditing, setIsEditing] = useState(false);
    const [editedFields, setEditedFields] = useState({
        name: currentEvent?.name || '',
        date: currentEvent?.date || '',
        place: currentEvent?.place || '',
        numberOfPeople: currentEvent?.numberOfPeople || 0,
        // theme: currentEvent?.theme || '',
    });

    const handleEditEvent = () => {
        setIsEditing(true);
    };

    const handleSaveChanges = () => {
        dispatch({ type: 'EDIT_EVENT', payload: { id, changes: editedFields } });
        setIsEditing(false);
    };

    const handleCancelEdit = () => {
        setIsEditing(false);
        // Restaurar los campos editados a los valores originales
        setEditedFields({
            name: currentEvent?.name || '',
            date: currentEvent?.date || '',
            place: currentEvent?.place || '',
            numberOfPeople: currentEvent?.numberOfPeople || 0,
            // theme: currentEvent?.theme || '',
        });
    };

    return (
        <div>
            {currentEvent ? (
                <div>
                    <h2>Detalles del Evento {id}</h2>
                    <p><strong>Id:</strong> {currentEvent.id}</p>
                    <p><strong>Nombre:</strong> {isEditing ? <input type="text" value={editedFields.name} onChange={(e) => setEditedFields({ ...editedFields, name: e.target.value })} /> : currentEvent.name}</p>
                    <p><strong>Fecha:</strong> {isEditing ? <input type="text" value={editedFields.date} onChange={(e) => setEditedFields({ ...editedFields, date: e.target.value })} /> : currentEvent.date}</p>
                    <p><strong>Lugar:</strong> {isEditing ? <input type="text" value={editedFields.place} onChange={(e) => setEditedFields({ ...editedFields, place: e.target.value })} /> : currentEvent.place}</p>
                    <p><strong>Numero de personas:</strong> {isEditing ? <input type="number" value={editedFields.numberOfPeople} onChange={(e) => setEditedFields({ ...editedFields, numberOfPeople: parseInt(e.target.value) })} /> : currentEvent.numberOfPeople}</p>
                    {/* <p>Theme: {isEditing ? <input type="text" value={editedFields.theme} onChange={(e) => setEditedFields({ ...editedFields, theme: e.target.value })} /> : currentEvent.theme}</p> */}

                    {isEditing ? (
                        <div>
                            <CustomButton onClick={handleSaveChanges}>Save Changes</CustomButton>
                            <CustomButton onClick={handleCancelEdit}>Cancel</CustomButton>
                        </div>
                    ) : (
                        <CustomButton onClick={handleEditEvent}>Edit Event</CustomButton>
                    )}

                    {/* <CustomButton onClick={() => console.log('Botón clickeado')}>Haz clic</CustomButton> */}
                </div>
            ) : (
                <p>Event not found.</p>
            )}
        </div>
    );
};

export default EventDetails;

