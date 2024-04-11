import { useState } from "react";
import { Text, View, ActivityIndicator, Pressable } from "react-native";
import { useNavigation } from "@react-navigation/core";
import { Ionicons } from "@expo/vector-icons";

// COMPONENTS
import SignLogInput from "../SignLogInput";

// UTILS
import { signLog } from "../../utils/request";
import nav from "../../utils/navigation";

// STYLES
import StylesSignForm from "./signForm";
const styles = StylesSignForm();

const SignForm = ({ setUserToken }) => {
	// inputs value
	const [email, setEmail] = useState("");
	const [username, setUsername] = useState("");
	const [description, setDescription] = useState("");
	const [password, setPassword] = useState("");
	const [confirm, setConfirm] = useState("");
	// If error when submitting
	const [error, setError] = useState("");
	// To reveal or note the password
	const [passHidden, setPassHidden] = useState(true);
	// To check if request is still loading
	const [isLoading, setIsLoading] = useState(false);

	const navigation = useNavigation();

	/**
	 *
	 * request to API to create user account
	 * display error
	 * assign the token to the state if success
	 *
	 */
	const handleSubmit = () => {
		// Assign all the input info to send with request
		body = {
			email,
			username,
			password,
			description,
			password,
			confirm,
		};
		const url = "/user/sign_up";
		// The request util
		signLog(url, "post", { ...body }, setUserToken, setError, setIsLoading);
	};

	return (
		<>
			{isLoading ? (
				<ActivityIndicator size="large" color="#EB5961" />
			) : (
				<View style={styles.containerInput}>
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
					<View>
						<SignLogInput
							placeholder={"password"}
							value={password}
							setValue={setPassword}
							secure={passHidden}
						/>
						<Pressable onPress={() => setPassHidden(!passHidden)}>
							<Ionicons
								name={passHidden ? "eye-outline" : "eye-off-outline"}
								size={24}
								style={styles.eye}
							/>
						</Pressable>
					</View>
					<SignLogInput
						placeholder={"confirm your password"}
						value={confirm}
						setValue={setConfirm}
						secure={passHidden}
					/>
					{error !== "" && <Text style={styles.error}>{error}</Text>}
					<View style={styles.containerSubmit}>
						<Pressable onPress={handleSubmit} style={styles.submit}>
							<Text style={styles.submitText}>Sign in</Text>
						</Pressable>
					</View>
				</View>
			)}
			<Pressable onPress={() => nav("LogIn", navigation)}>
				<Text>Already have an account ? Log in</Text>
			</Pressable>
		</>
	);
};

export default SignForm;
