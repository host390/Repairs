document.addEventListener('DOMContentLoaded', function () {

    function ibg () {
		let allItems = document.querySelectorAll('.ibg'), // находим все контенеры с классом ibg
			itemsImage, // переменная для картинок
			src; // переменная для src
		for (let i = 0; i < allItems.length; i++) { // проходим по всем элементам и ...
			itemsImage = allItems[i].querySelector('img'); // находим в них картинку
			src = itemsImage.getAttribute('src'); // узнаём их src
			allItems[i].style.backgroundImage = `url(${src})`; // вставляем src в url background-image
		};
	};
	ibg ();

	function myInput () {
		let myInput = document.querySelectorAll('.myinput'), // находим все блоки майинпут
			inputPlaceholder = document.querySelectorAll('.myinput__placeholder'), // в них пласхолдер
			focusCurr = false, // создаём переменную для фокуса
			input = document.querySelectorAll('.myinput__input'); // и сам тег импут

		let arrPlac = []; // создаём массив куда поместим всё что находится в placeholder
		for (let i = 0; i < myInput.length; i++) { // проходимя по каждому блоку майимпут
			arrPlac.push(`${inputPlaceholder[i].innerHTML}`); // добавляем в массив контент placeholder
			myInput[i].addEventListener('input', function() { // устанавливаем каждому импуту обработчик 'input'
				if (input[i].value != '') { // если пользоватьль что-то пишет то...
					inputPlaceholder[i].innerHTML = ''; // быстро вырубаем содержимое placeholder
					focusCurr = true; // мы чё-то писали
				} else { // если пользоватьель ещё ничего не написал или всё стёр то...
					// если мы писали и стёрни не надо плеса, а если нет, надо
					focusCurr ? inputPlaceholder[i].innerHTML = '' : inputPlaceholder[i].innerHTML = `${arrPlac[i]}`;
				};
			});
			input[i].addEventListener('focus', function() { // устанавливаем каждому импуту обработчик 'focus'
				inputPlaceholder[i].innerHTML = ''; // быстро вырубаем содержимое placeholder
			});
			input[i].addEventListener('blur', function() { // устанавливаем каждому импуту обработчик 'blur'
				if (input[i].value != '') { // если пользоватьль что-то пишет то...
					inputPlaceholder[i].innerHTML = ''; // быстро вырубаем содержимое placeholder
				} else {
					inputPlaceholder[i].innerHTML = `${arrPlac[i]}`; // очень быстро вставляем собержимое placeholder
				}
			});
		};
	};
	myInput ();

	/* 
		тем элемента, которым мы хотим дать анимцию появления даём дежурный класс _anim-show
		У меня должен быть дежурный класс _anim-show_active , когда он есть то проигрывается анимация
		Но анимация должна проигрываться только тогда когда пользователь долистал до этого элимента
		Анимация должна повторятся 1 раз после перегагрузки страницы для этого добавляем дежурный класс ._anim-show-cattle
		и если он есть то не надо нам ещё раз проигрывать анимацию
		анимвция проигрывается только тогда когда нижняя кордината всего экрана доходит до 1\4 высоты элемента
		мне надо находить координату нижней части экрана пользователя в любой момент времени

		найти высоту элемента и разделить её на коэффициент
		теперь надо добавить к этому коээфициенту высоту вернего края элемента до верхнего края станицы

		Если координата страницы совпадёт с координатой, то дам класс актив

		// КОРОЧУ Я ОЧЕНЬ СИЛЬНО УСТАЛ И ХОЧУ НАСЛОДИТЬСЯ ЭТИМ ЛЕТОМ ПОЭТОМУ ДОДЕЛАЮ ПОТОМ ВОТ ТАК ВОТ ВСЁ...
	*/
	window.addEventListener('scroll', function () {
		function animShow () {
			let animShowItems = document.querySelectorAll('._anim-show')
			let pageHeightScroll = window.pageYOffset + document.documentElement.clientHeight
			let coefficient = 4;
			// console.log (animShowItems.length)
	
			for (let i = 0; i < animShowItems.length; i++) {
				let animShowItemsHeight = animShowItems[i].offsetHeight
				animShowItemsHeight = animShowItemsHeight / coefficient
	
				let animShowItemsCoordTop = coordTop(animShowItems[i])
				animShowItemsCoordTop = animShowItemsCoordTop + animShowItemsHeight
				
				if (pageHeightScroll >= animShowItemsCoordTop) {
					animShowItems[i].classList.add('_active-show')
				}
	
				// console.log (animShowItemsCoordTop)
	
				// console.log (pageHeightScroll)
				// console.log (animShowItemsHeight)
			}
			function coordTop(elem) {
				let cordTop = elem.getBoundingClientRect() 
				return cordTop.top + pageYOffset
			}
		}

		setTimeout(() => {
			animShow ()
		}, 300);
	})

	function animShow () {
		let animShowItems = document.querySelectorAll('._anim-show')
		let pageHeightScroll = window.pageYOffset + document.documentElement.clientHeight
		let coefficient = 4;
		// console.log (animShowItems.length)

		for (let i = 0; i < animShowItems.length; i++) {
			let animShowItemsHeight = animShowItems[i].offsetHeight
			animShowItemsHeight = animShowItemsHeight / coefficient

			let animShowItemsCoordTop = coordTop(animShowItems[i])
			animShowItemsCoordTop = animShowItemsCoordTop + animShowItemsHeight

			if (pageHeightScroll >= animShowItemsCoordTop) {
				animShowItems[i].classList.add('_active-show')
			}

			console.log (animShowItemsCoordTop)

			console.log (pageHeightScroll)
			// console.log (animShowItemsHeight)
		}
		function coordTop(elem) {
			let cordTop = elem.getBoundingClientRect() 
			return cordTop.top + pageYOffset
		}
	}

	setTimeout(() => {
		animShow ()
	}, 300);
	
});