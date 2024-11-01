import { useState } from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import HomeScreen from '../screens/HomeScreen';
import LoginScreen from '../screens/LoginScreen';
import RegisterScreen from '../screens/RegisterScreen';
import RoomDetailScreen from '../screens/RoomDetailScreen';
import HistoryBooking from '../screens/HistoryBooking';

const RNStack = createNativeStackNavigator();

const RootNavigator = () => {
	const [token, setToken] = useState(null);

	return (
		<RNStack.Navigator
			screenOptions={{ headerShown: false }}
			initialRouteName={token ? 'HomeScreen' : 'LoginScreen'}
		>
			{token ? (
				<>
					<RNStack.Screen
						name="HomeScreen"
						children={(props) => (
							<HomeScreen {...props} token={token} setToken={setToken} />
						)}
					/>
					<RNStack.Screen
						name="RoomDetailScreen"
						component={RoomDetailScreen}
					/>
					<RNStack.Screen name="HistoryBooking" component={HistoryBooking} />
				</>
			) : (
				<>
					<RNStack.Screen
						name="LoginScreen"
						children={(props) => <LoginScreen {...props} setToken={setToken} />}
					/>
					<RNStack.Screen name="RegisterScreen" component={RegisterScreen} />
				</>
			)}
		</RNStack.Navigator>
	);
};

export default RootNavigator;
