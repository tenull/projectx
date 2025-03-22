import { Container } from "@chakra-ui/react";
import { Navigate, useLocation } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { DeleteIcon } from '@chakra-ui/icons';
import {
    Badge,
    Box,
    Select,
    Button,
    Flex,
    FormControl,
    FormLabel,
    Input,
    Switch,
    Td,
    Textarea,
    Tr,
    VStack,
    useDisclosure,
    Text,
    Tbody,
    Tooltip,
    Spacer,
    useToast,
    Image,
	Collapse
} from '@chakra-ui/react';
import { ChevronDownIcon,ChevronUpIcon } from "@chakra-ui/icons";
import { useRef, useState, useEffect } from 'react';

import { useDispatch } from 'react-redux';
import { uploadProduct } from "../../redux/actions/adminActions";
import axios from "axios";

const AddNewProductScreen = () => {

    const { userInfo } = useSelector((state) => state.user);
    const location = useLocation();
    const { error, loading } = useSelector((state) => state.admin);
    const { products, productUpdate } = useSelector((state) => state.product);
    const toast = useToast();
    const dispatch = useDispatch()
    
	const [name, setName] = useState('');
	const [price, setPrice] = useState('');
	const [brand, setBrand] = useState('');
	const [stock, setStock] = useState('');
	const [description, setDescription] = useState('');
	const [ingredients, setIngredients] = useState('');
	const [image, setImage] = useState('');
	const [packingOf, setPackingOf] = useState('');
	const [cookingTime, setCookingTime] = useState('');
	const [packaking, setPackaking] = useState('');
    const [packing, setPacking] = useState('');
    const [productIsNew, setProductIsNew] = useState('');
    const [type, setType] = useState('');
	const [showNutritional, setShowNutritional] = useState(false);
	const [nutrionalValue, setNutrionalValue] = useState({
		energy: '1644 kJ / 389 kcal',
		fat: '4,62g',
		saturedFat: '1,48g',
		carbohydrates: '70,48g',
		sugar: '2,74g',
		protein: '14,67g',
		salt: '0,153g',
	});
    
    const createNewProduct = () => {
        dispatch(uploadProduct({
            name,
			price,
			brand,
			stock,
			description,
			ingredients,
			image,
			packingOf,
			cookingTime,
			packaking, 
            packing,
            productIsNew,
            type,
            nutrionalValue: [nutrionalValue]
        }))
    }

    useEffect(() => {
        if (productUpdate) {
            toast({
                description: 'A termék frissítve lett.',
                status: 'success',
                isClosable: true,
            });
        }
    }, [dispatch, toast, productUpdate]);



    return userInfo && userInfo.isAdmin ? (

        <Container maxW='container.md' my={5}>
            <Text fontSize='xl' fontWeight='bold' my={10} textAlign='center'>Új termék hozzáadása</Text>

            <FormControl mb={3}>
						<FormLabel>Név</FormLabel>
						<Input value={name} onChange={(e) => setName(e.target.value)} />
					</FormControl>
					<FormControl mb={3}>
						<FormLabel>Ár</FormLabel>
						<Input type='number' value={price} onChange={(e) => setPrice(e.target.value)} />
					</FormControl>
					<FormControl mb={3}>
						<FormLabel>Márka</FormLabel>
						<Input value={brand} onChange={(e) => setBrand(e.target.value)} />
					</FormControl>
					<FormControl mb={3}>
						<FormLabel>Készleten</FormLabel>
						<Input type='number' value={stock} onChange={(e) => setStock(e.target.value)} />
					</FormControl>
					<FormControl mb={3}>
						<FormLabel>Leírás</FormLabel>
						<Textarea value={description} onChange={(e) => setDescription(e.target.value)} />
					</FormControl>
					<FormControl mb={3}>
						<FormLabel>Összetevők</FormLabel>
						<Textarea value={ingredients} onChange={(e) => setIngredients(e.target.value)} />
					</FormControl>
					<FormControl mb={3}>
						<FormLabel>Kép</FormLabel>
						<Input 
							value={image} 
							onChange={(e) => setImage(e.target.value)} 
							placeholder="http://image1.com,http://image2.com"
						/>
					</FormControl>
					<FormControl mb={3}>
						<FormLabel>Csomagolás(hány tojásos)</FormLabel>
						<Input type='number' value={packingOf} onChange={(e) => setPackingOf(e.target.value)} />
					</FormControl>
					<FormControl mb={3}>
						<FormLabel>Főzési idő</FormLabel>
						<Input value={cookingTime} onChange={(e) => setCookingTime(e.target.value)} />
					</FormControl>
					<FormControl mb={3}>
						<FormLabel>Csomagolás(súly)</FormLabel>
						<Input value={packaking} onChange={(e) => setPackaking(e.target.value)} />
					</FormControl>
                    <FormControl mb={3}>
						<FormLabel>Csomagolás(lakossági,gyűjtő)</FormLabel>
						<Input value={packing} onChange={(e) => setPacking(e.target.value)} />
					</FormControl>
                    <FormControl mb={3}>
						<FormLabel>Tipus(levestészta,körettészta)</FormLabel>
						<Input value={type} onChange={(e) => setType(e.target.value)} />
					</FormControl>
					<Button
						leftIcon={showNutritional ? <ChevronUpIcon /> : <ChevronDownIcon />}
						w='100%'
						colorScheme='blue'
						variant='outline'
						mb={3}
						onClick={() => setShowNutritional(!showNutritional)}
					>
						{showNutritional ? 'Tápértékek elrejtése' : 'Tápértékek megjelenítése'}
					</Button>
					{/* Tápértékek mezők */}
					<Collapse in={showNutritional} animateOpacity>
					<FormControl mb={3}>
						<FormLabel>Tápérték - energiatartalom</FormLabel>
						<Input 
							value={nutrionalValue.energy} 
							onChange={(e) => setNutrionalValue({ ...nutrionalValue, energy: e.target.value })} 
						/>
					</FormControl>
					<FormControl mb={3}>
						<FormLabel>Tápérték - Zsír</FormLabel>
						<Input 
							value={nutrionalValue.fat} 
							onChange={(e) => setNutrionalValue({ ...nutrionalValue, fat: e.target.value })} 
						/>
					</FormControl>
					<FormControl mb={3}>
						<FormLabel>Tápérték - telített zsírsavak</FormLabel>
						<Input 
							value={nutrionalValue.saturedFat} 
							onChange={(e) => setNutrionalValue({ ...nutrionalValue, saturedFat: e.target.value })} 
						/>
					</FormControl>
					<FormControl mb={3}>
						<FormLabel>Tápérték - Szénhidrát</FormLabel>
						<Input 
							value={nutrionalValue.carbohydrates} 
							onChange={(e) => setNutrionalValue({ ...nutrionalValue, carbohydrates: e.target.value })} 
						/>
					</FormControl>
					<FormControl mb={3}>
						<FormLabel>Tápérték - Cukor</FormLabel>
						<Input 
							value={nutrionalValue.sugar} 
							onChange={(e) => setNutrionalValue({ ...nutrionalValue, sugar: e.target.value })} 
						/>
					</FormControl>
					<FormControl mb={3}>
						<FormLabel>Tápérték - Fehérje</FormLabel>
						<Input 
							value={nutrionalValue.protein} 
							onChange={(e) => setNutrionalValue({ ...nutrionalValue, protein: e.target.value })} 
						/>
					</FormControl>
					<FormControl mb={3}>
						<FormLabel>Tápérték - Só</FormLabel>
						<Input 
							value={nutrionalValue.salt} 
							onChange={(e) => setNutrionalValue({ ...nutrionalValue, salt: e.target.value })} 
						/>
					</FormControl>
					</Collapse>
                    <FormControl display='flex' alignItems='center'>
                <FormLabel htmlFor="productIsNewFlag" my='5' fontSize='sm'>
                    Akciós
                    <Badge rounded='full' px='1' mx='1' fontSize='0.8em' colorScheme='green'>AKCIÓ</Badge>
                    jelvény hozzáadása?
                </FormLabel>
                <Switch id="productIsNewFlag" onChange={() => setProductIsNew(!productIsNew)} isChecked={productIsNew} />
            </FormControl>
         
            <VStack>
                <Button variant='outline' w='160px' colorScheme="cyan" onClick={createNewProduct}><Text ml='2'>Termék mentése</Text></Button>
            </VStack>




        </Container>
    ) : (
        <Navigate to='/' replace={true} state={{ from: location }} />
    );


}

export default AddNewProductScreen;