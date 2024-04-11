import { useState, useEffect } from "react";
import { Text, ActivityIndicator } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

// COMPONENTS
import Offer from "../components/Offer";

// UTILS
import { offers } from "../utils/request";

// STYLES
import StylesGlobal from "../styles/global";
const stylesGlo = StylesGlobal();

const OfferScreen = ({ route }) => {
	const [isLoading, setIsLoading] = useState(true);
	const [data, setData] = useState();

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
