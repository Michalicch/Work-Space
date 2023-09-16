import { API_URL, LOCATION_URL } from "../script.js";
import { getData } from "./getData.js";

//select city
export const selectCityControl = () => {
	const citySelect = document.getElementById('city');
	const cityChoices = new Choices(citySelect, {
		searchEnabled: false,
		itemSelectText: '',
		placeholder: true,
		position: 'bottom',
	});

	getData(
		`${API_URL}${LOCATION_URL}`,
		(locationData) => {
			const locations = locationData.map((location) => ({
				value: location,
			}));
			cityChoices.setChoices(
				locations,
				"value",
				"label",
				false,
			);
		}, (error) => {
			console.log(error + 'Произошла ошибка!!!');
		},
	);
}