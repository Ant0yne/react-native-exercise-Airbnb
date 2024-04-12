import { useState } from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view";

// COMPONENTS
import SignLogHeader from "../components/SignLogHeader";
import SignForm from "../components/SignForm";

// STYLES
import StylesGlobal from "../styles/global";
const stylesGlo = StylesGlobal();

const SignUpScreen = ({ setUserToken, setUserId }) => {
	// inputs value
	const [email, setEmail] = useState("");
	const [password, setPassword] = useState("");
	// If error when submitting
	const [error, setError] = useState("");

	return (
		<KeyboardAwareScrollView>
			<SafeAreaView style={(stylesGlo.container, { alignItems: "center" })}>
				<SignLogHeader />
				<SignForm setUserToken={setUserToken} setUserId={setUserId} />
			</SafeAreaView>
		</KeyboardAwareScrollView>
	);
};

export default SignUpScreen;
