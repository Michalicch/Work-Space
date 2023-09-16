import { filterToggle } from './modules/openFilter.js';
import { selectCityControl } from './modules/selectCityControl.js';
import { vacancyControl } from './modules/vacancyControl.js';
import { modalVacancyControl } from './modules/modalVacancyControl.js';
import { filterFormControl } from './modules/filterFormControl.js';
import { formControler } from './modules/formControler.js';
import { fileControler } from './modules/fileControler.js';
import { loadMoreVacancies } from './modules/loadMoreVacancies.js';



export const API_URL = "https://surf-wandering-sail.glitch.me/"; //"https://workspace-methed.vercel.app/"; 
export const LOCATION_URL = "api/locations";
export const VACANCY_URL = "api/vacancy";
const BOT_TOKEN = '1111111111111111111111111111'//Запустить в телеграме бота  BotFather нажав start, далее запустить команду "/newbot - create a new bot"  и вставить сюда токен. t.me/lorka_intensive_bot. 

export const cardsList = document.querySelector('.cards__list');
export const filterForm = document.querySelector('.filter__form');
export const vacanciesFilterBtn = document.querySelector('.vacancies__filter-btn');
export const vacanciesFilter = document.querySelector('.vacancies__filter');

export let appData = {
	lastUrl: "",
};
export const pagination = {};

//Обсервер следит за чем либо
export const observer = new IntersectionObserver(
	(entries) => {
		entries.forEach((entry) => {
			if (entry.isIntersecting) { //если элемент видимый то вызывается функция
				loadMoreVacancies();
			}
		});
	},
	{
		rootMargin: "100px", //функция будет срабатывать при прокрутке за 100рх до появления элемента
	},
);

const init = () => {
	try {
		filterToggle();
		selectCityControl();
		vacancyControl();
		modalVacancyControl();
		filterFormControl();
	} catch (error) {
		console.warn("Мы на странице работодателя, поэтому фильтрация не доступна и возникает ошибка - " + error);
	}

	//Здесь вызов функций employer
	try {
		formControler();
		fileControler();
	} catch (error) {
		console.warn("Мы на странице вакансий, поэтому возникает ошибка - " + error);
	}
};

init();