import React, { useContext, useState } from 'react';
import {
  Alert, AlertIcon, AlertDescription, Box, Flex,
} from '@chakra-ui/react';
import { AuthContext } from '../context/Authentication';
import { ListingForm } from '../components/Auction/ListingForm'


//page for adding auction item
function Sell() {
  const [error, setError] = useState('')
  const { currentUser } = useContext(AuthContext)
  return (
    <Flex justifyContent='center'>
      {error &&
          <Alert status='error'>
            <AlertIcon />
            <AlertDescription>{error}</AlertDescription>
          </Alert>
        }
      {
        currentUser ?
          <ListingForm /> : (
            <Alert status='error' w='50%' justifyContent='center'>
              <AlertIcon />
              <AlertDescription>Please login/register first</AlertDescription>
            </Alert>
          )
      }
    </Flex>
  )
}

export default Sell