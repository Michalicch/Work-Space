export const getData = async (url, cbSuccess, cbError) => {
	try {
		const response = await fetch(url);
		const data = await response.json();
		cbSuccess(data);
	} catch (error) {
		cbError(error)
	}
};