import { useState, useEffect } from "react";
import { Text, View } from "react-native";
import MapView, { PROVIDER_GOOGLE } from "react-native-maps";

//UTILS
import loc from "../utils/localisation";

const AroundScreen = () => {
	const [deny, setDeny] = useState(false);
	const [isLoading, setIsLoading] = useState(true);
	const [coords, setCoords] = useState();

	useEffect(() => {
		loc(setCoords, setDeny, setIsLoading);
	}, []);

	return <MapView style={{ flex: 1 }} provider={PROVIDER_GOOGLE}></MapView>;
};

export default AroundScreen;
