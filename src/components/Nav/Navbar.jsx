import { useContext } from 'react';
import {
  Image, Flex, Button, HStack, VStack, Box, Text, chakra,
  Drawer, DrawerBody, DrawerFooter, DrawerHeader, DrawerOverlay, DrawerContent, DrawerCloseButton, useDisclosure,
  Avatar, Tooltip
} from '@chakra-ui/react';
import Logo from '../../assets/motosquare.jpg';
import DefaultProfilePicture from '../../assets/defaultProfilePicture.png';
import { Link } from '@chakra-ui/react'
import React from "react";
import { IoMdMenu } from 'react-icons/io';
import { Link as RouteLink, useLocation } from "react-router-dom";
import Register from './Register';
import Login from './Login';
import { AuthContext } from '../../context/Authentication';

export default function Navbar() {
  const { currentUser, logout } = useContext(AuthContext)
  const pathname = useLocation().pathname;

  return (
    <chakra.header id="header">
      <Flex
        w="100%"
        px={{ base: '10', md: 'auto' }}
        py="5"
        align="center"
        justify='space-between'
      >
        <Box>
          <Link as={RouteLink} to='/'>
            <Image src={Logo} w="70px" h="70px" minW="100%" alt='logo' />
          </Link>
        </Box>
        <HStack as="nav" spacing="5" display={{ base: "none", md: "flex" }}>
          <Link as={RouteLink} to='/auction' style={{ textDecoration: 'none' }}>
            <Button variant={pathname === '/auction' ? 'active' : 'link'}>Auction</Button>
          </Link>
          <Link as={RouteLink} to='/sell' style={{ textDecoration: 'none' }}>
            <Button variant={pathname === '/sell' ? 'active' : 'link'}>Sell</Button>
          </Link>
          <Link as={RouteLink} to='/news' style={{ textDecoration: 'none' }}>
            <Button variant={pathname === '/news' ? 'active' : 'link'}>News</Button>
          </Link>
          <Link as={RouteLink} to='/forum' style={{ textDecoration: 'none' }}>
            <Button variant={pathname === '/forum' ? 'active' : 'link'}>Forum</Button>
          </Link>
        </HStack>

        <HStack display={{ base: "flex", md: "none" }}>
          <MobileDrawer />
        </HStack>
        <HStack>
          {currentUser ? (
            <>
              <Tooltip label={currentUser.email}>
                <Avatar src={DefaultProfilePicture} />
              </Tooltip>
              <Button onClick={() => logout()} variant="solid">Logout</Button>
            </>

          ) : (
            <>
              <Register />
              <Login />
            </>
          )}
        </HStack>
      </Flex>
    </chakra.header>
  );
}

const DrawerExample = ({
  p = 15,
  placement = "right",
  width,
  isOpen,
  children,
  onClose,
  btnRef,
  title =
  <Button variant="nav">
    <Image src={Logo.src} h="70px" />
  </Button>,
  footer,
}) => {
  return (
    <Flex w={width}>
      <Drawer
        isOpen={isOpen}
        placement={placement}
        onClose={onClose}
        finalFocusRef={btnRef}
        size='full'
      >
        <DrawerOverlay />
        <DrawerContent alignItems="center">
          <DrawerCloseButton alignSelf="end" mx={p} my={p} />
          <DrawerHeader my={p}>
            <Text as="p"> {title} </Text>
          </DrawerHeader>
          <DrawerBody>{children}</DrawerBody>
          <DrawerFooter>{footer}</DrawerFooter>
        </DrawerContent>
      </Drawer>
    </Flex>
  );
}

const MobileDrawer = () => {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const btnRef = React.useRef();
  return (
    <Flex display={{ base: "flex", md: "none" }} >
      {/* // Menu Button */}
      <Button ref={btnRef} onClick={onOpen}>
        <IoMdMenu size="26px" />
      </Button>
      {/* // Drawer Component */}
      <DrawerExample
        isOpen={isOpen}
        onClose={onClose}
        finalFocusRef={btnRef}
      >
        <VStack alignItems="center" size='100%'>
          <Link as={RouteLink} to='/register' display={{ base: "none", md: "inline-flex" }} textDecoration='none'>
            <Button variant="dark" textDecoration='none'>Register</Button>
          </Link>
          <Link as={RouteLink} to='/auction'>
            <Button variant="link">Auction</Button>
          </Link>
          <Link as={RouteLink} to='/sell'>
            <Button variant="link">Sell</Button>
          </Link>
          <Link as={RouteLink} to='/news'>
            <Button variant="link">News</Button>
          </Link>
          <Link as={RouteLink} to='/forum'>
            <Button variant="link">Forum</Button>
          </Link>
        </VStack>
      </DrawerExample>
    </Flex>
  );
};


