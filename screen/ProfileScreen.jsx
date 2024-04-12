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

	// Reset the updating when changing screen
	useEffect(() => {
		if (!focus) {
			setIsUpdating(false);
		}
	}, [focus]);

	const permissionAndPicture = async (met) => {
		if (met === "library") {
			const { status } =
				await ImagePicker.requestMediaLibraryPermissionsAsync();
			if (status === "granted") {
				const result = await ImagePicker.launchImageLibraryAsync({
					allowsEditing: true,
					aspect: [1, 1],
				});

				if (result.canceled === true) {
					alert("Pas de photo sélectionnée");
				} else {
					setAvatar(result.assets[0].uri);
				}
			} else {
				alert("Permission refusée");
			}
		} else {
			const { status } = await ImagePicker.requestCameraPermissionsAsync();
			if (status === "granted") {
				//Ouvrir l'appareil photo
				const result = await ImagePicker.launchCameraAsync();

				if (result.canceled === true) {
					alert("Pas de photo sélectionnée");
				} else {
					setAvatar(result.assets[0].uri);
				}
			} else {
				alert("Permission refusée");
			}
		}
	};

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

			if (avatar) {
				const arr = avatar.split(".");

				const formData = new FormData();
				formData.append("photo", {
					uri: avatar,
					name: `my-pic.${arr[arr.length - 1]}`,
					type: `image/${arr[arr.length - 1]}`,
				});
				updateProfile(
					"/user/update",
					"put",
					userToken,
					{ ...obj },
					formData,
					setIsLoading
				);
			}
		} else {
			setEmail(data.email);
			setUsername(data.username);
			setDescription(data.description);
			setIsUpdating(true);
			setAvatar(data.photo.url);
		}
	};

	return (
		<>
			{isLoading ? (
				<ActivityIndicator size="large" color="#EB5961" />
			) : isUpdating ? (
				<View>
					<View>
						{avatar ? (
							<Image
								source={{ uri: avatar }}
								style={{ width: 100, height: 100 }}
							/>
						) : (
							<FontAwesome6 name="house-chimney-user" size={24} color="grey" />
						)}
						<Pressable onPress={() => permissionAndPicture("library")}>
							<FontAwesome name="file-image-o" size={24} color="black" />
						</Pressable>
						<Pressable onPress={() => permissionAndPicture("camera")}>
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
						<Image
							source={{ uri: data.photo.url }}
							style={{ width: 100, height: 100 }}
						/>
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
