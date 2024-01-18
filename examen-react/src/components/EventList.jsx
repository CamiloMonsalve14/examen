import React, { useContext } from 'react';
import { EventContext } from '../context/EventContext';
import { CustomButton } from '../common/CustomButton';

const EventList = () => {
    const { state } = useContext(EventContext);
    const { events } = state;

    return (
        <div>
            <h2>Lista de eventos</h2>
            {events.length > 0 ? (
                <ul>
                    {events.map((event) => (
                        <li key={event.id}>
                            <strong>Nombre:</strong> {event.name} <br />
                            <strong>Fecha:</strong> {event.date} <br />
                            <strong>Lugar:</strong> {event.place} <br />
                            <strong>Número de Asistentes:</strong> {event.numberOfPeople} <br />
                            <strong>Tema:</strong> {event.theme}
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

