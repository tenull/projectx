import { FormControl, FormLabel, Input, FormErrorMessage } from '@chakra-ui/react';
import { useField, useFormikContext } from 'formik';
import { useDispatch } from 'react-redux';
import { setShippingAddress } from '../redux/slices/order';

const TextField = ({ label, type = "text", name, placeholder }) => {
  const [field, meta] = useField(name);
  const { setFieldValue, values } = useFormikContext();
  const dispatch = useDispatch();

  const handleChange = (e) => {
    const { value } = e.target;
    setFieldValue(name, value); // Frissíti a Formikot
    dispatch(setShippingAddress({ ...values, [name]: value })); // Frissíti Redux-ot
  };

  return (
    <FormControl isInvalid={meta.touched && meta.error} mb="6">
      <FormLabel htmlFor={name}>{label}</FormLabel>
      <Input
        {...field}
        id={name}
        type={type}
        placeholder={placeholder}
        value={values[name]}
        onChange={handleChange} // saját handler
      />
      <FormErrorMessage>{meta.error}</FormErrorMessage>
    </FormControl>
  );
};

export default TextField;
