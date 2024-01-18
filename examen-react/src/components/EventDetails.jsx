import React, { useContext } from 'react';
import { useParams } from 'react-router-dom';
import { EventContext } from '../context/EventContext';
import { CustomButton } from '../common/CustomButton';

const EventDetails = () => {
    const { id } = useParams();
    const { state } = useContext(EventContext);
    const { events, selectedEvent } = state;

    const currentEvent = selectedEvent || events.find((event) => event.id === id);

    const handleEditEvent = () => {
        // TODO: lógica para editar un evento
    };

    return (
        <div>
            {currentEvent ? (
                <div>
                    <h2>Details of Event {id}</h2>
                    <p>Name: {currentEvent.name}</p>
                    <p>Date: {currentEvent.date}</p>
                    <p>Place: {currentEvent.place}</p>
                    <p>Number of People: {currentEvent.numberOfPeople}</p>
                    <p>Theme: {currentEvent.theme}</p>

                    <CustomButton onClick={handleEditEvent}>Edit Event</CustomButton>
                    <CustomButton onClick={() => console.log('Botón clickeado')}>Haz clic</CustomButton>
                </div>
            ) : (
                <p>Event not found.</p>
            )}
        </div>
    );
    
};

export default EventDetails;
