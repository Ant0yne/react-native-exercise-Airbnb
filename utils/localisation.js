import * as Location from "expo-location";

const loc = async (setCoords, setDeny, setIsLoading) => {
	let { status } = await Location.requestForegroundPermissionsAsync();

	if (status === "granted") {
		let location = await Location.getCurrentPositionAsync({});

		const obj = {
			latitude: location.coords.latitude,
			longitude: location.coords.longitude,
		};
		setCoords(obj);
	} else {
		setDeny(true);
	}

	setIsLoading(false);
};

export default loc;
