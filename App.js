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
import OfferScreen from "./screen/OfferScreen";
import AroundScreen from "./screen/AroundScreen";

const Tab = createBottomTabNavigator();
const Stack = createNativeStackNavigator();

export default function App() {
	const [isLoading, setIsLoading] = useState(true);
	const [userToken, setUserToken] = useState("");

	useEffect(() => {
		/**
		 * Get the user token from local storage
		 */
		const getToken = async () => {
			const userToken = await AsyncStorage.getItem("userToken");

			setUserToken(userToken);
			setIsLoading(false);
		};

		getToken();
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
					<Stack.Screen name="Tab" options={{ headerShown: false }}>
						{() => (
							<Tab.Navigator>
								<Tab.Screen
									name="TabHome"
									options={{ title: "Home", headerShown: false }}>
									{() => (
										<Stack.Navigator>
											<Stack.Screen name="Home">
												{() => <HomeScreen setUserToken={setUserToken} />}
											</Stack.Screen>
											<Stack.Screen name="Offer">
												{(props) => <OfferScreen {...props} />}
											</Stack.Screen>
										</Stack.Navigator>
									)}
								</Tab.Screen>
								<Tab.Screen
									name="TabAround"
									options={{ title: "Around me", headerShown: false }}>
									{() => (
										<Stack.Navigator>
											<Stack.Screen name="Around" component={AroundScreen} />
											<Stack.Screen name="Offer">
												{(props) => <OfferScreen {...props} />}
											</Stack.Screen>
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
