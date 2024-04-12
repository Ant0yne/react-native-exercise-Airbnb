import axios from "axios";

// UTILS
import { setInfo } from "./user";
import jsonify from "./jsonify";

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
	setUserId,
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

		setInfo(response.data.token, "Token", setUserToken);
		setInfo(response.data.id, "Id", setUserId);

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
		setData(response.data);
		setIsLoading(false);
	} catch (error) {
		console.error(error.response.data.error);
		setIsLoading(false);
	}
};

/**
 *
 * @param {String} url
 * @param {String} method
 * @param {String} userToken
 * @param {Function} setData
 * @param {Function} setIsLoading
 */
const profile = async (url, method, userToken, setData, setIsLoading) => {
	try {
		const response = await axios({
			url: api + url,
			method: method,
			headers: {
				authorization: `Bearer ${userToken}`,
			},
		});
		setData(response.data);
		setIsLoading(false);
	} catch (error) {
		console.error(error.response.data.error);
		setIsLoading(false);
	}
};

const updateProfile = async (
	url,
	method,
	userToken,
	body,
	avatar,
	setIsLoading
) => {
	try {
		const response = await axios({
			url: api + url,
			method: method,
			data: body,
			headers: {
				authorization: `Bearer ${userToken}`,
			},
		});

		updateAvatar(
			"/user/upload_picture",
			method,
			userToken,
			avatar,
			setIsLoading
		);
		setIsLoading(false);
	} catch (error) {
		console.error(error.response.data.error);
		setIsLoading(false);
	}
};

const updateAvatar = async (url, method, userToken, avatar, setIsLoading) => {
	try {
		const response = await axios({
			url: api + url,
			method: method,
			data: avatar,
			headers: {
				authorization: `Bearer ${userToken}`,
			},
		});
		console.log("avatar", response.data);
	} catch (error) {
		console.error(error.response.data.error);
		setIsLoading(false);
	}
};

export { signLog, offers, profile, updateProfile };
