/**
 *
 * @param {String} screen
 * @param {Object} navigation
 *
 * // To navigate to specific screen
 */
const nav = (screen, navigation, params) => {
	navigation.navigate(screen, params);
};

export default nav;
