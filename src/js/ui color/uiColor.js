import { globalVar } from "../globalVariables";
let { display, colorList, neonSwitch } = globalVar;
let bulbDom = document.querySelectorAll(".fa.fa-lightbulb-o");

const colorPalette = [
	{ id: "orange", code: "orange" },
	{ id: "lightRed", code: "rgb(255, 117, 117)" },
	{ id: "red", code: "red" },
	{ id: "deepBlue", code: "rgb(2, 116, 252)" },
	{ id: "electricBlue", code: "rgb(99, 170, 255)" },
	{ id: "tropicalBlue", code: "rgb(36, 183, 222)" },
	{ id: "iceBlue", code: "rgb(144, 220, 255)" },
	{ id: "green", code: "#20f020" },
	{ id: "mintGreen", code: "rgb(128, 255, 217)" },
	{ id: "deepGreen", code: "rgba(14, 185, 14, 0.884)" },
	{ id: "warmWhite", code: "rgb(240, 238, 199)" },
	{ id: "white", code: "rgb(225, 227, 230)" },
];

let listColor = "";

function setColor(color) {
	display.style.textShadow = `rgb(255, 255, 255) 0px 0px 5px, rgb(255, 255, 255) 0px 0px 10px,
		${color} 0px 0px 20px, ${color} 0px 0px 30px,
		${color} 0px 0px 40px, ${color} 0px 0px 55px,
		${color} 0px 0px 75px`;
}

function checkColor(listColor) {
	let response = colorPalette.filter((color) => {
		//get the matched colorId

		return listColor.includes(color.id);
	});

	// console.log(response.map((code) => code.code));
	return response.map((code) => code.code);
}

function setGlowingLight(bulb, targetColor, glowLight = 0, listColor) {
	if (glowLight === 1) {
		bulb.style.textShadow = `0 0 4px white, 0 0 4px ${targetColor}, 0 0 8px ${targetColor},
		0 0 12px ${targetColor}, 0 0 16px ${targetColor}, 0 0 18px ${targetColor}`;
		bulb.style.color = "rgb(248, 248, 248)";
	} else {
		bulb.style.textShadow = "none";
		bulb.style.color = `${checkColor(listColor)}`;
	}
}

// function setGlowingLightTest(bulb, targetColor, targetNode) {
// 	//default style on each
// 	colorList.forEach((list) => {
// 		list.classList.remove("active");
// 		// let bulbs = list.firstElementChild;
// 		// // bulbs.style.textShadow = `0px 0px 0px orange`;
// 		// bulbs.style.color = `${setColor(listColor)}`;
// 	});

// 	console.log(targetNode);
// 	targetNode.classList.add("active");
// 	if (targetNode.classList.contains("active")) {
// 		bulb.style.textShadow = `0 0 4px white, 0 0 4px ${targetColor}, 0 0 8px ${targetColor},
// 			0 0 12px ${targetColor}, 0 0 16px ${targetColor}, 0 0 18px ${targetColor}`;
// 		bulb.style.color = "rgb(248, 248, 248)";
// 		console.log(bulb);
// 	}
// }

// console.log(colorList);

let btnActivate;

colorList.forEach((list) => {
	list.addEventListener("mouseenter", (e) => {
		let targetColor = e.target.classList[1];
		let bulb = e.target.firstElementChild;
		setGlowingLight(bulb, checkColor(targetColor), 1);
	});
	list.addEventListener("mouseleave", (e) => {
		// let targetColor = e.target.classList[1];
		listColor = e.target.classList[1];
		let bulb = e.target.firstElementChild;
		console.log(listColor);
		if (bulb.dataset.active === "true") {
			setGlowingLight(bulb, checkColor(listColor), 1, listColor);
		} else {
			setGlowingLight(bulb, checkColor(listColor), 0, listColor);
		}
	});
	list.addEventListener("click", (e) => {
		//wherever it is clicked, alwyas make it happen on the parent <li>
		let listEl = e.target.closest("li");
		let bulb = listEl.firstElementChild;
		// console.log(bulb.dataset.color);
		//send the color to whoever needs it
		listColor = listEl.classList[1];
		//if the neonSwitch is unchecked, alert to turn the switchOn
		if (neonSwitch.checked !== true) {
			alert("Please turn the neon switch on.");
			return;
		}
		//if the list color is equal to other custom color
		// console.log(colorList);

		bulbDom.forEach((li) => {
			li.dataset.active = false;
		});

		//activate button

		// listEl.classList.add("active");
		bulb.dataset.active = true;
		console.log(bulb);
		console.log(listEl);
		//check if any other bulbData is true or empty

		//set btn glow
		if (bulb.dataset.active === "true") {
			btnActivate = true;
			bulbDom.forEach((bulb) => {
				//get each bulbs color
				setGlowingLight(
					bulb,
					checkColor(bulb.dataset.color),
					0,
					bulb.dataset.color
				);
			});
			setGlowingLight(bulb, checkColor(listColor), 1, listColor);
			console.log(bulb.dataset.active);
		} else {
			btnActivate = false;
		}

		//set color
		setColor(checkColor(listColor));
	});
});

/**
 * set active button state?
 * ----- variable?
 * --------onClick -> true, setGlow
 * -------- any other btnClick? -> false, setGlow=off
 * -------class?
 * ----------onClick -> add btn-active
 * ----------any other click? run to see who got the btn-active class, remove it
 * ----------set the glow to the new btn
 * if any button has active button state, remove it
 * set the glow
 */

/**
 * set a data-active on each btn
 * with each click, run a loop and make all data-active to false
 * set data-active to true to the recent target
 * setGlowing ligt
 */

/**
 *@setGlow - if dataActive is true - setThe glow
			- else - set the default style
 */

//-------------- Hover
