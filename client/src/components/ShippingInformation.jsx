import {
	Accordion,
	AccordionItem,
	AccordionButton,
	AccordionPanel,
	AccordionIcon,
	Box,
	Button,
	VStack,
	Flex,
	useColorModeValue
} from "@chakra-ui/react";
import { Formik } from "formik";
import { useDispatch, useSelector } from "react-redux";
import * as Yup from "yup";
import { setShipping } from "../redux/actions/cartActions";
import { setAddress, setPayment } from "../redux/actions/orderActions";
import { Link as ReactLink } from "react-router-dom";
import OrderDetailsForm from "./OrderDetailsForm";
import ShippingMethodForm from "./ShippingMethodForm";
import PaymentMethod from "./PaymentMethod";
import { useState } from "react";

const ShippingInformation = () => {
	const { shipping } = useSelector((state) => state.cart);
	const { shippingAddress } = useSelector((state) => state.order);
	const dispatch = useDispatch();
	const [activeIndex, setActiveIndex] = useState(0);

	const bgColor = useColorModeValue("gray.50", "gray.700");
	const activeBg = useColorModeValue("red.300", "red.600");
	const textColor = useColorModeValue("gray.700", "gray.200");

	const onSubmit = async (values) => {
		console.log("onSubmit meghívva!", values);
		dispatch(setAddress(values));
		dispatch(setPayment())
	
	};

	return (
		<Formik
			initialValues={{
				address: shippingAddress ? shippingAddress.address : "",
				postalCode: shippingAddress ? shippingAddress.postalCode : "",
				city: shippingAddress ? shippingAddress.city : "",
				country: shippingAddress ? shippingAddress.country : "",
				phone: shippingAddress ? shippingAddress.phone : "",
				comment:shippingAddress ? shippingAddress.comment : "",

			}}
			validationSchema={Yup.object({
				address: Yup.string().required("Utca, házszám megadása kötelező.").min(2, "A cím túl rövid."),
				postalCode: Yup.string().required("Írányítószám megadása kötelező").min(2, "Irányítószám túl rövid."),
				city: Yup.string().required("Város megadása kötelező.").min(2, "Túl rövid."),
				phone: Yup.string().required("Telefonszám megadása kötelező.").min(2, "Telefonszám túl rövid."),
			})}
			onSubmit={onSubmit}
		>
			{(formik) => (
				<>
					<Accordion allowToggle index={activeIndex !== null ? activeIndex : undefined} w="" maxW="" mx="">
						{[
							{ title: "1. Szállítási adatok", component: <OrderDetailsForm /> },
							{ title: "2. Szállítási mód", component: <ShippingMethodForm /> },
							{ title: "3. Fizetési mód", component: <PaymentMethod /> }
						].map((item, index) => (
							<AccordionItem border="none" key={index}>
								<AccordionButton
									 onClick={() => setActiveIndex(activeIndex === index ? null : index)}
									bg={activeIndex === index ? activeBg : bgColor}
									color={textColor}
									py={4}
									px={6}
									fontWeight="bold"
									borderRadius="lg"
									transition="all 0.3s ease"
									_hover={{ bg: activeBg, boxShadow: "md" }}
								>
									<Box flex="1" textAlign="left">{item.title}</Box>
									<AccordionIcon />
								</AccordionButton>
								<AccordionPanel
									pb={4}
									bg={bgColor}
									borderRadius="lg"
									boxShadow="sm"
									mt={2}
									px={6}
									py={4}
								>
									{item.component}
								</AccordionPanel>
							</AccordionItem>
						))}
					</Accordion>

					<Flex alignItems="center" gap="2" direction={{ base: "column", lg: "row" }}>
						<Button variant="outline" colorScheme="red" w="100%" as={ReactLink} to="/kosar">
							Vissza a kosárhoz
						</Button>
						<Button
							variant="outline"
							colorScheme="red"
							w="100%"
							as={ReactLink}
							to='/payment'
							onClick={formik.handleSubmit}
							isDisabled={activeIndex < 2}
						>
							Fizetés
						</Button>
					</Flex>
				</>
			)}
		</Formik>
	);
};

export default ShippingInformation;
