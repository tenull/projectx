import { useState,useEffect } from "react";
import { Flex, Box, FormControl, Checkbox } from "@chakra-ui/react";
import TextField from "./TextField";
import { useFormikContext } from "formik";
import { useSelector } from "react-redux";

const OrderBillingData = () => {
    const {  setFieldValue } = useFormikContext(); 
    const { shippingAddress } = useSelector((state) => state.order); 
    const [sameAsShipping, setSameAsShipping] = useState(false);

    const handleCheckboxChange = (e) => {
        const isChecked = e.target.checked;
        setSameAsShipping(isChecked);

        if (isChecked) {
            setFieldValue("billingAddress", shippingAddress.address);
            setFieldValue("billingPostalCode", shippingAddress.postalCode);
            setFieldValue("billingCity", shippingAddress.city);
            setFieldValue("billingPhone", shippingAddress.phone);
        } else {
            setFieldValue("billingAddress", "");
            setFieldValue("billingPostalCode", "");
            setFieldValue("billingCity", "");
            setFieldValue("billingPhone", "");
        }
    };

    useEffect(() => {
        if (sameAsShipping) {
            localStorage.setItem('billingAddress', JSON.stringify({
                billingAddress: shippingAddress.address,
                billingPostalCode: shippingAddress.postalCode,
                billingCity: shippingAddress.city,
                billingPhone: shippingAddress.phone,
            }));
        } else {
          
            localStorage.removeItem('billingAddress');
        }
    }, [sameAsShipping, shippingAddress]);

    return (
        <FormControl>
            <Checkbox isChecked={sameAsShipping} onChange={handleCheckboxChange} mb={4}>
                Megegyezik a szállítási adatokkal
            </Checkbox>
            <TextField name="billingName" placeholder="név/cégnév" label="Név/cégnév" />
            <Flex>
                
                <Box flex="1" mr="10">
                    <TextField name="billingPostalCode" placeholder="Irányítószám" label="Irányítószám" type="number" />
                </Box>
                <Box flex="2">
                    <TextField name="billingCity" placeholder="Város" label="Város" />
                </Box>
            </Flex>
            <TextField name="billingAddress" placeholder="Utca, házszám" label="Utca, házszám" />
            <TextField name="billingPhone" placeholder="Telefonszám" label="Telefonszám" type="number" />
        </FormControl>
    );
};

export default OrderBillingData;
