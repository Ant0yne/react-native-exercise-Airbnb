import AsyncStorage from "@react-native-async-storage/async-storage";

const setInfo = async (info, name, setUserInfo) => {
	if (info) {
		await AsyncStorage.setItem(`user${name}`, info);
	} else {
		await AsyncStorage.removeItem(`user${name}`);
	}

	setUserInfo(info);
};

export { setInfo };
