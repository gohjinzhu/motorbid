import React, { useEffect, useState } from 'react'
import { onSnapshot, collection } from "firebase/firestore";
import { db } from './config/firebase';
import { AuctionCard } from './components/Auction/AuctionCard';
import {
  Box, Flex,
  Alert, AlertIcon, AlertTitle
} from '@chakra-ui/react';
import { Outlet } from "react-router-dom";

function App() {
  const [items, setItems] = useState([])
  const [message, setMessage] = useState(null)

  useEffect(() => {
    const unsub = onSnapshot(collection(db, "auction"), (querySnapshot) => {
      const documents = []
      querySnapshot.forEach((doc, index) => {
        documents.push({ ...doc.data(), id: doc.id })
      })
      setItems(documents)
    });
    return () => unsub();

  }, [])

  useEffect(() => {
    const interval = setTimeout(() => setMessage(''), 5000);
    return () => clearTimeout(interval);
  }, [message]);

  return (
    <Box>
      {message &&
        <Alert status='error'>
          <AlertIcon />
          <AlertTitle>{message}</AlertTitle>
        </Alert>
      }

      <Flex justifyContent='start'>
        <Flex mb='auto' justifyContent='flex-start' minHeight='90vh' flexWrap="wrap">
          {
            items.map(item => (
              <AuctionCard item={item} key={item.id} setMessage={setMessage} />
            ))
          }
        </Flex>
      </Flex>
      
    </Box>
  )
}

export default App;
