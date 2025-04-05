import { Flex, Box, FormControl } from "@chakra-ui/react";
import TextField from "./TextField";
import TextArea from "./TextArea";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { setShippingAddress } from "../redux/slices/order";

const OrderDetailsForm = () => {
  const { shippingAddress } = useSelector((state) => state.order);
  const dispatch = useDispatch();

  const [formValues, setFormValues] = useState({
    address: shippingAddress ? shippingAddress.address : "",
    postalCode: shippingAddress ? shippingAddress.postalCode : "",
    city: shippingAddress ? shippingAddress.city : "",
    phone: shippingAddress ? shippingAddress.phone : "",
    comment: shippingAddress ? shippingAddress.comment : "",
    billingName: shippingAddress ? shippingAddress.billingName : "",
    billingAddress: shippingAddress ? shippingAddress.billingAddress : "",
    billingPostalCode: shippingAddress ? shippingAddress.billingPostalCode : "",
    billingCity: shippingAddress ? shippingAddress.billingCity : "",
    billingPhone: shippingAddress ? shippingAddress.billingPhone : "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    console.log(`Changing ${name} to ${value}`);
    setFormValues({
      ...formValues,
      [name]: value,
    });
  };

  useEffect(() => {
    if (formValues) {
      console.log("Form Values Updated:", formValues)
      dispatch(setShippingAddress(formValues));
    }
  }, [formValues, dispatch]);


  useEffect(() => {
    if (shippingAddress) {
      localStorage.setItem('shippingAddress', JSON.stringify(shippingAddress));
    }
  }, [shippingAddress]);

  return (
    <FormControl>
      <Flex>
        <Box flex="1" mr="10">
          <TextField
            name="postalCode"
            placeholder="Irányítószám"
            label="Irányítószám"
            type="number"
            value={formValues.postalCode}
            onChange={handleChange} 
                      />
        </Box>
        <Box flex="2">
          <TextField
            name="city"
            placeholder="Város"
            label="Város"
            value={formValues.city}
            onChange={handleChange} 
          />
        </Box>
      </Flex>
      <TextField
        name="address"
        placeholder="Utca, házszám"
        label="Utca, házszám"
        value={formValues.address}
        onChange={handleChange} 
      />
      <TextField
        name="phone"
        placeholder="Telefonszám"
        label="Telefonszám"
        type="number"
        value={formValues.phone}
        onChange={handleChange}
      />
      <TextArea
        name="comment"
        placeholder="Megjegyzés szállítási idővel kapcsolatban stb."
        label="Megjegyzés"
        value={formValues.comment}
        onChange={handleChange} 
      />
    </FormControl>
  );
};

export default OrderDetailsForm;
