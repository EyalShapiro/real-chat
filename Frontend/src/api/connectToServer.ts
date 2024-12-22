import axios from "axios";
const SERVER_URL = import.meta.env.VITE_SERVER_URL;

export const connectToServer = async (username: string) => {
	try {
		const response = await axios.post(`${SERVER_URL}/connect`, {
			message: `Hi from ${username}!`,
		});
		return response.data;
	} catch (error) {
		console.error("API error:", error);
		throw error;
	}
};
