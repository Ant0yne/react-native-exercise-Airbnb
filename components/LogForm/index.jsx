import { useState } from "react";
import { Text, View, ActivityIndicator, Pressable } from "react-native";
import { useNavigation } from "@react-navigation/core";

import { Ionicons } from "@expo/vector-icons";

// COMPONENTS
import SignLogInput from "../SignLogInput";

// UTILS
import { SignLog } from "../../utils/request";
import Nav from "../../utils/navigation";

// STYLES
import StylesLogForm from "./logForm";
const styles = StylesLogForm();

const LogForm = ({ setUserToken }) => {
	// inputs value
	const [email, setEmail] = useState("");
	const [password, setPassword] = useState("");
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
			password,
		};
		const url = "/user/log_in";
		// The request util
		SignLog(url, "post", { ...body }, setUserToken, setError, setIsLoading);
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
					{error !== "" && <Text style={styles.error}>{error}</Text>}
					<View style={styles.containerSubmit}>
						<Pressable onPress={handleSubmit} style={styles.submit}>
							<Text style={styles.submitText}>Sign in</Text>
						</Pressable>
					</View>
				</View>
			)}
			<Pressable onPress={() => Nav("SignUp", navigation)}>
				<Text>No account ? Sign up</Text>
			</Pressable>
		</>
	);
};

export default LogForm;
