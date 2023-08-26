const modal = () => {
	const modal = document.querySelector('.modal')
	const modalBtns = document.querySelectorAll('.cards__item')


	modalBtns.forEach((item) => {
		item.addEventListener('click', () => {
			modal.classList.add('activ')  
		})
	})
	modal.addEventListener('click', ()=>{
		setTimeout(() =>{
			modal.classList.remove('activ')
		}, 1000)
		
	})

}

modal();