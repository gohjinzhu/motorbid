import React, { useContext, useState } from 'react';
import {
    Modal, ModalOverlay, ModalContent, ModalHeader, ModalBody, ModalCloseButton, useDisclosure,
    Button,
    Input,
    Flex,
    Alert, AlertIcon, AlertDescription, VStack,
} from '@chakra-ui/react';
import InputField from './InputField';
import { Formik } from "formik";
import * as Yup from "yup";
import { AuthContext } from '../context/Authentication';
import { collection, addDoc } from "firebase/firestore";

function AddAuction() {
    const { isOpen, onOpen, onClose } = useDisclosure()
    const [error, setError] = useState('')
    const { register } = useContext(AuthContext)



    return (
        <>
            <Button onClick={onOpen}>nope</Button>
            <Modal isOpen={isOpen} onClose={onClose}>
                <ModalOverlay />
                <ModalContent>
                    <ModalHeader>List your motorbike</ModalHeader>
                    <ModalCloseButton />
                    <ModalBody>
                        {error && <Alert status='error'>
                            <AlertIcon />
                            <AlertDescription>{error}</AlertDescription>
                        </Alert>
                        }
                        <Formik
                            initialValues={{ email: "", password: "", confirmPassword: "", }}
                            validate={validate}
                            validationSchema={Yup.object({
                                email: Yup.string()
                                    .required("email required")
                                    .email('Invalid email address'),
                                password: Yup.string()
                                    .required("password required")
                                    .min(6, "Password minimum length is 6 characters"),
                                confirmPassword: Yup.string()
                                    .required("password confirmation is required")
                            })}
                            onSubmit={async (values, actions) => {
                                alert(JSON.stringify(values, null, 2));
                                try {
                                    const docRef = await addDoc(collection(db, "users"), {
                                        first: "Ada",
                                        last: "Lovelace",
                                        born: 1815
                                    });
                                    console.log("Document written with ID: ", docRef.id);
                                    onClose()
                                } catch (e) {
                                    setError(e.message)
                                    console.error("Error adding document: ", e);
                                }
                            }}
                        >
                            {formik => (
                                <form onSubmit={formik.handleSubmit}>
                                    <InputField as={Input} name="email" type="email" placeholder=" " label="Email" />
                                    <InputField as={Input} name="password" type="password" placeholder=" " label="Password" />
                                    <InputField as={Input} name="confirmPassword" type="password" placeholder=" " label="Confirm password" />
                                    <Flex my={3} justifyContent='flex-end'>
                                        <Button type='submit' colorScheme='blue'>
                                            Submit
                                        </Button>
                                    </Flex>
                                </form>
                            )}
                        </Formik>
                    </ModalBody>
                </ModalContent>
            </Modal>
        </>
    )
}

export default AddAuction