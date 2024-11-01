import { NavigationContainer } from '@react-navigation/native';
import { PaperProvider } from 'react-native-paper';
import RootNavigator from './navigation/RootNavigator';
import { SafeAreaProvider } from 'react-native-safe-area-context';

export default function App() {
	return (
		<PaperProvider>
			<NavigationContainer>
				<SafeAreaProvider>
					<RootNavigator />
				</SafeAreaProvider>
			</NavigationContainer>
		</PaperProvider>
	);
}
