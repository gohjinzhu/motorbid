import React from 'react'
import Navbar from './components/Navbar'
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
            <footer>
                <Box textAlign='center' p='5' color='gray.600' borderTop='1px' borderColor='gray.100' >
                    &copy;2022 Motorsquare
                </Box>
            </footer>
        </Box>
    )
}

export default Layout