import { useState, useEffect } from "react";
import { Text, View, ActivityIndicator } from "react-native";
import MapView, { PROVIDER_GOOGLE } from "react-native-maps";

//UTILS
import loc from "../utils/localisation";

const AroundScreen = () => {
	const [deny, setDeny] = useState(false);
	const [isLoading, setIsLoading] = useState(true);
	const [coords, setCoords] = useState();
	const [data, setData] = useState();

	useEffect(() => {
		loc(setCoords, setDeny, setData, setIsLoading);
	}, []);

	return isLoading ? (
		<ActivityIndicator size="large" color="#EB5961" />
	) : deny ? (
		<Text>Deny</Text>
	) : (
		<MapView
			style={{ flex: 1 }}
			provider={PROVIDER_GOOGLE}
			initialRegion={{
				latitude: coords.latitude,
				longitude: coords.longitude,
				latitudeDelta: 0.2,
				longitudeDelta: 0.2,
			}}
			showsUserLocation></MapView>
	);
};

export default AroundScreen;
