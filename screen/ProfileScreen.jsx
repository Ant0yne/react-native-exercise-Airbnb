import { useState, useEffect } from "react";
import { Text, View, Pressable, ActivityIndicator } from "react-native";

// UTILS
import { setInfo } from "../utils/user";
import { profile } from "../utils/request";

const ProfileScreen = ({ userToken, setUserToken, setUserId, userId }) => {
	const [data, setData] = useState();
	const [isLoading, setIsLoading] = useState(true);

	useEffect(() => {
		const url = `/user/${userId}`;
		profile(url, "get", userToken, setData, setIsLoading);
	}, []);

	const logOut = () => {
		setInfo("", "Token", setUserToken);
		setInfo("", "Id", setUserId);
	};

	return (
		<>
			{isLoading ? (
				<ActivityIndicator size="large" color="#EB5961" />
			) : (
				<View>
					<Pressable onPress={logOut}>
						<Text>Log out</Text>
					</Pressable>
				</View>
			)}
		</>
	);
};

export default ProfileScreen;
