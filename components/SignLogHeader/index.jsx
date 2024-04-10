import { Text, View, Image } from "react-native";

// STYLES
import StylesSignLogHeader from "./signLogHeader";
const styles = StylesSignLogHeader();

const SignLogHeader = () => {
	return (
		<View style={{ alignItems: "center" }}>
			<Image
				source={require("../../assets/img/logo-airbnb.png")}
				style={styles.logo}
			/>
			<Text style={styles.h1}>Log in</Text>
		</View>
	);
};

export default SignLogHeader;
