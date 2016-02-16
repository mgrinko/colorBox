"use strict";
/* ------------------ КОНТРОЛЛЕР УПРАВЛЕНИЯ СТРАНИЦЕЙ ЦЕЛИКОМ (ГЛАВНЫЙ) ----------------------- */
function PageController() {
/* Инициализация экрана предыдущего цвета в черный                                             */
	setLastColorScreen("rgb(0,0,0)");
	
/* Создание боковой палитры стандартных цветов и инициализация "слушателя" на ней              */
	createBGCTable(document.querySelector(".standartColors"));
	document.querySelector(".standartColors").addEventListener("click", setLastColor)
	
/* Установка фонового изображения и инициализация "слушателя" на панели фоновых изображений    */
	setScreenBackground("url(images/black.png)");
	document.querySelector(".backgroundsPanel").addEventListener("click", setBackground);
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
/* --------------------------------------------------------------------------------------------*/
	