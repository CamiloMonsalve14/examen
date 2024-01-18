import React from 'react';
import { Box, Heading, Button, Flex, Stack} from '@chakra-ui/react'
import bgImage from '../recursos/imagenes/01.jpeg'
import { Link } from 'react-router-dom';
 
const HomePage = () => {
    return (
        <Box 
        h='100vh'
        w='100%'
        bg='grey' 
        bgImage={`url(${bgImage})`}
        bgRepeat='no-repeat'
        bgSize='cover'
        bgPosition='center'
        display="flex"
        alignItems="center"
        justifyContent="center"
         >

        <Flex
        direction='column'
        alignItems='center'
        justify='center'
        h= '100%'
        bg='rgba (0 0 0 / 0.6)'
        p={['0 10%', null, '0 20%']}
        >
        <Heading 
        color='white'
        textTransform='uppercase' 
        textAlign='center'
        fontWeight='ligth'
        letterSpacing='3px'
        >
        
                Bienvenidos a la pagina principal
        </Heading>

        <Stack
                    direction={{ base: 'column', md: 'row' }}
                    spacing='30px'
                    mt='20px'
                    w={['100%', null, 'auto']}
                >
                    <Link to="/create">
                        <Button
                            variant='outline'
                            size='lg'
                            color='white'
                            textTransform='uppercase'
                            fontWeight='light'
                            _hover={{
                                color: 'black',
                                bg: 'white'
                            }}
                        >
                            Reservar un Evento
                        </Button>
                    </Link>
                    <Link to="/eventList">
                        <Button
                            variant='outline'
                            size='lg'
                            color='white'
                            textTransform='uppercase'
                            fontWeight='light'
                            _hover={{
                                color: 'black',
                                bg: 'white'
                            }}
                        >
                            Lista de Eventos
                        </Button>
                    </Link>
                </Stack>
        </Flex>

        </Box>
       
)}

export default HomePage;
