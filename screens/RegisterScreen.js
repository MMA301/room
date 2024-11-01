import { useState } from 'react';
import { View, TouchableOpacity, StyleSheet } from 'react-native';
import { Button, Text, TextInput } from 'react-native-paper';

const RegisterScreen = ({ navigation }) => {
	const [name, setName] = useState('');
	const [email, setEmail] = useState('');
	const [password, setPassword] = useState('');

	return (
		<View style={styles.container}>
			<Text variant={'titleLarge'} style={styles.title}>
				Đăng Ký
			</Text>
			<TextInput
				mode={'outlined'}
				label={'Tên'}
				value={name}
				onChangeText={(value) => setName(value)}
				style={styles.input}
			/>
			<TextInput
				mode={'outlined'}
				label={'Email'}
				value={email}
				onChangeText={(value) => setEmail(value)}
				style={styles.input}
			/>
			<TextInput
				mode={'outlined'}
				label={'Mật Khẩu'}
				value={password}
				onChangeText={(value) => setPassword(value)}
				secureTextEntry
				style={styles.input}
			/>
			<Button mode={'contained'} onPress={() => {}} style={styles.button}>
				Tạo Tài Khoản
			</Button>
			<TouchableOpacity onPress={() => {}}>
				<Text style={styles.loginText}>Bạn đã có tài khoản? Đăng Nhập</Text>
			</TouchableOpacity>
		</View>
	);
};

const styles = StyleSheet.create({
	container: {
		flex: 1,
		backgroundColor: '#fff',
		justifyContent: 'center',
		alignItems: 'center',
		padding: 16,
	},
	title: {
		marginBottom: 24,
	},
	input: {
		width: '100%',
		marginBottom: 16,
	},
	button: {
		width: '100%',
		marginBottom: 16,
	},
	loginText: {
		color: 'blue',
	},
});

export default RegisterScreen;
