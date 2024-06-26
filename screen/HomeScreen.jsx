import { useState, useEffect } from "react";
import {
	Text,
	Pressable,
	View,
	FlatList,
	ActivityIndicator,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

// COMPONENTS
import Offer from "../components/Offer";

// UTILS
import { offers } from "../utils/request";

// STYLES
import StylesGlobal from "../styles/global";
const stylesGlo = StylesGlobal();

const HomeScreen = ({ setUserToken }) => {
	const [isLoading, setIsLoading] = useState(true);
	const [data, setData] = useState();

	useEffect(() => {
		offers("/rooms", "get", setData, setIsLoading);
	}, []);

	return (
		<>
			{isLoading ? (
				<ActivityIndicator size="large" color="#EB5961" />
			) : (
				<SafeAreaView>
					<FlatList
						data={data}
						keyExtractor={(item) => item._id}
						renderItem={({ item }) => <Offer offer={item} />}
					/>
				</SafeAreaView>
			)}
		</>
	);
};

export default HomeScreen;
