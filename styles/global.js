import { StyleSheet, Platform } from "react-native";
import Constants from "expo-constants";

//VARIABLES
import { VariableColor } from "./_variables";
const colorVar = VariableColor();

const StylesGlobal = () => {
	const styles = StyleSheet.create({
		container: {
			flex: 1,
			marginTop: Platform.OS === "ios" ? 0 : Constants.statusBarHeight,
		},
	});
	return styles;
};

export default StylesGlobal;
