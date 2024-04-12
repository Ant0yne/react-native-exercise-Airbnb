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
import ProfileScreen from "./screen/ProfileScreen";

const Tab = createBottomTabNavigator();
const Stack = createNativeStackNavigator();

export default function App() {
	const [isLoading, setIsLoading] = useState(true);
	const [userToken, setUserToken] = useState("");
	const [userId, setUserId] = useState("");

	useEffect(() => {
		/**
		 * Get the user token from local storage
		 */
		const getToken = async () => {
			const token = await AsyncStorage.getItem("userToken");
			const id = await AsyncStorage.getItem("userId");
			setUserToken(token);
			setUserId(id);
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
							{(props) => (
								<LogInScreen
									{...props}
									setUserToken={setUserToken}
									setUserId={setUserId}
								/>
							)}
						</Stack.Screen>
						<Stack.Screen name="SignUp" options={{ headerShown: false }}>
							{(props) => (
								<SignUpScreen
									{...props}
									setUserToken={setUserToken}
									setUserId={setUserId}
								/>
							)}
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
											<Stack.Screen name="Home" component={HomeScreen} />
											<Stack.Screen name="Offer" component={OfferScreen} />
										</Stack.Navigator>
									)}
								</Tab.Screen>
								<Tab.Screen
									name="TabAround"
									options={{ title: "Around me", headerShown: false }}>
									{() => (
										<Stack.Navigator>
											<Stack.Screen name="Around" component={AroundScreen} />
											<Stack.Screen name="Offer" component={OfferScreen} />
										</Stack.Navigator>
									)}
								</Tab.Screen>
								<Tab.Screen
									name="TabProfile"
									options={{
										title: "My Profile",
									}}>
									{(props) => (
										<ProfileScreen
											{...props}
											userToken={userToken}
											setUserToken={setUserToken}
											userId={userId}
											setUserId={setUserId}
										/>
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
