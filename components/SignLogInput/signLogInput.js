import { StyleSheet } from "react-native";

//VARIABLES
import { VariableColor } from "../../styles/_variables";
const colorVar = VariableColor();

const StylesSignLogInput = () => {
	const styles = StyleSheet.create({
		input: {
			borderBottomWidth: 1,
			borderBottomColor: colorVar.pinkAir,
		},
	});
	return styles;
};

export default StylesSignLogInput;
