import { API_URL, VACANCY_URL } from "../script.js";
import { validationForm } from "./validationForm.js";

//employer function
export const formControler = () => {
	const form = document.querySelector('.employer__form');
	const employerError = document.querySelector(".employer__error");
	const validate = validationForm(form);

	form.addEventListener('submit', async (event) => {
		event.preventDefault();
		if (!validate.isValid) {
			return;
		}

		try {
			const formData = new FormData(form);
			console.log(formData);
			employerError.textContent = 'Отправка, подождите...';

			const response = await fetch(`${API_URL}${VACANCY_URL}`, {
				method: "POST",
				body: formData,
			});

			if (response.ok) {
				employerError.textContent = '';
				window.location.href = "index.html";
			}
		} catch (error) {
			employerError.textContent = 'Произошла ошибка!';
			console.error(error);
		}
	});
}; 