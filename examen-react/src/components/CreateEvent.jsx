import React, { useContext, useState, useEffect } from "react";
import { CustomButton } from "../common/CustomButton";
import { EventContext } from "../context/EventContext";
import { Box, Text, Stack } from "@chakra-ui/react";
import {
  FormControl,
  FormLabel,
  Input,
  NumberInput,
  NumberInputField,
  NumberInputStepper,
  NumberIncrementStepper,
  NumberDecrementStepper,
} from "@chakra-ui/react";
import { Link } from "react-router-dom";
import bgImage from "../recursos/imagenes/salon.jpg";

const CreateEvent = () => {
  const { state, dispatch } = useContext(EventContext);
  const [reservation, setReservation] = useState({
    id: "",
    name: "",
    date: "",
    place: "",
    numberOfPeople: 0,
    theme: "",
  });

  useEffect(() => {
    const storedEvents = localStorage.getItem("events");
    if (storedEvents) {
      dispatch({ type: "SET_EVENTS", payload: JSON.parse(storedEvents) });
    }
  }, [dispatch]);

  useEffect(() => {
    localStorage.setItem("events", JSON.stringify(state.events));
  }, [state.events]);

  const handleInputChange = (e) => {
    setReservation({ ...reservation, [e.target.name]: e.target.value });
  };

  const handleCreateEvent = () => {
    if (reservation.numberOfPeople === 0) {
        alert("La cantidad de participantes no puede ser 0.")
    }
    dispatch({ type: "ADD_EVENT", payload: reservation });
    // Lógica adicional para guardar en localStorage si es necesario
    // También puedes limpiar el formulario después de agregar el evento
    setReservation({
      id: "",
      name: "",
      date: "",
      place: "",
      numberOfPeople: 0,
      theme: "",
    });
    alert("Evento creado correctamente");
  };

  return (
    <Box
    bgRepeat="no-repeat"
    bgSize="cover"
    bgImage={`url(${bgImage})`}
    p="4"
    maxW="50%"
    borderWidth="1px"
    borderRadius="lg"
    overflow="hidden"
    bg="white"
    boxShadow="md"
    bgPosition="center"
    display="flex"
    flexDirection="column"
    alignItems="center"
    justifyContent="center"
    h="100vh"
    mx="auto"
    my="auto"
    textAlign="center"
  >
    
      <form style={{ width: "100%" }}>
        <FormControl isRequired mt="4" w="100%">

        <Text
      color="black"
      textTransform="uppercase"
      fontWeight="light"
      letterSpacing="3px"
      overflow="hidden"
      whiteSpace="nowrap"
      textOverflow="ellipsis"
      maxWidth="100%"
      mb="4"
      fontSize="xl"
     
      >
        Reservación de eventos
      </Text>

          <FormLabel> Id: </FormLabel>
          <Input
            placeholder="Id"
            name="id"
            value={reservation.id}
            onChange={handleInputChange}
          />
        </FormControl>

        

        <FormControl isRequired mt="4" w="100%">
          <FormLabel> Nombre: </FormLabel>
          <Input
            placeholder="¿Quién realiza la reservación?"
            name="name"
            value={reservation.name}
            onChange={handleInputChange}
          />
        </FormControl>

        <FormControl isRequired mt="4" w="100%">
          <FormLabel> Fecha: </FormLabel>
          <Input
            placeholder="Select Date and Time"
            size="md"
            type="datetime-local"
            name="date"
            value={reservation.date}
            onChange={handleInputChange}
          />
        </FormControl>

        <FormControl isRequired mt="4" w="100%">
          <FormLabel> Lugar del Evento: </FormLabel>
          <Input
            placeholder="Lugar"
            name="place"
            value={reservation.place}
            onChange={handleInputChange}
          />
        </FormControl>

        <FormControl mt="4" w="100%">
          <FormLabel>Numero de Invitados: </FormLabel>
          <NumberInput
            defaultValue={0}
            max={200}
            min={1}
            name="numberOfPeople"
            value={reservation.numberOfPeople}
            onChange={(valueString) =>
              setReservation({
                ...reservation,
                numberOfPeople: parseInt(valueString),
              })
            }
          >
            <NumberInputField />
            <NumberInputStepper>
              <NumberIncrementStepper />
              <NumberDecrementStepper />
            </NumberInputStepper>
          </NumberInput>
        </FormControl>

        <Stack
          direction="column"
          spacing={2}
          mt="4"
          w="100%" // Ajustado para ocupar el 100% del ancho
          alignItems="center"
        >
          <CustomButton onClick={handleCreateEvent}>Crear Evento</CustomButton>
          <Link to="/EventList">
            <Box
              w="100%" // Ajustado para ocupar el 100% del ancho
              textAlign="center"
              direction="column"
              spacing={2}
              mt="0.5"
              alignItems="center"
            >
              <CustomButton>Ver Detalles del Evento</CustomButton>
            </Box>
          </Link>
        </Stack>
      </form>
    </Box>
  );
};

export default CreateEvent;
