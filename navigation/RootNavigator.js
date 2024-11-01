import { useState } from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import HomeScreen from '../screens/HomeScreen';
import LoginScreen from '../screens/LoginScreen';
import RegisterScreen from '../screens/RegisterScreen';
import RoomDetailScreen from '../screens/RoomDetailScreen';

const RNStack = createNativeStackNavigator();

const RootNavigator = () => {
	const [token, setToken] = useState('null');

	return (
		<RNStack.Navigator
			screenOptions={{ headerShown: false }}
			initialRouteName={token ? 'HomeScreen' : 'LoginScreen'}
		>
			{token ? (
				<>
					<RNStack.Screen name="HomeScreen" component={HomeScreen} />
					<RNStack.Screen
						name="RoomDetailScreen"
						component={RoomDetailScreen}
					/>
				</>
			) : (
				<>
					<RNStack.Screen name="LoginScreen" component={LoginScreen} />
					<RNStack.Screen name="RegisterScreen" component={RegisterScreen} />
				</>
			)}
		</RNStack.Navigator>
	);
};

export default RootNavigator;
