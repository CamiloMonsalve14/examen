import React, { useContext, useEffect, useState } from 'react';
import { EventContext } from '../context/EventContext';
import { CustomButton } from '../common/CustomButton';
import {
  Box,
  Heading,
  Text,
  List,
  ListItem,
  Input,
  NumberInput,
  NumberInputField,
  Button,
  Center,
  Flex
} from '@chakra-ui/react';

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
    <Center
    >
    <Flex direction='column' alignItems='center'>
    <Box 
    textAlign="center" 
    p={10}
    boxShadow='outline' 
     rounded='md' 
     bg='white'

    
    >


      <Heading as="h2" mb={4}>
        Lista de eventos
      </Heading>
      {events.length > 0 ? (
        <List>
          {events.map((event) => (
            <ListItem key={event.id} mb={4}>
              <Text>
                <strong>Id:</strong> {event.id}
              </Text>
              <br />
              <Text>
                <strong>Nombre:</strong>{' '}
                {editingEvent === event ? (
                  <Input
                    type="text"
                    value={editedFields.name || ''}
                    onChange={(e) => setEditedFields({ ...editedFields, name: e.target.value })}
                  />
                ) : (
                  event.name
                )}
              </Text>
              <br />
              <Text>
                <strong>Fecha:</strong>{' '}
                {editingEvent === event ? (
                  <Input
                    type="date"
                    value={editedFields.date || ''}
                    onChange={(e) => setEditedFields({ ...editedFields, date: e.target.value })}
                  />
                ) : (
                  event.date
                )}
              </Text>
              <br />
              <Text>
                <strong>Lugar:</strong>{' '}
                {editingEvent === event ? (
                  <Input
                    type="place"
                    value={editedFields.place || ''}
                    onChange={(e) => setEditedFields({ ...editedFields, place: e.target.value })}
                  />
                ) : (
                  event.place
                )}
              </Text>
              <br />
              <Text>
                <strong>Número de Asistentes:</strong>{' '}
                {editingEvent === event ? (
                  <NumberInput
                    value={editedFields.numberOfPeople || ''}
                    onChange={(valueString) =>
                      setEditedFields({ ...editedFields, numberOfPeople: valueString })
                    }
                  >
                    <NumberInputField />
                  </NumberInput>
                ) : (
                  event.numberOfPeople
                )}
              </Text>
              <br />
              {editingEvent === event ? (
                <Box mt={4}>
                  <Button colorScheme="teal" onClick={handleSaveChanges} mr={2}>
                    Guardar Cambios
                  </Button>
                  <Button onClick={handleCancelEdit}>Cancelar</Button>
                </Box>
              ) : (
                <Box mt={4}>
                  <Button colorScheme="teal" onClick={() => handleEditEvent(event)} mr={2}>
                    Editar
                  </Button>
                  <Button onClick={() => handleDeleteEvent(event.id)}>Eliminar</Button>
                </Box>
              )}
            </ListItem>
          ))}
        </List>
      ) : (
        <Text>No hay eventos en el momento</Text>
      )}
      
    </Box>
    <Box
    mt={4}
    textAlign="center" 
    p={4}
    boxShadow='base'  
    rounded='md' bg='white'
    w='70%'
    >
    <CustomButton onClick={() => console.log('Refrescar eventos')} mt={4}>
        Refrescar Eventos
      </CustomButton>
      </Box>
      </Flex>
    </Center>
  );
};

export default EventList;







