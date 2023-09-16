//employer function
export const fileControler = () => {
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