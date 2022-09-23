import React, { useState } from 'react';
import {
  Button, VStack, Heading, Image, Box, HStack, Stack, Text,
  Container, AspectRatio,
  Select, Textarea, Input,
} from '@chakra-ui/react';
import InputField from '../components/InputField';
import { Formik } from "formik";
import * as Yup from "yup";
import { ImageUpload } from './ImageUpload';

export const ListingForm = () => {
  const [imagesSource, setImagesSource] = useState([])

  return (
    <Formik
      initialValues={{ model: "", class: "", coe: "", minPrice: "", maxPrice: "", description: "" }}
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
        description: Yup.string(),
        images: Yup.mixed()
          .required("Image is required")
      })}
      onSubmit={async (values, actions) => {
        alert(JSON.stringify(values, null, 2));
        // try {

        // } catch (error) {
        //   setError(error.message)
        //   console.log(error)
        // }  
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
                onChange={(e) => {
                  formik.setFieldValue('images', e.currentTarget.files[0]);
                  console.log('target files[0] below')
                  console.log(e.currentTarget.files[0])
                  console.log('values.images below')
                  console.log(formik.values.images)
                  if (e.target.files) {
                    [...e.target.files].map(async (file) => {
                      const source = await URL.createObjectURL(file)
                      console.log(source)
                      await setImagesSource(prev => [...prev, source])
                      console.log(imagesSource)
                    })
                  }
                }}
              />
            </Box>
          </Box>
          {formik.errors.images && <Box color='#e53e3e'>{formik.errors.images}</Box>}
          {imagesSource.length !== 0 && (
            <HStack>
              {imagesSource.map(source => (
                <Image src={source} boxSize='200px' objectFit='contain' mx={2}/>
              ))}
            </HStack>
          )}
          <Button type='submit' colorScheme='red'>
            Submit
          </Button>
        </VStack>
      )}
    </Formik >
  )
}

