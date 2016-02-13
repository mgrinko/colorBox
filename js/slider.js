"use strict";

alert("Работает, чи нет?");

/*function ColorBox(options) {

	var currentColor = {red: 0,
						green: 0,
						blue: 0},
		elem = document.getElementById(options.elemId);
	
	if (!elem) render();
	
	function render() {
	
		var screen,
		    sliders = [];
		
		elem = document.createElement('div');
		elem.id = options.elemId;
		document.body.appendChild(elem);
		screen = document.createElement('div');
		screen.classList.add('screen');
		elem.appendChild(screen);
		
		for(var i = 0; i < options.sliders.length; i++) {
			sliders[i] = new Slider ({	tmpl: options.tmpl,
										container: elem,
										name: options.sliders[i].colorName});							
		};	
	};

	elem.addEventListener("sliderMove", sliderMoveHandler);
	
	function sliderMoveHandler(e) {
	
		var screen = document.querySelector(".screen");
		
		if(e.detail.colorName === "RED"){
			currentColor.red = e.detail.colorValue;
		};
		if(e.detail.colorName === "GREEN"){
			currentColor.green = e.detail.colorValue;
		};		
		if(e.detail.colorName === "BLUE"){
			currentColor.blue = e.detail.colorValue;
		};
		
		var rgbColor = 'rgb(' + currentColor.red + ',' + currentColor.green + ',' + currentColor.blue + ')';
	
	    screen.style.backgroundColor = rgbColor;
	};		
};

function Slider(options) {
	
	var markerWidth,
		barWidth,		
		coords = {};
			
	if (!options.container.querySelector("."+options.name)) {
		options.container.appendChild(render());
	};

	var elem = options.container.querySelector("."+options.name);	
	var bar = elem.querySelector(".bar");
	var marker = elem.querySelector(".marker");
	var resultWindow = elem.querySelector(".current-value");	
		
	elem.addEventListener("mousedown", mousedownHandler);	
		
	function mousedownHandler(e) {
		if(e.target !== marker) return;
		
			document.onmousedown = function (){
				return false;
			};
			document.addEventListener("mousemove", mousemoveHandler);
			document.addEventListener("mouseup", mouseupHandler);
			
			var barCoords = bar.getBoundingClientRect();
			var markerCoords = marker.getBoundingClientRect();

			markerWidth = markerCoords.right - markerCoords.left;
			barWidth = barCoords.right - barCoords.left;
			
			coords.toLeft = markerCoords.left - barCoords.left;
			coords.toRigth = barCoords.right - markerCoords.right;	
			coords.toStart = e.clientX;
			coords.shift = e.clientX - markerCoords.left;
			coords.borderLeft = barCoords.left;
	};
		
	function mousemoveHandler(e) {	
		moveMarker(e.clientX);
	};
	
	function mouseupHandler(e) {
	
		moveMarker(e.clientX);	
		
		document.removeEventListener("mousemove", mousemoveHandler);
		document.removeEventListener("mouseup", mouseupHandler);
		document.onmousedown = null;
	};
	
	function render() {
	
		var slider;

		slider = document.createElement('div');
		slider.classList.add("slider-box");
		slider.classList.add(options.name);
		slider.innerHTML = options.tmpl({name: options.name});
		
		return slider;
	};
	
	function moveMarker(newX) {
		
		var deltaX = newX - coords.toStart;
		var leftSide;
		
		if (deltaX < 0) {
			if(Math.abs(deltaX) > coords.toLeft) {
				leftSide = 0;
			} else {
				leftSide = coords.toStart - coords.borderLeft + deltaX - coords.shift;
			};
		} else {
			if( deltaX > coords.toRigth) {
				leftSide = Math.floor(barWidth - markerWidth);
			} else {
				leftSide = coords.toStart - coords.borderLeft + deltaX - coords.shift;			
			};
		};
		
		marker.style.left = leftSide + "px"; 
		var currentValue = Math.round(255 * leftSide / (barWidth-markerWidth));
		resultWindow.innerHTML =  currentValue;
		
		var sliderEvent = new CustomEvent("sliderMove", {
								bubbles: true,
								detail: {colorName: options.name,
										 colorValue: currentValue}
								});
		elem.dispatchEvent(sliderEvent);
	};
};
*/