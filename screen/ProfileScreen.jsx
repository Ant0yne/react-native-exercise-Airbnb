import { useState, useEffect, useCallback } from "react";
import { Text, View, Pressable, ActivityIndicator, Image } from "react-native";
import { useIsFocused } from "@react-navigation/native";
import { FontAwesome6, FontAwesome, Feather } from "@expo/vector-icons";
import * as ImagePicker from "expo-image-picker";

// COMPONENTS
import SignLogInput from "../components/SignLogInput";

// UTILS
import { setInfo } from "../utils/user";
import { profile, updateProfile } from "../utils/request";

const ProfileScreen = ({ userToken, setUserToken, setUserId, userId }) => {
	const [data, setData] = useState();
	const [isLoading, setIsLoading] = useState(true);
	// Check if user is updating their profile
	const [isUpdating, setIsUpdating] = useState(false);
	// All the value from input when udpating profile
	const [email, setEmail] = useState("");
	const [username, setUsername] = useState("");
	const [description, setDescription] = useState("");
	const [avatar, setAvatar] = useState(null);

	const focus = useIsFocused();

	// Fetch user's profile data everytime there is an update
	useEffect(() => {
		const url = `/user/${userId}`;
		profile(url, "get", userToken, setData, setIsLoading);
	}, [isUpdating]);

	useEffect(() => {
		if (!focus) {
			setIsUpdating(false);
		}
	}, [focus]);

	const logOut = () => {
		setInfo("", "Token", setUserToken);
		setInfo("", "Id", setUserId);
	};

	const updating = () => {
		if (isUpdating) {
			setIsLoading(true);
			const obj = {
				email,
				username,
				description,
			};
			updateProfile(
				"/user/update",
				"put",
				userToken,
				{ ...obj },
				{ avatar },
				setIsLoading
			);
			setIsUpdating(false);
		} else {
			setEmail(data.email);
			setUsername(data.username);
			setDescription(data.description);
			setIsUpdating(true);
		}
	};

	return (
		<>
			{isLoading ? (
				<ActivityIndicator size="large" color="#EB5961" />
			) : isUpdating ? (
				<View>
					<View>
						{data.photo ? (
							<Image />
						) : (
							<FontAwesome6 name="house-chimney-user" size={24} color="grey" />
						)}
						<Pressable>
							<FontAwesome name="file-image-o" size={24} color="black" />
						</Pressable>
						<Pressable>
							<Feather name="camera" size={24} color="black" />
						</Pressable>
					</View>
					<SignLogInput
						placeholder={"email"}
						value={email}
						setValue={setEmail}
					/>
					<SignLogInput
						placeholder={"username"}
						value={username}
						setValue={setUsername}
					/>
					<SignLogInput
						placeholder={"describe yourself..."}
						value={description}
						setValue={setDescription}
					/>
					<Pressable onPress={updating}>
						<Text>Validate</Text>
					</Pressable>
				</View>
			) : (
				<View>
					{data.photo ? (
						<Image />
					) : (
						<FontAwesome6 name="house-chimney-user" size={24} color="grey" />
					)}
					<Text>{data.email}</Text>
					<Text>{data.username}</Text>
					<Text>{data.description}</Text>
					<Pressable onPress={updating}>
						<Text>Update your profile</Text>
					</Pressable>
					<Pressable onPress={logOut}>
						<Text>Log out</Text>
					</Pressable>
				</View>
			)}
		</>
	);
};

export default ProfileScreen;
