import React, { useContext, useState } from 'react';
import {
    Modal, ModalOverlay, ModalContent, ModalHeader, ModalBody, ModalCloseButton, useDisclosure,
    Button,Input,Flex, VStack,
    Alert, AlertIcon, AlertDescription,
} from '@chakra-ui/react';
import InputField from '../InputField';
import { Formik } from "formik";
import { AuthContext } from '../../context/Authentication';

function Login() {
    const { isOpen, onOpen, onClose } = useDisclosure()
    const [error, setError] = useState('')
    const { login } = useContext(AuthContext)

    return (
        <>
            <Button onClick={onOpen}>Login</Button>
            <Modal isOpen={isOpen} onClose={onClose}>
                <ModalOverlay />
                <ModalContent>
                    <ModalHeader>Login</ModalHeader>
                    <ModalCloseButton />
                    <ModalBody>
                        {error &&
                            <Alert status='error' mb={3}>
                                <AlertIcon />
                                <AlertDescription>{error}</AlertDescription>
                            </Alert>
                        }
                        <Formik
                            initialValues={{ email: "", password: "", confirmPassword: "", }}
                            onSubmit={async (values, actions) => {
                                try {
                                    await login(values.email, values.password)
                                    onClose()
                                } catch (error) {
                                    setError(error.message)
                                }
                            }}
                        >
                            {formik => (
                                <VStack as='form' onSubmit={formik.handleSubmit} spacing={3}>
                                    <InputField as={Input} name="email" type="email" placeholder=" " label="Email" />
                                    <InputField as={Input} name="password" type="password" placeholder=" " label="Password" />
                                    <Flex my={3} justifyContent='flex-end'>
                                        <Button type='submit' colorScheme='blue'>
                                            Submit
                                        </Button>
                                    </Flex>
                                </VStack>
                            )}
                        </Formik>
                    </ModalBody>
                </ModalContent>
            </Modal>
        </>
    )
}

export default Login