import AsyncStorage from "@react-native-async-storage/async-storage";

const setToken = async (token, setUserToken) => {
	if (token) {
		await AsyncStorage.setItem("userToken", token);
	} else {
		await AsyncStorage.removeItem("userToken");
	}

	setUserToken(token);
};

export { setToken };
