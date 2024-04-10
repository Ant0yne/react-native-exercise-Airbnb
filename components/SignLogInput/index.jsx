import { TextInput } from "react-native";

// STYLES
import StylesSignLogInput from "./signLogInput";
const styles = StylesSignLogInput();

const SignLogInput = ({ placeholder, value, setValue, secure }) => {
	return (
		<TextInput
			placeholder={placeholder}
			value={value}
			secureTextEntry={secure}
			style={styles.input}
			onChangeText={(text) => setValue(text)}
		/>
	);
};

export default SignLogInput;
