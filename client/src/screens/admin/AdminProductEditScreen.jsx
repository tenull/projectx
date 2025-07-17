import {
	Box,
	Button,
	FormControl,
	FormLabel,
	Input,
	Spinner,
	Textarea,

	Badge,
	Switch,
	Collapse
} from '@chakra-ui/react';
import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useParams, useNavigate } from 'react-router-dom';
import { getProductDetails } from '../../redux/actions/productActions';
import { updateProduct } from '../../redux/actions/adminActions';
import { Link } from 'react-router-dom';
import { ChevronDownIcon, ChevronUpIcon } from '@chakra-ui/icons';
const AdminProductEditScreen = () => {
	const { id: productId } = useParams();
	const dispatch = useDispatch();
	const navigate = useNavigate();
	const { product, loading,productUpdate } = useSelector((state) => state.product);
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
	const [type,setType]=useState('')
	const [productIsNew, setProductIsNew] = useState('');
	const [showNutritional, setShowNutritional] = useState(false);
	const [nutrionalValue, setNutrionalValue] = useState({
		energy: '',
		fat: '',
		saturedFat: '',
		carbohydrates: '',
		sugar: '',
		protein: '',
		salt: '',
	});



	useEffect(() => {
		if (!product || product._id !== productId) {
			dispatch(getProductDetails(productId));
		} else {
			setName(product.name);
			setPrice(product.price);
			setBrand(product.brand);
			setStock(product.stock);
			setDescription(product.description);
			setIngredients(product.ingredients);
			setImage(product.image);
			setPackingOf(product.packingOf);
			setCookingTime(product.cookingTime);
			setPackaking(product.packaking);
			setProductIsNew(product.productIsNew)
			setNutrionalValue(product.nutrionalValue[0] || {});
			setType(product.type)
			setPacking(product.packing)
		}
	}, [dispatch, product, productId,productUpdate]);

	const submitHandler = () => {
		dispatch(
			updateProduct(
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
				nutrionalValue,
				type,
				productId,

			));
		// toast({ description: 'Product updated!', status: 'success', isClosable: true });
		navigate('/admin/termekek');
	};

	return (
		<Box p={4}>
			{loading ? (
				<Spinner size='xl' color='cyan.500' />
			) : (
				<form onSubmit={submitHandler}>
					<Button to='/admin/termekek' as={Link} maxW='80px'>
						Vissza
					</Button>
					<FormControl display='flex' justifyContent='space-between' alignItems='center'>
						<FormLabel htmlFor='productIsNewFlag' mt={3} mb='3' fontSize='sm'>
							<Badge rounded='full' px='1' mx='1' fontSize='0.8em' colorScheme='green' >
								AKCIÓ
							</Badge>
						</FormLabel>
						<Switch id='productIsNewFlag' onChange={() => setProductIsNew(!productIsNew)} isChecked={productIsNew} />
					</FormControl>
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
						<FormLabel>Tipus(körettészta,levestészta)</FormLabel>
						<Input value={type} onChange={(e) => setType(e.target.value)} />
					</FormControl>
					{/* Tápértékek mezők */}
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
					{
						<Collapse in={showNutritional} animateOpacity>
							<Box>
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
							</Box></Collapse>}
					<Button type='submit' colorScheme='blue' mr={3}>
						Termék frissítése
					</Button>
					<Button onClick={() => navigate('/admin/termekek')} colorScheme='gray'>
						Mégse
					</Button>
				</form>
			)}
		</Box>
	);
};

export default AdminProductEditScreen;
