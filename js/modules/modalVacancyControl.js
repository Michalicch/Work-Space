import { cardsList } from "../script.js";
import { openModal } from "./modalControl.js";



//modal	
export const modalVacancyControl = () => {
	cardsList.addEventListener('click', ({ target }) => {
		const vacancyCard = target.closest('.vacancy');
		if (vacancyCard) {
			const vacancyId = vacancyCard.dataset.id;
			openModal(vacancyId);
		};
	});
	// Открытие модалки по нажатию клавиши Enter
	cardsList.addEventListener('keydown', ({ code, target }) => {
		const vacancyCard = target.closest('.vacancy');
		if ((code === 'Enter' || code === 'NumpadEnter') && vacancyCard) {
			const vacancyId = vacancyCard.dataset.id;
			openModal(vacancyId);
			target.blur(); //снимаем фокус
		};
	});
}