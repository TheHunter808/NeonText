import { globalVar } from "./globalVariables";
import { globalFont } from "./font family/setFonts";
import setDisplay, {
	writeOnCanvas,
	clearCanvas,
	measureBars,
	showBars,
} from "./globalFuntions";
import { fontClicked } from "./font family/setFonts";

let {
	widthContainer,
	barWidth,
	barWidthSize,
	heightContainer,
	barHeight,
	barHeightSize,
	uiInputText,
	display,
	canva,
	ctx,
} = globalVar;

let navText = uiInputText.firstElementChild;

//state variables
let textInputState = false;

//set the default states

export let userText = "";
export let textLength = null;
export let metrics = null;
//---fontFamily = selected from the list of fontFamily
//---color = selected from the list of color

function init() {
	//initial default state
	userText = "Your Text";
	display.textContent = userText;
	setDisplay(widthContainer, null);
	setDisplay(heightContainer, null);

	ctx.font = "4rem arial";
	ctx.fillStyle = "White";
}

init();

// let textWrapper = document.querySelector(".ui-display-userText-wrapper");

navText.addEventListener("input", (e) => {
	e.preventDefault();

	//get the input value, store it, return it
	userText = e.target.value;

	//persist data in local storage

	//show each letter upon typing
	display.textContent = userText.trim();

	//check if the state is true
	if (userText.length > 0) {
		textInputState = true;
	}

	//any space should be omitted from calculating
	if (e.data === " ") {
		return;
	}

	let textLength = userText.length;

	// ctx.fillText(userText, 0, 50);
	writeOnCanvas(ctx, userText);
	metrics = ctx.measureText(userText);

	//width
	// let displayWidth = getComputedStyle(display).width;
	// let displayString = displayWidth.slice(0, -2);
	// let displaySize = Math.ceil(+displayString);
	// //height
	// let height = (
	// 	Math.abs(metrics.actualBoundingBoxAscent) +
	// 	Math.abs(metrics.actualBoundingBoxDescent)
	// ).toFixed(2);

	measureBars(
		display,
		metrics,
		barWidth,
		barWidthSize,
		barHeight,
		barHeightSize,
		textLength
	);

	if (textLength === 0) {
		// ctx.clearRect(0, 0, canva.width, canva.height);
		clearCanvas(ctx, canva);
	}

	if (userText.length > 0) {
		setDisplay(widthContainer, true);
	} else {
		setDisplay(widthContainer, null);
	}

	//setTimout for session storage and remove items from local storage, if there is data

	return [userText, metrics];
});

function setBarMeasurement() {
	console.log("💥 time 💥");

	// setDisplay(widthContainer, true);
	// setDisplay(heightContainer, true);
	showBars(true);
}

navText.addEventListener("keyup", () => {
	//wait for 3 seconds and show the measurement
	clearTimeout(setBarMeasurement);
	// setDisplay(widthContainer, null);
	// setDisplay(heightContainer, null);
	showBars(null);
	console.log("CLEARED TIMEOUT");
});

navText.addEventListener("keydown", () => {
	setTimeout(setBarMeasurement, 3000);
});
