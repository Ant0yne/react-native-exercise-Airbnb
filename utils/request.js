import axios from "axios";

// UTILS
import { setToken } from "./user";

const api = "https://lereacteur-bootcamp-api.herokuapp.com/api/airbnb";

/**
 *
 * @param {String} url
 * @param {String} method
 * @param {Object} body
 * @param {Function} setUserToken
 * @param {Function} setError
 */
const signLog = async (
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
			url: api + url,
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

/**
 *
 * @param {String} url
 * @param {String} method
 * @param {Function} setIsLoading
 * @returns Array of offers
 */
const offers = async (url, method, setData, setIsLoading) => {
	try {
		const response = await axios({
			url: api + url,
			method: method,
		});

		console.log(response.data);

		setData(response.data);
		setIsLoading(false);
	} catch (error) {
		console.error(error.response.data.error);
		setIsLoading(false);
	}
};

export { signLog, offers };
