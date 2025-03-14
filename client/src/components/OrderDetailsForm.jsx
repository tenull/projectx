import { Flex,Box,FormControl } from "@chakra-ui/react";
import TextField from "./TextField";
import TextArea from "./TextArea";

const OrderDetailsForm = () => {
    return ( 
        <FormControl>
							<Flex>
								<Box flex="1" mr="10">
									<TextField name="postalCode" placeholder="Irányítószám" label="Irányítószám" type="number" />
								</Box>
								<Box flex="2">
									<TextField name="city" placeholder="Város" label="Város" />
								</Box>
							</Flex>
							<TextField name="address" placeholder="Utca, házszám" label="Utca, házszám" />
							<TextField name="phone" placeholder="Telefonszám" label="Telefonszám" type="number" />
							<TextArea name='comment' placeholder='Megjegyzés szállítási idővel kapcsolatban stb.' label='Megjegyzés' />
						</FormControl>
     );
}
 
export default OrderDetailsForm;