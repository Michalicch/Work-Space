import { cardsList, observer, pagination } from "../script.js";
import { createCards } from "./createCards.js";


export const renderVacancies = (data) => {
	// const cardsList = document.querySelector('.cards__list');
	cardsList.textContent = '';
	const cards = createCards(data);
	cardsList.append(...cards);

	if (data.pagination) { //если в data были данные о пагинации
		Object.assign(pagination, data.pagination) //то обновляем данные которые пришли в data.pagination
	}
	observer.observe(cardsList.lastElementChild);
};