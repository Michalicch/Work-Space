const API_URL = "https://workspace-methed.vercel.app/";
const LOCATION_URL = "api/locations";
const VACANCY_URL = "api/vacancy";
const BOT_TOKEN = '1111111111111111111111111111'//Запустить в телеграме бота  BotFather нажав start, далее запустить команду "/newbot - create a new bot"  и вставить сюда токен. t.me/lorka_intensive_bot. 

const cardsList = document.querySelector('.cards__list');

let lastUrl = "";
const pagination = {};

const getData = async (url, cbSuccess, cbError) => {
	try {
		const response = await fetch(url);
		const data = await response.json();
		cbSuccess(data);
	} catch (error) {
		cbError(error)
	}
}

const createCard = (vacancy) =>
	`
<article class="vacancy" tabindex="0" data-id="${vacancy.id}">
	<img class="vacancy__img" src="${API_URL}${vacancy.logo}" alt="Логотип компании ${vacancy.company}">
	<p class="vacancy__company">${vacancy.company}</p>
	<h3 class="vacancy__title">${vacancy.title}</h3>
	<ul class="vacancy__fields">
		<li class="vacancy__field">от ${parseInt(vacancy.salary).toLocaleString()}₽</li>
		<li class="vacancy__field">${vacancy.format}</li>
		<li class="vacancy__field">${vacancy.type}</li>
		<li class="vacancy__field">опыт ${vacancy.experience}</li>
	</ul>
</article>
`;

const createCards = (data) =>
	data.vacancies.map((vacancy) => {
		const li = document.createElement('li');
		li.classList.add('cards__item');
		li.insertAdjacentHTML('beforeend', createCard(vacancy));
		return li;
	});

const renderVacancies = (data) => {
	const cardsList = document.querySelector('.cards__list');
	cardsList.textContent = '';
	const cards = createCards(data);
	cardsList.append(...cards);

	if (data.pagination) { //если в data были данные о пагинации
		Object.assign(pagination, data.pagination) //то обновляем данные которые пришли в data.pagination
	}
	observer.observe(cardsList.lastElementChild);
};

const renderMoreVacancies = (data) => {
	const cardsList = document.querySelector('.cards__list');
	const cards = createCards(data);
	cardsList.append(...cards);

	if (data.pagination) { //если в data были данные о пагинации
		Object.assign(pagination, data.pagination) //то обновляем данные которые пришли в data.pagination
	}
	observer.observe(cardsList.lastElementChild);
};

const loadMoreVacancies = () => {
	if (pagination.totalPages > pagination.currentPage) {
		const urlWithParams = new URL(lastUrl);
		urlWithParams.searchParams.set('page', pagination.currentPage + 1);
		urlWithParams.searchParams.set('limit', window.innerWidth < 768 ? 6 : 12);

		getData(urlWithParams, renderMoreVacancies, renderError).then(() => {
			lastUrl = urlWithParams;
		});
	}
};

const renderError = (error) => {
	console.warn(error);
};

const createModalVacancy = ({
	id,
	title,
	company,
	description,
	email,
	salary,
	type,
	format,
	experience,
	location,
	logo,
}) => `
			<article class="modal__vacancy" tabindex="0">
				<div class="vacancy__title-wrapper">
					<img class="modal__img" src="${API_URL}${logo}" alt="Логотип компании ${company}">
					<div class="title-wrapper">
						<p class="title__company">${company}</p>
						<h2 class="vacancy__skill">${title}</h2>
					</div>
				</div>
				<div class="vacancy__content-wrapper">
					<div class="content__description">
						<p class="description__text">${description.replaceAll('\n', '<br>')}</p>						
					</div>
					<ul class="vacancy__mfields">
						<li class="vacancy__mfield">от ${parseInt(salary).toLocaleString()}₽</li>
						<li class="vacancy__mfield">${type}</li>
						<li class="vacancy__mfield">${format}</li>
						<li class="vacancy__mfield">${experience}</li>
						<li class="vacancy__mfield">${location}</li>
					</ul>
				</div>

				${isNaN(parseInt(id.slice(-1))) ?
		`	<p class="email__link">Отправляйте резюме на 
						<a class="blue-text"  href="mailto:${email}">${email}</a>
					</p>
				` :
		`<form class="link__tg">
					<input class="link__input" type="text" name="message" placeholder="Укажите свой email для отклика">
					<input name="vacancyId" type="hidden" value="${id}">
					<button class="link__btn btn">Отправить</button>
				 </form>
				`
	}				
			</article>
`;

const sendTelegram = (modal) => {
	modal.addEventListener('submit', (e) => {
		e.preventDefault();
		const form = e.target.closest('.link__tg');
		const skill = modal.querySelector('.vacancy__skill');

		const userId = '1459888343'; //сюда вставляем id который получаем с помощью бота телеграмма userinfobot
		const text = `Отклик на вакансию ${skill.innerText} id = ${form.vacancyId.value}, email: ${form.message.value}`// получаем значения инпутов с немами vacancyId и message в соответсвующей форме.
		const urlBot = `https://api.telegram.org/bot${BOT_TOKEN}/sendMessage?chat_id=${userId}&text=${text}`;

		fetch(urlBot).then(res => alert('Успешно отправлено')).catch(err => {
			alert('Ошибка, не отправлено...');
			console.log(err);

		})
	});
};
const renderModal = (data) => {
	const modal = document.createElement('div');
	modal.classList.add('modal');
	const modalBody = document.createElement('div');
	modalBody.classList.add('modal__body');
	modalBody.innerHTML = createModalVacancy(data);
	modalClose = document.createElement('button');
	modalClose.classList.add('modal__close');
	modalClose.innerHTML = `
		<svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 20 20" fill="none">
			<g><path
				d="M10.7831 10L15.3887 5.39444C15.4797 5.28816 15.5272 5.15145 15.5218 5.01163C15.5164 4.87181 15.4585 4.73918 15.3595 4.64024C15.2606 4.5413 15.128 4.48334 14.9881 4.47794C14.8483 4.47254 14.7116 4.52009 14.6053 4.61111L9.99977 9.21666L5.39421 4.60555C5.2896 4.50094 5.14771 4.44217 4.99977 4.44217C4.85182 4.44217 4.70994 4.50094 4.60532 4.60555C4.50071 4.71017 4.44194 4.85205 4.44194 5C4.44194 5.14794 4.50071 5.28983 4.60532 5.39444L9.21643 10L4.60532 14.6056C4.54717 14.6554 4.49993 14.7166 4.46659 14.7856C4.43324 14.8545 4.4145 14.9296 4.41155 15.0061C4.40859 15.0826 4.42148 15.1589 4.44941 15.2302C4.47734 15.3015 4.51971 15.3662 4.57385 15.4204C4.62799 15.4745 4.69274 15.5169 4.76403 15.5448C4.83532 15.5727 4.91162 15.5856 4.98813 15.5827C5.06464 15.5797 5.13972 15.561 5.20864 15.5276C5.27757 15.4943 5.33885 15.447 5.38866 15.3889L9.99977 10.7833L14.6053 15.3889C14.7116 15.4799 14.8483 15.5275 14.9881 15.5221C15.128 15.5167 15.2606 15.4587 15.3595 15.3598C15.4585 15.2608 15.5164 15.1282 15.5218 14.9884C15.5272 14.8485 15.4797 14.7118 15.3887 14.6056L10.7831 10Z"
				fill="#CCCCCC" />
			</g>
		</svg>
	`;
	modalBody.append(modalClose);
	modal.append(modalBody);
	document.body.append(modal);
	//реализация закрытия модального окна путем его удаления, так как оно всегда вновь создается
	modal.addEventListener('click', ({ target }) => {
		if (target === modal || target.closest('.modal__close')) {
			modal.remove();
		}
	});

	sendTelegram(modal);
};

const openModal = (id) => {
	getData(`${API_URL}${VACANCY_URL}/${id}`, renderModal, renderError)
};

//Обсервер следит за чем либо
const observer = new IntersectionObserver(
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

const openFilter = (btn, dropDown, classNameBtn, classNameDd) => {
	dropDown.style.height = `${dropDown.scrollHeight}px`;
	btn.classList.add(classNameBtn);
	dropDown.classList.add(classNameDd);
}
const closeFilter = (btn, dropDown, classNameBtn, classNameDd) => {
	btn.classList.remove(classNameBtn);
	dropDown.classList.remove(classNameDd);
	dropDown.style.height = "";
}

const init = () => {
	try {
		const filterForm = document.querySelector('.filter__form');
		const vacanciesFilterBtn = document.querySelector('.vacancies__filter-btn');
		const vacanciesFilter = document.querySelector('.vacancies__filter');

		vacanciesFilterBtn.addEventListener('click', () => {

			if (vacanciesFilterBtn.classList.contains('vacancies__filter-btn_active')) {
				closeFilter(
					vacanciesFilterBtn,
					vacanciesFilter,
					'vacancies__filter-btn_active',
					'vacancies__filter_active');
			} else {
				openFilter(
					vacanciesFilterBtn,
					vacanciesFilter,
					'vacancies__filter-btn_active',
					'vacancies__filter_active');
			}
		});

		window.addEventListener('resize', () => {
			if (vacanciesFilterBtn.classList.contains('vacancies__filter-btn_active')) {
				//vacanciesFilter.style.height = `${vacanciesFilter.scrollHeight}px`;
				closeFilter(
					vacanciesFilterBtn,
					vacanciesFilter,
					'vacancies__filter-btn_active',
					'vacancies__filter_active');
			}
		})

		//select city
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

		//cards
		const urlWithParams = new URL(`${API_URL}${VACANCY_URL}`);

		urlWithParams.searchParams.set('limit', window.innerWidth < 768 ? 6 : 12);
		urlWithParams.searchParams.set('page', 1);

		getData(urlWithParams, renderVacancies, renderError).then(() => {
			lastUrl = urlWithParams;
		});

		//modal	
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

		//Filter
		filterForm.addEventListener('submit', (event) => {
			event.preventDefault();
			const formData = new FormData(filterForm); //Сюда получаются все name  имеющиеся в форме. FormData -специальный объект для получения данных из формы.

			const urlWithParam = new URL(`${API_URL}${VACANCY_URL}`);

			formData.forEach((value, key) => {
				urlWithParam.searchParams.append(key, value);
			});
			getData(urlWithParam, renderVacancies, renderError).then(() => {
				lastUrl = urlWithParam;
			}).then(() => {
				closeFilter(
					vacanciesFilterBtn,
					vacanciesFilter,
					'vacancies__filter-btn_active',
					'vacancies__filter_active');
			});
		});
	} catch (error) {
		console.warn("Мы на странице работодателя, поэтому фильтрация не доступна и возникает ошибка - " + error);
	}

	//Здесь код  employer
	try {
		const validationForm = (form) => {
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
		};
		const fileControler = () => {
			const file = document.querySelector('.file');
			const filePreview = file.querySelector('.file__preview');
			const fileInput = file.querySelector('.file__input');

			fileInput.addEventListener('change', (event) => {

				if (event.target.files.length > 0) {
					const src = URL.createObjectURL(event.target.files[0]);
					file.classList.add('file_active');
					filePreview.src = src;
					filePreview.style.display = 'block';
				} else {
					file.classList.remove('file_active');
					filePreview.src = '';
					filePreview.style.display = 'none';
				}
			});
		};

		const formControler = () => {
			const form = document.querySelector('.employer__form');

			validationForm(form);

			form.addEventListener('submit', (event) => {
				event.preventDefault();
				console.log('отправка');

			});
		};

		formControler();
		fileControler();

	} catch (error) {
		console.warn("Мы на странице вакансий, поэтому возникает ошибка - " + error);
	}


};

init();
