import { useState, useEffect } from "react";
import { Text, Pressable } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

// UTILS
import { setToken } from "../utils/user";
import { Offers } from "../utils/request";

const HomeScreen = ({ setUserToken }) => {
	const [isLoading, setIsLoading] = useState(true);
	const [data, setData] = useState();

	useEffect(() => {
		Offers("/rooms", "get", setData, setIsLoading);
	}, []);

	return (
		<SafeAreaView>
			<Text>HomeScreen</Text>
			<Pressable onPress={() => setToken("", setUserToken)}>
				<Text>Detroy token</Text>
			</Pressable>
		</SafeAreaView>
	);
};

export default HomeScreen;
