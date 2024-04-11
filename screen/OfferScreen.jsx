import { useState, useEffect } from "react";
import { Text, ActivityIndicator } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { useRoute } from "@react-navigation/native";

// COMPONENTS
import Offer from "../components/Offer";

// UTILS
import { offers } from "../utils/request";

// STYLES
import StylesGlobal from "../styles/global";
const stylesGlo = StylesGlobal();

const OfferScreen = () => {
	const [isLoading, setIsLoading] = useState(true);
	const [data, setData] = useState();
	const route = useRoute();

	useEffect(() => {
		offers(`/rooms/${route.params.id}`, "get", setData, setIsLoading);
	}, []);

	return (
		<>
			{isLoading ? (
				<ActivityIndicator size="large" color="#EB5961" />
			) : (
				<SafeAreaView style={stylesGlo.container}>
					<Offer offer={data} />
				</SafeAreaView>
			)}
		</>
	);
};

export default OfferScreen;
