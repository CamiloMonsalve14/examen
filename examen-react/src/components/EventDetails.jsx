import React, { useContext, useState } from 'react';
import { useParams } from 'react-router-dom';
import { EventContext } from '../context/EventContext';
import { CustomButton } from '../common/CustomButton';
import {
  Box,
  Text,
  Input,
  NumberInput,
  NumberInputField,
  Button,
  Heading,
} from '@chakra-ui/react';

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
    setEditedFields({
      name: currentEvent?.name || '',
      date: currentEvent?.date || '',
      place: currentEvent?.place || '',
      numberOfPeople: currentEvent?.numberOfPeople || 0,
    });
  };

  return (
    <Box 
    // textAlign='center'
    
    p={4} boxShadow='base' 
    rounded='md' bg='grey' 
    borderColor='rgb' w='40%' 
    mx='auto'
     my={8}>
      {currentEvent ? (
        <div>
          <Heading 
          as="h2" 
          mb={4}
          textAlign='center'
          >
            Detalles del Evento {id}
          </Heading>
          <Text>
            <strong>Id:</strong> {currentEvent.id}
          </Text>
          <Text>
            <strong>Nombre:</strong>{' '}
            {isEditing ? (
              <Input
                type="text"
                value={editedFields.name}
                onChange={(e) => setEditedFields({ ...editedFields, name: e.target.value })}
              />
            ) : (
              currentEvent.name
            )}
          </Text>
          <Text>
            <strong>Fecha:</strong>{' '}
            {isEditing ? (
              <Input
                type="date"
                value={editedFields.date}
                onChange={(e) => setEditedFields({ ...editedFields, date: e.target.value })}
              />
            ) : (
              currentEvent.date
            )}
          </Text>
          <Text>
            <strong>Lugar:</strong>{' '}
            {isEditing ? (
              <Input
                type="text"
                value={editedFields.place}
                onChange={(e) => setEditedFields({ ...editedFields, place: e.target.value })}
              />
            ) : (
              currentEvent.place
            )}
          </Text>
          <Text>
            <strong>Número de Personas:</strong>{' '}
            {isEditing ? (
              <NumberInput
                value={editedFields.numberOfPeople}
                onChange={(valueString) =>
                  setEditedFields({ ...editedFields, numberOfPeople: valueString })
                }
              >
                <NumberInputField />
              </NumberInput>
            ) : (
              currentEvent.numberOfPeople
            )}
          </Text>

          {isEditing ? (
            <Box mt={4}>
              <Button colorScheme="teal" onClick={handleSaveChanges} mr={2}>
                Guardar Cambios
              </Button>
              <Button onClick={handleCancelEdit}>Cancelar</Button>
            </Box>
          ) : (
            <Box textAlign='center'>
            <Button colorScheme="teal" onClick={handleEditEvent} mt={4}>
              Editar Evento
            </Button>
            </Box>
          )}
        </div>
      ) : (
        <Text>No se encontró el evento.</Text>
      )}
    </Box>
  );
};

export default EventDetails;


