import { createNativeStackNavigator } from '@react-navigation/native-stack';
import LoginScreen from '../screens/LoginScreen';
import RegisterScreen from '../screens/RegisterScreen';

const RNStack = createNativeStackNavigator();

const RootNavigator = () => {
	return (
		<RNStack.Navigator screenOptions={{ headerShown: false }}>
			<RNStack.Screen name="LoginScreen" component={LoginScreen} />
			<RNStack.Screen name="RegisterScreen" component={RegisterScreen} />
		</RNStack.Navigator>
	);
};

export default RootNavigator;
