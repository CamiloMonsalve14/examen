import React from 'react';
import { Button } from '@chakra-ui/react';

const CustomButton = ({ onClick, children }) => {
    return (
        <Button
            onClick={onClick}
            colorScheme="teal" // Puedes cambiar el esquema de color según tus preferencias
            size="md" // Puedes cambiar el tamaño (sm, md, lg)
            borderRadius="md" // Puedes ajustar el radio de los bordes
            _hover={{ bg: 'teal.700' }} // Cambia el color de fondo al pasar el ratón
        >
            {children}
        </Button>
    );
};

export { CustomButton };
