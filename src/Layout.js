import React from 'react'
import Navbar from './components/Nav/Navbar'
import { Box } from '@chakra-ui/react';

function Layout({ children }) {
    return (
        <Box maxWidth='1280px' m='auto'>
            <header>
                <Navbar />
            </header>
            <main>
                {children}
            </main>
            <Box textAlign='center' p='5' color='gray.600' borderTop='1px' borderColor='gray.100' mt='auto' as='footer'>
                &copy;2022 Motosquare
            </Box>
        </Box>
    )
}

export default Layout