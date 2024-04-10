import { Text, Pressable } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

// UTILS
import { setToken } from "../utils/user";

const HomeScreen = ({ setUserToken }) => {
	return (
		<SafeAreaView>
			<Text>HomeScreen</Text>
			<Pressable onPress={() => setToken("", setUserToken)}>
				<Text>Detroy token</Text>
			</Pressable>
		</SafeAreaView>
	);
};

export default HomeScreen;
