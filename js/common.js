document.addEventListener("DOMContentLoaded", () => {

	// Фиксированные соцсети
	const socials = document.querySelector('.fixed--social__button');
	if (socials) {
		socials.addEventListener('click', (e) => {
			const open = socials.querySelector('.fixed--social__open');
			const close = socials.querySelector('.fixed--social__close');
			const wrapper = document.querySelector('.fixed--social__wrapper');
			open.classList.toggle('hidden');
			close.classList.toggle('active');
			wrapper.classList.toggle('active');
		});
	}

	let openMenu = document.querySelectorAll('.menu--burger');
	const menuMobile = document.querySelector('.menu--mobile');
	openMenu.forEach((open) => {
		open.addEventListener('click', () => {
			menuMobile.classList.add('active');
			document.querySelector('html').classList.add('hidden');
		});
	});

	let closeMenu = document.querySelector('.menu--mobile__top .menu--burger');
	closeMenu.addEventListener('click', () => {
		menuMobile.classList.remove('active');
		document.querySelector('html').classList.remove('hidden');
	});

	let searchButton = document.querySelectorAll('.search--button');
	
	searchButton.forEach(button => {
		button.addEventListener('click', (event) => {
			const searchForm = button.nextElementSibling;
			if (searchForm.classList.contains('search')) {
				searchForm.classList.add('active');
			}
		});
		menuMobile.addEventListener('click', (event) => {
			const searchForm = button.nextElementSibling;
			if (!event.target.closest('.search.active') && !event.target.closest('.search--button')) {
				searchForm.classList.remove('active');
				event.stopPropagation();
			}
		});
	});

	const productsLink = document.querySelectorAll('.menu--mobile__inner li a[href="#"], .products--header__catalog--menu__item li a[href="#"]');
	productsLink.forEach(link => {
			if (link){
					const subMenu = link.nextElementSibling;
					if (subMenu) {
							link.addEventListener('click', (e) => {
									e.preventDefault();
									const subMenuItems = subMenu.querySelectorAll('.sub-menu');
									let totalHeight = 0;
									subMenuItems.forEach(item => {
											totalHeight += item.scrollHeight;
									});
									if (subMenu.classList.contains('active')) {
											link.classList.remove('active');
											subMenu.classList.remove('active');
									} else {
											subMenu.classList.add('active');
											link.classList.add('active');
									}
							});
					}
			}
	});

	// Проверяем наличие элементов на странице
	const charItems = document.querySelectorAll(".catalog--type__char--item");
	const showCharButton = document.querySelector(".show--char");
	if (charItems.length > 0 && showCharButton) {
		// Изначально показываем только первые 8 элементов
		const visibleCount = 8;
		charItems.forEach((item, index) => {
			if (index >= visibleCount) {
				item.classList.add("hidden");
			}
		});
		// Обработчик на кнопку
		showCharButton.addEventListener("click", () => {
			const isHidden = charItems[visibleCount]?.classList.contains("hidden");
			if (isHidden) {
				// Показать все элементы
				charItems.forEach(item => item.classList.remove("hidden"));
				showCharButton.textContent = "Скрыть";
			} else {
				// Скрыть элементы после первых 8
				charItems.forEach((item, index) => {
					if (index >= visibleCount) {
						item.classList.add("hidden");
					}
				});
				showCharButton.textContent = "Все характеристики";
			}
		});
	}

	const modalOpenButtons = document.querySelectorAll('.modal--open');
	const modalOpenQuestion = document.querySelectorAll('.modal--openQuestion');
	const modals = document.querySelectorAll('.modal');
	const modalSend = document.querySelector('.modal--send');

	function getScrollbarWidth() {
		return window.innerWidth - document.documentElement.clientWidth;
	}

	// Функция для открытия модального окна
	function openModal(modal) {
		const scrollbarWidth = getScrollbarWidth();
		modal.classList.add('active');
		// document.body.classList.add('hidden');
		document.body.style.paddingRight = `${scrollbarWidth}px`;
		document.documentElement.classList.add('hidden');
	}

	// Функция для закрытия модального окна
	function closeModals() {
		modals.forEach(modal => modal.classList.remove('active'));
		document.body.style.paddingRight = '';
		modalSend.classList.remove('active');
		// document.body.classList.remove('hidden');
		document.documentElement.classList.remove('hidden');
	}

	// Открытие модального окна при нажатии на кнопки
	modalOpenButtons.forEach(button => {
		button.addEventListener('click', (e) => {
			e.preventDefault();
			const modalGeneral = document.querySelector('.modal--general');
			openModal(modalGeneral);
		});
	});

	modalOpenQuestion.forEach(button => {
		button.addEventListener('click', (e) => {
			e.preventDefault();
			const modalQuestion = document.querySelector('.modal--question');
			openModal(modalQuestion);
		});
	});

	// Закрытие модального окна при нажатии на кнопки закрытия
	document.querySelectorAll('.modal--close').forEach(closeButton => {
		closeButton.addEventListener('click', () => {
			closeModals();
		});
	});

	let buttonCatalog = document.querySelector('.button--catalog');
	let headerCatalog = document.querySelector('.header--bottom__nav');
	buttonCatalog.addEventListener('click', () => {
		let burger = buttonCatalog.querySelector('.burger');
		buttonCatalog.classList.toggle('active');
		burger.classList.toggle('active');
		headerCatalog.classList.toggle('active');
	});

	// Обработка изменения состояния input[type="file"]
	let inputs = document.querySelectorAll('.wpcf7-file');
	inputs.forEach(function (input) {
		let label = input.closest('.file').querySelector('.input__file-button-text');
		let labelVal = label.innerText;

		input.addEventListener('change', function (e) {
			let countFiles = '';
			if (this.files && this.files.length >= 1) {
				countFiles = this.files.length;
			}

			if (countFiles) {
				label.innerText = 'Файлов: ' + countFiles;
			} else {
				label.innerText = labelVal;
			}
		});
	});

	const smoothHeight = (itemSelector, buttonSelector, contentSelector) => {
		const items = document.querySelectorAll(itemSelector);
	
		if (!items.length) return;
	
		items.forEach(el => {
			const button = el.querySelector(buttonSelector);
			const content = el.querySelector(contentSelector);
	
			if (el.dataset.open === 'true') { // проверяем значение data-атрибута open у элемента
				button.classList.add('active') // добавляем класс 'active' в элемент
				content.style.maxHeight = `${content.scrollHeight}px` // устанавливаем высоту блока с контентом
			}
	
			button.addEventListener('click', () => {
				if (el.dataset.open !== 'true') {
					el.dataset.open = 'true';
					button.classList.add('active');
					content.style.maxHeight = `${content.scrollHeight}px`;
				} else {
					el.dataset.open = 'false';
					button.classList.remove('active');
					content.style.maxHeight = '';
				}
			})
	
			const onResize = () => {
				if (el.dataset.open === 'true') {
					if (parseInt(content.style.maxHeight) !== content.scrollHeight) {
						content.style.maxHeight = `${content.scrollHeight}px`;
					}
				}
			}
	
			window.addEventListener('resize', onResize);
		})
	}
	smoothHeight('.main--faq__item', '.main--faq__item--button', '.main--faq__item--answer'); // вызываем основную функцию smoothHeight и передаем в качестве параметров  необходимые селекторы

	const firstItem = document.querySelector('.main--faq__item'); // выбираем первый элемент FAQ
	
	if (firstItem) {
		const firstButton1 = firstItem.querySelector('.main--faq__item--button'); // выбираем кнопку в первом элементе FAQ
		const firstContent = firstItem.querySelector('.main--faq__item--answer'); // выбираем контент в первом элементе FAQ
		firstItem.dataset.open = 'true'; // устанавливаем значение data-атрибута open в 'true'
		firstButton1.classList.add('active'); // добавляем класс 'active' в кнопку
		firstContent.style.maxHeight = `${firstContent.scrollHeight}px`; // устанавливаем высоту контента
	}

	const fio = document.querySelectorAll('input[name="fio"]');
	fio.forEach(name =>{
		name.addEventListener('keyup', function() {
			this.value = this.value.replace(/http|https|url|.net|www|.ru|.com|[0-9]/g, '');
		});
	});

	document.querySelectorAll('input[type="text"], textarea, input[type="number"]').forEach(field => {
		field.addEventListener('input', function () {
			// Удаляем все латинские буквы
			this.value = this.value.replace(/[a-zA-Z]/g, '');
		});
	});

	document.querySelectorAll('input[type="text"], textarea, input[type="number"]').forEach(field => {
    // Запрещаем вставку в поля ввода
    field.addEventListener('paste', function(event) {
        event.preventDefault();  // Отменяем вставку
    });
	});

	let eventCalllback = function(e) {
		let el = e.target,
			clearVal = el.dataset.phoneClear,
			pattern = el.dataset.phonePattern,
			matrix_def = "+_(___) ___-__-__",
			matrix = pattern ? pattern : matrix_def,
			i = 0,
			def = matrix.replace(/\D/g, ""),
			val = e.target.value.replace(/\D/g, "");
		if (clearVal !== 'false' && e.type === 'blur') {
			if (val.length < matrix.match(/([\_\d])/g).length) {
				e.target.value = '';
				return;
			}
		}
		if (def.length >= val.length) val = def;
		e.target.value = matrix.replace(/./g, function(a) {
			return /[_\d]/.test(a) && i < val.length ? val.charAt(i++) : i >= val.length ? "" : a
		});
	}
	let phone_inputs = document.querySelectorAll('.wpcf7-tel');
	for (let elem of phone_inputs) {
		for (let ev of ['input', 'blur', 'focus']) {
			elem.addEventListener(ev, eventCalllback);
		}
	}

	const links = document.querySelectorAll(".catalog--nav ul > li > a");

	links.forEach(link => {
		link.addEventListener("click", (event) => {
			link.classList.toggle('active');
				if (link.getAttribute("href") === "#") {
					event.preventDefault(); // Отключаем переход по ссылке

					const parentLi = link.parentElement; // Родительский li
					const nestedUl = parentLi.querySelector(":scope > ul"); // Вложенный ul

					if (nestedUl) {
						if (nestedUl.classList.contains("visible")) {
							// Если уже открыт, закрываем
							nestedUl.style.maxHeight = null;
							nestedUl.classList.remove("visible");
						} else {
							// Раскрываем текущий список
							nestedUl.style.maxHeight = `${nestedUl.scrollHeight}px`;
							nestedUl.classList.add("visible");

							// Рекурсивно обновляем высоты родительских ul
							updateParentHeight(parentLi);
						}
					}
				}
		});
	});

	/**
	 * Рекурсивно обновляет max-height родительских ul
	 * @param {HTMLElement} li - Текущий li, у которого вложенный ul изменился
	 */
	function updateParentHeight(li) {
			const parentUl = li.closest("ul"); // Родительский ul
			if (parentUl && parentUl.classList.contains("visible")) {
					// Пересчитываем высоту с учётом всех видимых вложенных ul
					parentUl.style.maxHeight = `${calculateTotalHeight(parentUl)}px`;
					const grandParentLi = parentUl.closest("li");
					if (grandParentLi) {
							updateParentHeight(grandParentLi); // Рекурсивно обновляем высоты выше
					}
			}
	}

	/**
	 * Вычисляет общую высоту всех видимых элементов внутри ul
	 * @param {HTMLElement} ul - Текущий ul
	 * @returns {number} - Общая высота контента
	 */
	function calculateTotalHeight(ul) {
    let totalHeight = 0;

    // Считаем высоту всех видимых li и их вложенных ul
    const children = ul.querySelectorAll(":scope > li");
    children.forEach(child => {
        totalHeight += child.scrollHeight;

        const nestedUl = child.querySelector(":scope > ul.visible");
        if (nestedUl) {
            // Учитываем высоту вложенных ul и их margin-top
            const style = window.getComputedStyle(nestedUl);
            const marginTop = parseInt(style.marginTop, 10) || 0;
            totalHeight += nestedUl.scrollHeight + marginTop;
        }
    });

    return totalHeight;
	}

	document.querySelectorAll('.la-sentinelle-container input[type="text"]').forEach((field) => {
		field.addEventListener('change', () => {
			let buttons = document.querySelectorAll('.wpcf7-submit');
			buttons.forEach((button) => {
				button.remove();
			});
		});
	});

	// // Находим кнопки и блоки
	// const buttons = document.querySelectorAll(".catalog--type__materials--buttons .button");
	// const blocks = document.querySelectorAll(".materials--block");

	// // Устанавливаем класс active для первой кнопки и блока
	// if (buttons.length > 0 && blocks.length > 0) {
	// 		buttons[0].classList.add("active");
	// 		blocks[0].classList.add("active");
	// }

	// // Добавляем обработчики событий для всех кнопок
	// buttons.forEach((button, index) => {
	// 		button.addEventListener("click", function () {
	// 				// Удаляем класс active у всех кнопок и блоков
	// 				buttons.forEach(btn => btn.classList.remove("active"));
	// 				blocks.forEach(block => block.classList.remove("active"));

	// 				// Добавляем класс active для нажатой кнопки и соответствующего блока
	// 				button.classList.add("active");
	// 				if (blocks[index]) {
	// 						blocks[index].classList.add("active");
	// 				}
	// 		});
	// });

	// Находим все элементы с классом .video-poster
	const posters = document.querySelectorAll('.video-poster');

	posters.forEach(poster => {
		poster.addEventListener('click', () => {
			const videoSrc = poster.getAttribute('data-video-src'); // Получаем путь к видео из атрибута
			const video = poster.nextElementSibling; // Ищем <video> следующий за постером
			const source = video.querySelector('source');

			if (videoSrc && video && source) {
				source.src = videoSrc; // Устанавливаем путь к видео
				video.style.display = 'block'; // Показываем видео
				video.load(); // Загружаем видео
				video.play(); // Запускаем воспроизведение
				poster.style.display = 'none'; // Скрываем постер
			}
		});
	});

	// Закрытие модального окна при клике вне его содержимого
	document.addEventListener('click', (event) => {
		const target = event.target;
		if (!target.closest('.modal--wrapper') && !target.closest('.modal--open') && !target.closest('.modal--openQuestion') && !target.closest('.wpcf7-file') && !target.closest('.input__file-button')) {
			closeModals();
		}
	});

});