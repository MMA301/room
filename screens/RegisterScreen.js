import { useState } from 'react';
import { View } from 'react-native';
import { Text, TextInput } from 'react-native-paper';

const RegisterScreen = ({ navigation }) => {
	const [email, setEmail] = useState('');
	const [password, setPassword] = useState('');

	return (
		<View style={{ flex: 1, backgroundColor: '#fff' }}>
			<Text variant={'titleLarge'}>Register Screen</Text>
			<TextInput
				mode={'outlined'}
				label={'Email'}
				value={email}
				onChangeText={(value) => setEmail(value)}
			/>
			<TextInput
				mode={'outlined'}
				label={'Password'}
				value={password}
				onChangeText={(value) => setPassword(value)}
				secureTextEntry
			/>
		</View>
	);
};

export default RegisterScreen;
