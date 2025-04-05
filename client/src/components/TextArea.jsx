import { FormControl, FormLabel, Textarea, FormErrorMessage } from "@chakra-ui/react";
import { useField, useFormikContext } from "formik";
import { useDispatch } from "react-redux";
import { setShippingAddress } from "../redux/slices/order"; 

const TextArea = ({ label, name, placeholder }) => {
  const [field, meta] = useField(name);
  const { setFieldValue, values } = useFormikContext();
  const dispatch = useDispatch();

  const handleChange = (e) => {
    const { value } = e.target;
    setFieldValue(name, value);
    dispatch(setShippingAddress({ ...values, [name]: value }));
  };

  return (
    <FormControl isInvalid={meta.touched && meta.error} mb="6">
      <FormLabel htmlFor={name}>{label}</FormLabel>
      <Textarea
        id={name}
        name={name}
        placeholder={placeholder}
        value={values[name]}
        onChange={handleChange}
      />
      <FormErrorMessage>{meta.error}</FormErrorMessage>
    </FormControl>
  );
};

export default TextArea;
