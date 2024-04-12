import { useState, useEffect } from "react";
import { Text, ActivityIndicator } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import MapView, { Marker, PROVIDER_GOOGLE } from "react-native-maps";

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
					<MapView
						provider={PROVIDER_GOOGLE}
						initialRegion={{
							latitude: data.location[1],
							longitude: data.location[0],
							latitudeDelta: 0.05,
							longitudeDelta: 0.05,
						}}
						style={{ width: "100%", height: 250 }}>
						<Marker
							coordinate={{
								longitude: data.location[0],
								latitude: data.location[1],
							}}
						/>
					</MapView>
				</SafeAreaView>
			)}
		</>
	);
};

export default OfferScreen;
