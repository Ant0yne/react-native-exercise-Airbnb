import { useState, useEffect } from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { ActivityIndicator } from "react-native";

// SCREENS
import LogInScreen from "./screen/LogInScreen";
import SignUpScreen from "./screen/SignUpScreen";
import HomeScreen from "./screen/HomeScreen";

const Tab = createBottomTabNavigator();
const Stack = createNativeStackNavigator();

export default function App() {
	const [isLoading, setIsLoading] = useState(true);
	const [userToken, setUserToken] = useState(null);

	useEffect(() => {
		/**
		 * Get the user token from local storage
		 */
		const bootstrapAsync = async () => {
			const userToken = await AsyncStorage.getItem("userToken");

			setUserToken(userToken);
			setIsLoading(false);
		};

		bootstrapAsync();
	}, []);

	return isLoading ? (
		<ActivityIndicator size="large" color="#EB5961" />
	) : (
		<NavigationContainer>
			<Stack.Navigator>
				{!userToken ? (
					<>
						<Stack.Screen name="LogIn" options={{ headerShown: false }}>
							{() => <LogInScreen setUserToken={setUserToken} />}
						</Stack.Screen>
						<Stack.Screen name="SignUp" options={{ headerShown: false }}>
							{() => <SignUpScreen setUserToken={setUserToken} />}
						</Stack.Screen>
					</>
				) : (
					<Stack.Screen name="Tab">
						{() => (
							<Tab.Navigator>
								<Tab.Screen name="TabHome">
									{() => (
										<Stack.Navigator>
											<Stack.Screen name="Home" component={HomeScreen} />
										</Stack.Navigator>
									)}
								</Tab.Screen>
							</Tab.Navigator>
						)}
					</Stack.Screen>
				)}
			</Stack.Navigator>
		</NavigationContainer>
	);
}
