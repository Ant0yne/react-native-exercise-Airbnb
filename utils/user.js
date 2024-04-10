import AsyncStorage from "@react-native-async-storage/async-storage";

const setToken = async (token, setUserToken) => {
	if (token) {
		console.log("add");
		await AsyncStorage.setItem("userToken", token);
	} else {
		console.log("destroy");
		await AsyncStorage.removeItem("userToken");
	}

	console.log(token);

	setUserToken(token);
};

export { setToken };
