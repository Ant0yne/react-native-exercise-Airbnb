import { useState, useEffect } from "react";
import { Text, ActivityIndicator, Pressable } from "react-native";
import MapView, { Marker, PROVIDER_GOOGLE } from "react-native-maps";

//UTILS
import loc from "../utils/localisation";
import nav from "../utils/navigation";

const AroundScreen = ({ navigation }) => {
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
			showsUserLocation>
			{data.map((marker) => {
				return (
					<Marker
						key={marker._id}
						coordinate={{
							longitude: marker.location[0],
							latitude: marker.location[1],
						}}
						title={marker.title}
						description={marker.description}
						onCalloutPress={() => nav("Offer", navigation, { id: marker._id })}
					/>
				);
			})}
		</MapView>
	);
};

export default AroundScreen;
