"use strict";

/* --------------------------------------------------------------------------------------------*/
/* ------------------ КОНТРОЛЛЕР УПРАВЛЕНИЯ СТРАНИЦЕЙ ЦЕЛИКОМ (ГЛАВНЫЙ) ----------------------- */
function PageController() {

	var sliders = [
					{name: "Red",     maxValue: 255,  initValue: 123},
					{name: "Green",   maxValue: 255,  initValue: 123},
					{name: "Blue",    maxValue: 255,  initValue: 123},
					{name: "Opacity", maxValue: 1,    initValue: 0.5}
		],
		colors = [ 
				   sliders[0].initValue,
				   sliders[1].initValue,	
				   sliders[2].initValue,
				   sliders[3].initValue,
		];
/* Инициализация основного экрана начальными значениями                                        */
	setCurrentScreenColor(colors);
	
/* Инициализация экрана предыдущего цвета в черный                                             */
	setLastColorScreen("rgb(0,0,0)");
	
/* Создание боковой палитры стандартных цветов и инициализация "слушателя" на ней              */
	createBGCTable(document.querySelector(".standartColors"));
	document.querySelector(".standartColors").addEventListener("click", setLastColor)
	
/* Установка фонового изображения и инициализация "слушателя" на панели фоновых изображений    */
	setScreenBackground("url(images/black.png)");
	document.querySelector(".backgroundsPanel").addEventListener("click", setBackground);

/* Построение слайдеров и инициализация слушателей на них                                      */
	renderSlidersPanel(sliders);
	document.addEventListener("sliderMove", sliderMoveHandler);
		
/* Функция-слушатель для собственного события - движения слайдером                             */		
	function sliderMoveHandler(e) {				
		for( var i = 0; i < sliders.length; i++) {
			if (e.detail.name === sliders[i].name) {
				colors[i] = e.detail.value;
			};
			setCurrentScreenColor(colors);
		};
	};
};

/* --------------------------------------------------------------------------------------------*/
/* ------------------------ ФУНКЦИИ - "СЛУШАТЕЛИ"  ЭЛЕМЕНТОВ ИНТЕРФЕЙСА ---------------------- */
/* --------- Установщик цвета экрана предыдущего цвета по нажатию на "палитру" --------------- */
	function setLastColor(e) {		
		if(!(e.target.tagName === "TD")) return;
		setLastColorScreen(e.target.getAttribute("data-color"));
	};	
/* --------- Установщик фонового рисунка на основном экране по нажатию на картинку снизу ----- */	
	function setBackground(e) {		
       if(!(e.target.tagName === "IMG")) return;
	   setScreenBackground(e.target.getAttribute("data-image"));		
	};			
	
/* --------------------------------------------------------------------------------------------*/
/* ------------- ФУНКЦИИ СОЗДАНИЯ И ИНИЦИАЛИЗАЦИИ ЭЛЕМЕНТОВ ИНТЕРФЕЙСА ----------------------- */
/* ---------------- Функция формирования боковой палитры стандартных цветов ------------------ */	
	function createBGCTable(container) {
		
		var tableElement,
			tbodyElement,
			trElement,
			tdElement,
			currentColor,
			colorNums = [0, 123, 255];
		
		tableElement = document.createElement("table");
		tbodyElement = document.createElement("tbody");
		tableElement.appendChild(tbodyElement);
		
		for (var i = 0; i < 3; i++) {
		
			for (var j = 0; j < 3; j++) {
			
				trElement = document.createElement("tr");
				for (var k = 0; k < 3; k++) {
					currentColor = "rgb(" + colorNums[i] +"," + colorNums[j] +"," + colorNums[k] +")"
					tdElement = document.createElement("td");
					tdElement.setAttribute("data-color", currentColor);
					tdElement.style.backgroundColor = currentColor;
					trElement.appendChild(tdElement);
				};
				tbodyElement.appendChild(trElement);
			};	
		};		
		container.appendChild(tableElement);			
	};
/* ----------- Функция установки выбранного цвета на экране предыдущего цвета ---------------- */			
	function setLastColorScreen(str) {
		
		var screen = document.querySelector(".lastColorScreen");
		var colors = str.slice(4, -1).split(",");
		
		screen.style.backgroundColor = str;
		
		for(var i = 0; i < 3; i++) {
			if(+colors[i] < 123) {
				colors[i] = 255;
			} else {
				colors[i] =0;
			};
		};		
		screen.style.color = "rgb(" + colors[0] +"," + colors[1] +"," + colors[2] +")"; 
		screen.innerHTML = "</br>" + str;
	};
/* ----------- Функция установки фонового изображения на основном эеране --------------------- */	
	function setScreenBackground(str) {	
		var screen = document.querySelector(".currentScreenBG");	
		screen.style.backgroundImage = str; 
	};
/* ----------- Функция установки цвета и прозрачности на основном эеране --------------------- */	
	function setCurrentScreenColor(colors) {	
		var screen = document.querySelector(".currentColorScreen");	
		screen.style.backgroundColor = 'rgba(' + colors.join(',') + ')'; 
	};	
	
/* ----------- Функция построения 4 слайдеров  в DOM  --------------------------------------- */
	function renderSlidersPanel(sliders) {	
		
		var elem,
			tmpl,
			container,
			slider = [];
						 
		tmpl = _.template(document.getElementById("slider-template").innerHTML.trim());
		container = document.querySelector(".slidersPanel")
		
		for( var i = 0; i < sliders.length; i++) {
			elem = document.createElement("div");
			elem.classList.add(".slider");
			elem.setAttribute("data-name", sliders[i].name);
			elem.innerHTML = tmpl({name:sliders[i].name});
			elem = container.appendChild(elem);
			slider[i] = new Slider({
									 name: sliders[i].name,
									 maxValue: sliders[i].maxValue,
									 initValue: sliders[i].initValue,
									 elem: elem
									});
		};
	};
	
/* ----------- Функция-конструктор для слайдера с функциональностью -------------------------- */	
	function Slider(options) {
	
		var coords = {},
			maxValue = options.maxValue,
			elem = options.elem,
			bar = elem.querySelector(".bar"),
			marker = elem.querySelector(".marker");
		
		initSlider();
		elem.addEventListener("mousedown", mousedownHandler);

		function mousedownHandler(e) {
		
			if (!e.target.classList.contains("marker")) return;
			
			document.onmousedown = function() {
				return false;
			};
			document.addEventListener("mousemove", mousemoveHandler);			
			document.addEventListener("mouseup", mouseupHandler);

			setCurrentCoords(e);		
		};

		function mousemoveHandler (e) {
			moveMarker(e.clientX);
		};

		function mouseupHandler() {
			document.onmousedown = null;
			document.removeEventListener("mousemove", mousemoveHandler);
			document.removeEventListener("mouseup", mouseupHandler);
		};
		
		function setCurrentCoords(e) {
			
			var barCoords = bar.getBoundingClientRect();
			var markerCoords = marker.getBoundingClientRect();
			
			coords.barX = barCoords.left;
			coords.barWidth = barCoords.right - barCoords.left;
			coords.markerWidth = markerCoords.right - markerCoords.left;
			coords.shift = e.clientX - markerCoords.left;
		
		};		
				
		function moveMarker(currentX) {
			
			var newValue,
				newX = currentX - coords.shift - coords.barX;
			
			if (newX <= 0) {
				newX = 0;
				};
			if( newX >= (coords.barWidth - coords.markerWidth)) {
				newX = coords.barWidth - coords.markerWidth;
				};
				
			marker.style.left = newX + 'px';
			
			if (maxValue > 1) {
				newValue = Math.round(maxValue * newX / (coords.barWidth - coords.markerWidth));
			} else {
				newValue = Math.round(100 * maxValue * newX / (coords.barWidth - coords.markerWidth)) / 100;				
			};
			
			elem.querySelector(".currentValue").innerHTML = newValue;
			
			var sliderEvent = new CustomEvent("sliderMove", {
								bubbles: true,
								detail: {name: options.name,
										 value: newValue}
								});
			elem.dispatchEvent(sliderEvent);
		};
		
		function initSlider() {
			
			var barCoords = bar.getBoundingClientRect();
			var markerCoords = marker.getBoundingClientRect();
			
			coords.barX = barCoords.left;
			coords.barWidth = barCoords.right - barCoords.left;
			coords.markerWidth = markerCoords.right - markerCoords.left;
			coords.shift = 0;
			
			marker.style.left = options.initValue * (coords.barWidth - coords.markerWidth) / maxValue + 'px';
			elem.querySelector(".currentValue").innerHTML = options.initValue;
		};
		
	};
/* --------------------------------------------------------------------------------------------*/

	