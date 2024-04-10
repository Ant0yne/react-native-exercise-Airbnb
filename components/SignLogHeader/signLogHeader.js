import { StyleSheet } from "react-native";

//VARIABLES
import { VariableColor } from "../../styles/_variables";
const colorVar = VariableColor();

const StylesSignLogHeader = () => {
	const styles = StyleSheet.create({
		logo: {
			height: 100,
			width: 100,
			objectFit: "contain",
			marginVertical: 50,
		},
		h1: {
			fontSize: 30,
			color: colorVar.greyText,
			marginBottom: 30,
		},
	});
	return styles;
};

export default StylesSignLogHeader;
