const API_URL = "https://workspace-methed.vercel.app/";
const LOCATION_URL = "api/locations";





const getData = async (url, cbSuccess, cbError) => {
	try {
		const response = await fetch(url);
		const data = await response.json();
		cbSuccess(data);
	} catch (error) {
		cbError(error)
	}
}

const init = () => {
	const citySelect = document.getElementById('city');
	const cityChoices = new Choices(citySelect, {
		// searchEnabled: false,
		itemSelectText: '',
	})

	getData(
		`${API_URL}${LOCATION_URL}`,
		(locationData) => {
			const locations = locationData.map((location) =>({
				value: location,
			}));
			cityChoices.setChoices(
				locations,
				"value",
				"label",
				false,
			);

			console.log();
		}, (error) => {
			console.log(error + 'Произошла ошибка!!!');
		},
	);
}

init();


// fetch(API_URL + LOCATION_URL)
// .then((response)=>{
// 	return response.json();
// })
// .then((data)=>{
// 	console.log(data);
// })
// .catch((error=>{
// 	console.log(error + 'Произошла ошибка!!!');
// }))