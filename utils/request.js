import axios from "axios";

// UTILS
import { setToken } from "./user";

/**
 *
 * @param {String} url
 * @param {String} method
 * @param {Object} body
 * @param {Function} setUserToken
 * @param {Function} setError
 */
const SignLog = async (
	url,
	method,
	body,
	setUserToken,
	setError,
	setIsLoading
) => {
	setIsLoading(true);
	// Reset the error so user can see the difference
	setError("");

	try {
		const response = await axios({
			url: `https://lereacteur-bootcamp-api.herokuapp.com/api/airbnb${url}`,
			method: method,
			data: body,
		});

		setToken(response.data.token, setUserToken);

		setIsLoading(false);
	} catch (error) {
		setError(error.response.data.error);
		setIsLoading(false);
	}
};

export default SignLog;
