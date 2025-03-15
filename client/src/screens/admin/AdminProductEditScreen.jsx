import {
	Box,
	Button,
	FormControl,
	FormLabel,
	Input,
	Spinner,
	Textarea,
	useToast,
    Badge,
    Switch
} from '@chakra-ui/react';
import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useParams, useNavigate } from 'react-router-dom';
import { getProductDetails } from '../../redux/actions/productActions';
import { updateProduct } from '../../redux/actions/adminActions';

const AdminProductEditScreen = () => {
	const { id: productId } = useParams();
	const dispatch = useDispatch();
	const navigate = useNavigate();
	const toast = useToast();
    console.log("Product ID from useParams:", productId);
	const { product, loading } = useSelector((state) => state.product);
    console.log(product)
    
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
			setNutrionalValue(product.nutrionalValue[0]  || {});
            setPacking(product.packing)
		}
	}, [dispatch, product, productId]);

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
            productId,
		    
		));
		toast({ description: 'Product updated!', status: 'success', isClosable: true });
		navigate('/termekek');
	};

    console.log("Updating product with:", {
        productId,
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
        productIsNew
      });
	return (
		<Box p={4}>
			{loading ? (
				<Spinner size='xl' color='cyan.500' />
			) : (
				<form onSubmit={submitHandler}>
                    <FormControl display='flex' justifyContent='space-between' alignItems='center'>
								<FormLabel htmlFor='productIsNewFlag' mb='0' fontSize='sm'>
									<Badge rounded='full' px='1' mx='1' fontSize='0.8em' colorScheme='green' >
										AKCIÓ
									</Badge>
								</FormLabel>
								<Switch id='productIsNewFlag' onChange={() => setProductIsNew(!productIsNew)} isChecked={productIsNew} />
							</FormControl>
					<FormControl mb={3}>
						<FormLabel>Name</FormLabel>
						<Input value={name} onChange={(e) => setName(e.target.value)} />
					</FormControl>
					<FormControl mb={3}>
						<FormLabel>Price</FormLabel>
						<Input type='number' value={price} onChange={(e) => setPrice(e.target.value)} />
					</FormControl>
					<FormControl mb={3}>
						<FormLabel>Brand</FormLabel>
						<Input value={brand} onChange={(e) => setBrand(e.target.value)} />
					</FormControl>
					<FormControl mb={3}>
						<FormLabel>Stock</FormLabel>
						<Input type='number' value={stock} onChange={(e) => setStock(e.target.value)} />
					</FormControl>
					<FormControl mb={3}>
						<FormLabel>Description</FormLabel>
						<Textarea value={description} onChange={(e) => setDescription(e.target.value)} />
					</FormControl>
					<FormControl mb={3}>
						<FormLabel>Ingredients</FormLabel>
						<Textarea value={ingredients} onChange={(e) => setIngredients(e.target.value)} />
					</FormControl>
					<FormControl mb={3}>
						<FormLabel>Image</FormLabel>
						<Input 
							value={image} 
							onChange={(e) => setImage(e.target.value)} 
							placeholder="http://image1.com,http://image2.com"
						/>
					</FormControl>
					<FormControl mb={3}>
						<FormLabel>Packing Of</FormLabel>
						<Input type='number' value={packingOf} onChange={(e) => setPackingOf(e.target.value)} />
					</FormControl>
					<FormControl mb={3}>
						<FormLabel>Cooking Time</FormLabel>
						<Input value={cookingTime} onChange={(e) => setCookingTime(e.target.value)} />
					</FormControl>
					<FormControl mb={3}>
						<FormLabel>packaking Type</FormLabel>
						<Input value={packaking} onChange={(e) => setPackaking(e.target.value)} />
					</FormControl>
                    <FormControl mb={3}>
						<FormLabel>packing Type</FormLabel>
						<Input value={packing} onChange={(e) => setPacking(e.target.value)} />
					</FormControl>
					{/* Tápértékek mezők */}
					<FormControl mb={3}>
						<FormLabel>Nutritional Value - Energy</FormLabel>
						<Input 
							value={nutrionalValue.energy} 
							onChange={(e) => setNutrionalValue({ ...nutrionalValue, energy: e.target.value })} 
						/>
					</FormControl>
					<FormControl mb={3}>
						<FormLabel>Nutritional Value - Fat</FormLabel>
						<Input 
							value={nutrionalValue.fat} 
							onChange={(e) => setNutrionalValue({ ...nutrionalValue, fat: e.target.value })} 
						/>
					</FormControl>
					<FormControl mb={3}>
						<FormLabel>Nutritional Value - Saturated Fat</FormLabel>
						<Input 
							value={nutrionalValue.saturedFat} 
							onChange={(e) => setNutrionalValue({ ...nutrionalValue, saturedFat: e.target.value })} 
						/>
					</FormControl>
					<FormControl mb={3}>
						<FormLabel>Nutritional Value - Carbohydrates</FormLabel>
						<Input 
							value={nutrionalValue.carbohydrates} 
							onChange={(e) => setNutrionalValue({ ...nutrionalValue, carbohydrates: e.target.value })} 
						/>
					</FormControl>
					<FormControl mb={3}>
						<FormLabel>Nutritional Value - Sugar</FormLabel>
						<Input 
							value={nutrionalValue.sugar} 
							onChange={(e) => setNutrionalValue({ ...nutrionalValue, sugar: e.target.value })} 
						/>
					</FormControl>
					<FormControl mb={3}>
						<FormLabel>Nutritional Value - Protein</FormLabel>
						<Input 
							value={nutrionalValue.protein} 
							onChange={(e) => setNutrionalValue({ ...nutrionalValue, protein: e.target.value })} 
						/>
					</FormControl>
					<FormControl mb={3}>
						<FormLabel>Nutritional Value - Salt</FormLabel>
						<Input 
							value={nutrionalValue.salt} 
							onChange={(e) => setNutrionalValue({ ...nutrionalValue, salt: e.target.value })} 
						/>
					</FormControl>
					<Button type='submit' colorScheme='blue' mr={3}>
						Update Product
					</Button>
					<Button onClick={() => navigate('/termekek')} colorScheme='gray'>
						Cancel
					</Button>
				</form>
			)}
		</Box>
	);
};

export default AdminProductEditScreen;
