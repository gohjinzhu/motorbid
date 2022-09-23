import {
  FormControl, FormErrorMessage, FormLabel,
} from "@chakra-ui/form-control";
import { InputGroup, InputLeftElement } from "@chakra-ui/react";
import { Field, useField } from "formik";

const InputField = ({ label, symbol, ...props }) => {
  const [field, meta] = useField(props);
  return (
    <InputGroup>
      <InputLeftElement
        pointerEvents='none'
        children={symbol}
      />
      <FormControl isInvalid={meta.error && meta.touched} variant="floating">
        <Field  {...field} {...props} />
        <FormLabel>{label}</FormLabel>
        <FormErrorMessage>{meta.error}</FormErrorMessage>
      </FormControl>
    </InputGroup>
  );
};


export default InputField;