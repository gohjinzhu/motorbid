import React, { useState, useContext } from 'react';
import {
  Button, VStack, Heading, Image, Box, HStack, Stack, Text,
  Select, Textarea, Input,
  Alert, AlertIcon, AlertDescription,
} from '@chakra-ui/react';
import InputField from '../InputField';
import { Formik } from "formik";
import * as Yup from "yup";
import { collection, addDoc, serverTimestamp } from "firebase/firestore";
import { db, storage } from '../../config/firebase';
import { ref, uploadBytesResumable, getDownloadURL } from 'firebase/storage';
import { AuthContext } from '../../context/Authentication';

export const ListingForm = () => {
  const { currentUser } = useContext(AuthContext)

  const [error, setError] = useState('')
  const supportedImageFormat = ["image/jpg", "image/jpeg", "image/gif", "image/png"]
  const [imagesSource, setImagesSource] = useState([])

  const uploadImage = (image) => {
    return new Promise((resolve, reject) => {
      //storing each image in firebase storage
      const storageRef = ref(storage, 'images/' + image.name);
      const uploadTask = uploadBytesResumable(storageRef, image);
      uploadTask.on('state_changed',
        (snapshot) => {
          // Get task progress, including the number of bytes uploaded and the total number of bytes to be uploaded
          const progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
          console.log('Upload is ' + progress + '% done');
        },
        (error) => {
          console.log(error)
          setError(error.message)
          reject(error)
        },
        async () => {
          // Upload completed successfully, now we can get the download URL
          await getDownloadURL(uploadTask.snapshot.ref).then((downloadURL) => {
            console.log('File available at', downloadURL);
            resolve(downloadURL)
          });
        }
      );
    })
  }

  const uploadImages = (images) => {
    const imagesUrlPromise = images.map(image => {
      return uploadImage(image)
    })
    return imagesUrlPromise;
  }

  return (
    <VStack>
      {error &&
        <Alert status='error' mb={3}>
          <AlertIcon />
          <AlertDescription>{error}</AlertDescription>
        </Alert>
      }
      <Formik
        initialValues={{ model: "", class: "", coe: "", minPrice: "", maxPrice: "", duration: "", description: "", images: [] }}
        validationSchema={Yup.object({
          model: Yup.string()
            .required("Model is required"),
          class: Yup.string()
            .required("Please select your motorbike class"),
          coe: Yup.date()
            .min(new Date(), "Expired COE")
            .required("COE expiry date is required"),
          minPrice: Yup.string()
            .required("Minimum acceptable price is required"),
          maxPrice: Yup.string()
            .required("Buy-it-now price is required"),
          duration: Yup.string()
            .required("Duration is required"),
          description: Yup.string(),
          images: Yup.mixed()
            .required("Image is required")
            .test(
              "fileFormat",
              "Unsupported Format",
              values => {
                const testing = values.map(value => (supportedImageFormat.includes(value.type)))
                return !testing.includes(false)
              }
            )
        })}
        onSubmit={async (values, actions) => {
          // alert(JSON.stringify(values, null, 2));
          console.log(currentUser)
          const imagesUrlPromise = await uploadImages(values.images)
          Promise.all(imagesUrlPromise)
            .then(async (imagesUrl) => {
              //store data in firestore
              try {
                let currentDate = new Date();
                let dueDate = currentDate.setHours(
                  currentDate.getHours() + values.duration
                );
                const docRef = await addDoc(collection(db, "auction"), {
                  author: currentUser.email,
                  model: values.model,
                  class: values.class,
                  coe: values.coe,
                  minPrice: values.minPrice,
                  maxPrice: values.maxPrice,
                  description: values.description,
                  currentBid: 0,
                  dueDate: dueDate,
                  created: serverTimestamp(),
                  images: imagesUrl
                });
                console.log("Document written with ID: ", docRef.id);
              } catch (e) {
                setError(e.message)
                console.error("Error adding document: ", e);
              }
            })
          actions.resetForm()
          setError(null)
          setImagesSource(null)
        }}
      >
        {formik => (
          <VStack
            as="form"
            mx="auto"
            w={{ base: "90%", md: 500 }}
            justifyContent="center"
            onSubmit={formik.handleSubmit}
            spacing={5}
          >
            <Heading>Your Motorbike</Heading>
            <InputField as={Input} name="model" placeholder=" " label="Model" />
            <InputField as={Select} name="class" label="Class">
              <option value="" defaultValue disabled hidden>Select Class</option>
              <option value='2B'>2B</option>
              <option value='2A'>2A</option>
              <option value='2'>2</option>
            </InputField>
            <InputField as={Input} name="coe" type='date' placeholder=" " label="COE expiry date" />
            <InputField as={Input} name="minPrice" type='number' placeholder=" " label="Minimum Price (Reserve Price)" symbol='S$' pl='40px' />
            <InputField as={Input} name="maxPrice" type='number' placeholder=" " label="Buy-it-now Price" symbol='S$' pl='40px' />
            <InputField as={Input} name="duration" type='number' placeholder="Auction item duration in hours" label="Duration" symbol='S$' pl='40px'/>
            <InputField as={Textarea} name="description" placeholder="Share story of your motorbike" label="Description" />
            <Box
              borderColor="gray.300"
              borderStyle="dashed"
              borderWidth="2px"
              rounded="md"
              shadow="sm"
              role="group"
              transition="all 150ms ease-in-out"
              _hover={{
                shadow: "md"
              }}
            >
              <Box position="relative" height="100%" width="100%">
                <Stack
                  height="100%"
                  width="100%"
                  display="flex"
                  alignItems="center"
                  justify="center"
                  spacing="4"
                >
                  <Stack p="8" textAlign="center" spacing="1">
                    <Heading fontSize="lg" color="gray.700" fontWeight="bold">
                      Drop images here
                    </Heading>
                    <Text fontWeight="light">or click to upload</Text>
                  </Stack>
                </Stack>
                <Input
                  as="input"
                  type='file'
                  name="images"
                  placeholder=" "
                  label="Upload image"
                  accept='image/*'
                  multiple
                  opacity='0'
                  height="100%"
                  width="100%"
                  position="absolute"
                  top="0"
                  left="0"
                  onChange={async (e) => {
                    formik.setFieldValue('images', formik.values.images.concat(...e.target.files))
                      .then(console.log(formik.values.images))

                    if (e.target.files) {
                      [...e.target.files].map(async (file) => {
                        const source = URL.createObjectURL(file)
                        setImagesSource(prev => [...prev, source])
                      })
                    }
                  }}
                />
              </Box>
            </Box>
            {formik.errors.images && <Box color='#e53e3e'>{formik.errors.images}</Box>}
            {imagesSource && imagesSource.length !== 0 && (
              <HStack>
                {imagesSource.map((source, index) => (
                  <Image key={index} src={source} boxSize='200px' objectFit='contain' mx={2} />
                ))}
              </HStack>
            )}
            <Button type='submit' colorScheme='red'>
              Submit
            </Button>
          </VStack>
        )}
      </Formik >
    </VStack >
  )
}

