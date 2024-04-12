import * as Location from "expo-location";
import { offers } from "./request";

const loc = async (setCoords, setDeny, setData, setIsLoading) => {
	let { status } = await Location.requestForegroundPermissionsAsync();

	if (status === "granted") {
		let location = await Location.getCurrentPositionAsync({});

		const obj = {
			latitude: location.coords.latitude,
			longitude: location.coords.longitude,
		};
		setCoords(obj);
		const url = `/rooms/around?latitude=${obj.latitude}&longitude=${obj.longitude}`;
		console.log(url);
		offers(url, "get", setData, setIsLoading);
	} else {
		setDeny(true);
	}
};

export default loc;
