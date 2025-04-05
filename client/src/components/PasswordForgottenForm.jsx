import { Text, Stack, Box, Button, Input } from '@chakra-ui/react';
import { useState } from 'react';
import { useDispatch } from 'react-redux';
import { sendResetEmail } from '../redux/actions/userActions';

const PasswordForgottenForm = () => {
	const dispatch = useDispatch();
	const [email, setEmail] = useState('');
	const handleChange = (event) => {
		setEmail(event.target.value);
	};

	return (
		<>
			<Box my='4'>
				<Text as='b'>Add meg az e-mail címed!</Text>
				<Text>Küldünk egy e-mailt a jelszó visszaállításához szükséges linkkel.</Text>
			</Box>
			<Stack>
				<Input
					mb='4'
					type='text'
					name='email'
					placeholder='E-mail címed'
					label='E-mail'
					value={email}
					onChange={(e) => handleChange(e)}
				/>
				<Button colorScheme='yellow' size='lg' fontSize='md' onClick={() => dispatch(sendResetEmail(email))}>
					Jelszó-visszaállító e-mail küldése
				</Button>
			</Stack>
		</>
	);
};

export default PasswordForgottenForm;