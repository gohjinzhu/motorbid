import { useParams } from 'react-router-dom';
import React, { useEffect, useState } from 'react'
import { Box, Flex, Text } from "@chakra-ui/react";
import { FaBed, FaBath, FaVectorSquare } from 'react-icons/fa';
import millify from 'millify';
import { db } from '../config/firebase';
import { doc, getDoc } from "firebase/firestore";
import ImagesScrollbar from "../components/ImageScrollbar";

const AuctionItem = () => {

  const { id } = useParams();
  const [item, setItem] = useState([])

  useEffect(() => {

    const fetchData = async () => {
      const docRef = doc(db, "item", id);
      const docSnap = await getDoc(docRef);
      // const promisedsetItem = (newState) => new Promise(resolve => resolve(setItem(newState)));

      if (docSnap.exists()) {
        console.log("Document data:", docSnap.data());
        setItem(docSnap.data())
      } else {
        // doc.data() will be undefined in this case
        console.log("No such document!");
      }
    }
    fetchData();

  }, [])

  // useEffect(() => {
  //     const { purpose, title, district, postalCode, unitNumber, itemName, itemType, tenure, bedroom, bathroom, price, rentalType, availability, description, images } = item

  // }, [item])

  return (
    <Box maxWidth='1000px' margin='auto' p='4'>
      {item.images && <ImagesScrollbar data={item.images} />}
      <Box w='full' p='6'>

        <Flex flexWrap='wrap' justifyContent='space-between' color='blue.400'>
          <Text fontSize='xl' fontWeight='bold'>{item.bedroom} room {item.itemType} | {item.rentalType} </Text>
          <Text fontSize='xl' fontWeight='bold' textTransform='uppercase'>{item.itemName}</Text>
        </Flex>
        <Flex flexWrap='wrap' justifyContent='space-between' fontWeight='bold' textTransform='capitalize'>
          <Text fontSize='lg'>{item.purpose} at S${millify(item.price)}</Text>
          <Text fontSize='lg'>{item.streetName}</Text>
        </Flex>
        <Flex flexWrap='wrap' textTransform='capitalize' justifyContent='space-between' >
          <Text fontSize='lg' >[negotiable][featured]</Text>
          <Text fontSize='lg' >{item.district}</Text>
        </Flex>
        <Flex flexWrap='wrap' textTransform='capitalize' justifyContent='space-between' >
          <Flex alignItems='center' p='1' justifyContent='space-between' w='250px' fontSize='lg'>
            {/* {bedroom} <FaBed /> | {bathroom} <FaBath /> | {millify(area)} sqft <BsGridFill /> */}
            <FaBed />{item.bedroom}  <FaBath />{item.bathroom}   <FaVectorSquare />{millify(item.area)} sqft
          </Flex>
          <Flex justifyContent='space-between'>
            <button variant="link"><img src="https://cdn0.iconfinder.com/data/icons/social-flat-rounded-rects/512/whatsapp-512.png" alt="whatsapp" width="23px" height="23px" /></button> | {item.contact}</Flex>
        </Flex>
        <br />

        <Text fontSize='lg' textTransform='uppercase' fontWeight='bold' color='blue.400'>
          item details
        </Text>
        <Flex flexWrap='wrap' textTransform='sentencecase' justifyContent='space-between' >
          <Flex justifyContent='space-between' w='400px' borderBottom='1px' borderColor='gray.100' p='3'>
            <Text>item type</Text>
            <Text fontWeight='bold'>{item.itemType}</Text>
          </Flex>
          <Flex justifyContent='space-between' w='400px' borderBottom='1px' borderColor='gray.100' p='3'>
            <Text>Condos & ECs Type</Text>
            <Text fontWeight='bold'>{item.condoType}</Text>
          </Flex>
          <Flex justifyContent='space-between' w='400px' borderBottom='1px' borderColor='gray.100' p='3'>
            <Text>TOP</Text>
            <Text fontWeight='bold'>{item.top}</Text>
          </Flex>
          <Flex justifyContent='space-between' w='400px' borderBottom='1px' borderColor='gray.100' p='3'>
            <Text>Tenure</Text>
            <Text fontWeight='bold'>{item.tenure}</Text>
          </Flex>
          <Flex justifyContent='space-between' w='400px' borderBottom='1px' borderColor='gray.100' p='3'>
            <Text>Floor level</Text>
            <Text fontWeight='bold'>{item.level}</Text>
          </Flex>
          <Flex justifyContent='space-between' w='400px' borderBottom='1px' borderColor='gray.100' p='3'>
            <Text>Furnishings</Text>
            <Text fontWeight='bold'>{item.furnishings}</Text>
          </Flex>
          <Flex justifyContent='space-between' w='400px' borderBottom='1px' borderColor='gray.100' p='3'>
            <Text>Lease</Text>
            <Text fontWeight='bold'>{item.lease}</Text>
          </Flex>
          <Flex justifyContent='space-between' w='400px' borderBottom='1px' borderColor='gray.100' p='3'>
            <Text>Available date</Text>
            <Text fontWeight='bold'>{item.availability}</Text>
          </Flex>
          <Flex justifyContent='space-between' w='400px' borderBottom='1px' borderColor='gray.100' p='3'>
            <Text>Listing date</Text>
            <Text fontWeight='bold'>{item.created}</Text>
          </Flex>
        </Flex>
        <Box marginTop='2'>
          <Text fontSize='lg' textTransform='uppercase' fontWeight='bold' color='blue.400'>
            description
          </Text>
          <Text lineHeight='2' color='gray.600'>{item.description}</Text>
          {/* <Text fontSize='lg'>
                        {item.description.length > 30 ? `${description.substring(0, 30)}...` : description}
                    </Text> */}
        </Box>
        <Box marginTop='2'>
          <Text lineHeight='2' color='gray.600'>{item.note}</Text>
        </Box>
      </Box>
    </Box>
  )
};

export default AuctionItem;