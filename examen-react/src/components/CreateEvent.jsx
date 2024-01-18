import React, { useContext, useState } from 'react';
import { CustomButton } from '../common/CustomButton';
import { EventContext } from '../context/EventContext';
import { Box } from '@chakra-ui/react';
import {
    FormControl,
    FormLabel,
    Input,
    NumberInput,
    NumberInputField,
    NumberInputStepper,
    NumberIncrementStepper,
    NumberDecrementStepper,
} from '@chakra-ui/react';

const CreateEvent = () => {
    const { dispatch } = useContext(EventContext);
    const [reservation, setReservation] = useState({
        id: '',
        name: '',
        date: '',
        place: '',
        numberOfPeople: 0,
        theme: '',
    });

    const handleInputChange = (e) => {
        setReservation({ ...reservation, [e.target.name]: e.target.value });
    };

    const handleCreateEvent = () => {
        dispatch({ type: 'ADD_EVENT', payload: reservation });
        // Lógica adicional para guardar en localStorage si es necesario
        // También puedes limpiar el formulario después de agregar el evento
        setReservation({
            id: '',
            name: '',
            date: '',
            place: '',
            numberOfPeople: 0,
            theme: '',
        });
    };

    return (
        <Box
            p="4"
            maxW="md"
            borderWidth="1px"
            borderRadius="lg"
            overflow="hidden"
            bg="white"
            boxShadow="md"
            bgPosition='center'
            display="flex"
            alignItems="center"
            justifyContent="center"
        >
            <Box 
            bg="tomato" 
            p="2px">
                <h2 style={{ color: 'white' }}>Reservación de Eventos</h2>
            </Box>
            <form>
                <FormControl isRequired mt="4">
                    <FormLabel> Id: </FormLabel>
                    <Input
                        placeholder='Id'
                        name='id'
                        value={reservation.id}
                        onChange={handleInputChange}
                    />
                </FormControl>

                <FormControl isRequired mt="4">
                    <FormLabel> Nombre: </FormLabel>
                    <Input
                        placeholder='¿Quién realiza la reservación?'
                        name='name'
                        value={reservation.name}
                        onChange={handleInputChange}
                    />
                </FormControl>

                <FormControl isRequired mt="4">
                    <FormLabel> Fecha: </FormLabel>
                    <Input
                        placeholder="Select Date and Time"
                        size="md"
                        type="datetime-local"
                        name='date'
                        value={reservation.date}
                        onChange={handleInputChange}
                    />
                </FormControl>

                <FormControl isRequired mt="4">
                    <FormLabel> Lugar del Evento: </FormLabel>
                    <Input
                        placeholder='Lugar'
                        name='place'
                        value={reservation.place}
                        onChange={handleInputChange}
                    />
                </FormControl>

                <FormControl mt="4">
                    <FormLabel>Numero de Invitados: </FormLabel>
                    <NumberInput
                        defaultValue={0}
                        max={200}
                        min={1}
                        name='numberOfPeople'
                        value={reservation.numberOfPeople}
                        onChange={(valueString) => setReservation({ ...reservation, numberOfPeople: parseInt(valueString) })}
                    >
                        <NumberInputField />
                        <NumberInputStepper>
                            <NumberIncrementStepper />
                            <NumberDecrementStepper />
                        </NumberInputStepper>
                    </NumberInput>
                </FormControl>

                <CustomButton mt="4" onClick={handleCreateEvent}>Crear Evento</CustomButton>
            </form>
        </Box>
    );
};




export default CreateEvent;
