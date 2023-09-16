import { API_URL, VACANCY_URL, appData, filterForm, vacanciesFilter, vacanciesFilterBtn } from "../script.js";
import { getData } from "./getData.js";
import { closeFilter } from "./openFilter.js";
import { renderError } from "./renderError.js";
import { renderVacancies } from "./renderVacancy.js";

export const filterFormControl = () => {
	filterForm.addEventListener('submit', (event) => {
		event.preventDefault();
		const formData = new FormData(filterForm); //Сюда получаются все name  имеющиеся в форме. FormData -специальный объект для получения данных из формы.

		const urlWithParam = new URL(`${API_URL}${VACANCY_URL}`);

		formData.forEach((value, key) => {
			urlWithParam.searchParams.append(key, value);
		});
		getData(urlWithParam, renderVacancies, renderError)
		.then(() => {
			appData.lastUrl = urlWithParam;
		}).then(() => {
			closeFilter(
				vacanciesFilterBtn,
				vacanciesFilter,
				'vacancies__filter-btn_active',
				'vacancies__filter_active');
		});
	});
}