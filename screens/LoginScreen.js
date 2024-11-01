import { useState } from 'react';
import { View, TouchableOpacity, StyleSheet } from 'react-native';
import { Button, Text, TextInput } from 'react-native-paper';

const LoginScreen = ({ navigation, setToken }) => {
	const [email, setEmail] = useState('');
	const [password, setPassword] = useState('');

	return (
		<View style={styles.container}>
			<Text variant={'titleLarge'} style={styles.title}>
				Đăng Nhập
			</Text>
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
				Đăng Nhập
			</Button>
			<TouchableOpacity
				onPress={() => {
					navigation.navigate('RegisterScreen');
				}}
			>
				<Text style={styles.signupText}>Bạn chưa có tài khoản? Đăng Ký</Text>
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
	signupText: {
		color: 'blue',
	},
});

export default LoginScreen;
