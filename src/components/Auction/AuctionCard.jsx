import React, { useContext, useRef } from 'react';
import { Link } from "react-router-dom";
import Countdown from 'react-countdown';
import { AuthContext } from '../../context/Authentication';
import { Box, VStack, Text, Flex, Image, Button, Icon, Badge, Input, HStack } from '@chakra-ui/react';
import { MdTimer } from "react-icons/md";
import { doc, updateDoc, deleteDoc } from "firebase/firestore";
import { db } from '../../config/firebase';

const renderer = ({ days, hours, minutes, seconds, completed, props }) => {

    if (completed) {
        return null;
    }

    const bidAuction = async (auctionId, price) => {
        if (!props.currentUser) {
            return props.setMessage('Please login first');
        }

        let newPrice
        if (!props.item.curBid) {
            newPrice = props.item.minPrice
        } else {
            if (price > props.item.curBid) {
                newPrice = price
            } else {
                return props.setMessage('Bid price have to be higher than current price')
            }
        }

        const itemRef = doc(db, "auction", auctionId);

        // Update bid price and winner of item
        await updateDoc(itemRef, {
            curBid: newPrice,
            curWinner: props.currentUser.email
        });
    };

    const endAuction = async (auctionId) => {
        //delete item
        await deleteDoc(doc(db, "auction", auctionId));
    };

    return (
        <Flex
            borderRadius='1.2rem'
            borderWidth='0.1rem'
            borderColor='gray.100'
            m='0.5rem'
            bg='white'
            w={{ base: "315px", md: "345px" }}
            direction='column'
            height='auto'
            justifyContent='start'
            maxHeight='400px'>
            <Box p='20px' height='auto' maxHeight='272px' mb='auto'>
                <Link to={props.item.id}>
                    <Image src={props.item.images[0]} width='300px' height='170px' objectFit='cover' borderRadius='5px' />
                </Link>
                <Box>
                    <Text fontWeight='600' color='gray.800' w='100%' fontSize='xl'>
                        {props.item.model}
                    </Text>
                    <Text fontWeight='100' color='gray.800' w='100%' fontSize='m'>
                        {props.item.description}
                    </Text>
                </Box>
            </Box>
            <Flex
                bg='gray.50'
                w='100%'
                p='20px'
                borderBottomLeftRadius='inherit'
                borderBottomRightRadius='inherit'
                height='100%'
                direction='column'
                maxHeight='150px'>
                <Text
                    fontSize='sm'
                    color='gray.500'
                    lineHeight='24px'
                    pe='40px'
                    fontWeight='500'
                >
                    Reserve price: SGD ${props.item.minPrice}
                </Text>


                {props.currentUser && props.currentUser.email === props.item.curWinner ? (
                    <Flex my={2}>
                        <Text
                            fontSize='sm'
                            color='gray.500'
                            lineHeight='24px'
                            fontWeight='500'
                            mr='1rem'
                        >
                            Current Bid: SGD ${props.item.curBid ? props.item.curBid : 0}
                        </Text>
                        <Badge colorScheme='green' size='sm'>You are winning</Badge>
                    </Flex>
                ) : (
                    <VStack my={2} dir="column" alignItems='left'>
                        <Text
                            fontSize='sm'
                            color='gray.500'
                            lineHeight='24px'
                            fontWeight='500'
                            mr='1rem'
                        >
                            Current Bid: SGD ${props.item.curBid ? props.item.curBid : 0}
                        </Text>
                        <HStack>
                            <Input size='xsm' type='number' maxWidth='70%' mr={3} borderRadius={5} placeholder="Enter bid value" ref={props.bidRef}></Input>
                            <Button onClick={() => bidAuction(props.item.id, props.bidRef.current.value)} height='' colorScheme='red'>Bid</Button>
                        </HStack>
                    </VStack>

                )}
                <Flex>
                    <Flex me='25px'>
                        <Icon as={MdTimer} w='20px' h='20px' me='6px' color='green.400' />
                        <Text color='gray.800' fontSize='sm' my='auto' fontWeight='500'>
                            {days * 24 + hours} hr: {minutes} min: {seconds} sec
                        </Text>
                    </Flex>
                </Flex>
            </Flex>
        </Flex>
    );
};

export const AuctionCard = ({ item, setMessage }) => {
    let expiredDate = item.dueDate;
    const bidRef = useRef();
    const { currentUser } = useContext(AuthContext);

    return (
        <Countdown
            currentUser={currentUser}
            date={expiredDate}
            item={item}
            setMessage={setMessage}
            renderer={renderer}
            bidRef={bidRef}
        />
    );
};
