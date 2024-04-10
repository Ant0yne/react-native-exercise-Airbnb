import { StyleSheet } from "react-native";

//VARIABLES
import { VariableColor } from "../../styles/_variables";
const colorVar = VariableColor();

const StylesSignForm = () => {
	const styles = StyleSheet.create({
		containerInput: {
			position: "relative",
			width: "80%",
			gap: 20,
		},
		eye: {
			color: colorVar.pinkAir,
			position: "absolute",
			right: 0,
			bottom: 0,
		},
		error: {
			color: colorVar.pinkAir,
			textAlign: "center",
		},
		containerSubmit: {
			alignItems: "center",
		},
		submit: {
			borderWidth: 3,
			borderColor: colorVar.pinkAir,
			paddingVertical: 15,
			paddingHorizontal: 35,
			borderRadius: 30,
			marginVertical: 25,
		},
		submitText: {
			fontSize: 20,
		},
		switch: {
			textDecorationLine: "underline",
		},
	});
	return styles;
};

export default StylesSignForm;
