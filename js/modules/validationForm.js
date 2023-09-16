
//employer function
export const validationForm = (form) => {
	const validate = new window.JustValidate(form, {
		errorFieldStyle: {
			border: '2px solid #f00',
		},
		successFieldStyle: {
			color: '#239700',
			border: '2px solid #239700',
		},
		errorLabelStyle: {
			color: '#f00',
		},
		// errorFieldCssClass: "invalid",
		errorsContainer: document.querySelector('.employer__error')
	});
	validate
		.addField('#logo', [{
			rule: 'minFilesCount',
			value: 1,
			errorMessage: "Добавьте файл логотипа"
		},
		{
			rule: 'files',
			value: {
				files: {
					extensions: ['jpeg', 'png', 'jpg'],
					maxSize: 102400,
					minSize: 1000,
					types: ['image/jpeg', 'image/png'],
				},
			},
			errorMessage: "Размер файла не должен превышать 100Кб"
		},
		])
		.addField("#company", [{ rule: 'required', errorMessage: "Введите название компании" },])
		.addField('#title', [{ rule: 'required', errorMessage: "Введите название вакансии" },])
		.addField('#salary', [{ rule: 'required', errorMessage: "Введите размер заработной платы" },])
		.addField('#location', [{ rule: 'required', errorMessage: "Укажите локализацию" },])
		.addField('#email', [{
			rule: 'required',
			errorMessage: "Введите email"
		},
		{
			rule: 'email',
			errorMessage: "Введите валидный email"
		},
		])
		.addField('#description', [{ rule: 'required', errorMessage: "Добавьте описание" },])
		.addRequiredGroup('#format', 'Выберите формат')
		.addRequiredGroup('#experience', 'Выберите опыт')
		.addRequiredGroup('#type', 'Выберите занятость');
	return validate;
};