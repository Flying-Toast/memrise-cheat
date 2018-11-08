var defs = JSON.parse(window.name);

function getAnswer(question) {
	return defs[question];
}

function solveTyping() {
	let boxes = document.querySelector('#boxes');
	let input = boxes.children[0].children[3].children[0];

	input.value = getAnswer(getPrompt());
}

function solveOrder() {
	let boxes = document.querySelector('#boxes');
	let words = getAnswer(getPrompt());
	const ignoreChars = [',', '?'];

	for (let i = 0; i < ignoreChars.length; i++) {
		words = words.replace(ignoreChars[i], "");
	}

	words = words.split(" ");
	for (let i = 0; i < words.length; i++) {
		clickWord(words[i]);
	}
}

function clickWord(word) {
	document.querySelector(`[data-word="${word}"]`).click();
}

function solveChoose() {
	let choices = document.querySelectorAll('.val');

	let solution = getAnswer(getPrompt());

	for (let i = 0; i < choices.length; i++) {
		if (choices[i].innerText === solution) {
			choices[i].click();
		}
	}
}

function clickNext() {
	document.querySelector('.next-button').click();
}

function findIncomleteLevel() {
	let progs = document.querySelectorAll(".level-status");

	for (let i=0; i < progs.length; i++) {
		if (progs[i].children.length === 0 || progs[i].children[0].classList.contains("progress")) {
			return i;
		}
	}

	return -1;
}

function solveOrReview() {
	if (findIncomleteLevel() === -1) {
		solve();
	} else {
		solveSingleLevel();
	}
}

//for solving one vocab set, not the entire review
function solveSingleLevel() {
	if (document.querySelectorAll(".level").length > 0 && document.querySelector(".leaderboard-text") !== null) {
		document.querySelectorAll(".level")[findIncomleteLevel()].click();
	}

	if (document.querySelectorAll('.sel-learn-new-words').length === 1 && document.querySelectorAll(".progress")[0].getAttribute("data-original-title") !== "100% learned") {
		document.querySelectorAll('.sel-learn-new-words')[0].click();
	}

	if (document.querySelector(".bar-success") !== null && document.querySelectorAll(".actions-right").length === 1) {
		document.querySelectorAll(".course-details")[0].children[0].click();
	}

	if (document.querySelector("#session-complete-banner") !== null) {
		document.querySelector(".levels").click();
		document.querySelector(".next_btn").click();
	}

	let type = determineType();

	if (type === "write") {
		solveTyping();
	} else if (type === "order") {
		solveOrder();
	} else if (type === "choose") {
		solveChoose();
	} else if (type === "teach") {
		clickNext();
		return;
	}

	clickNext();
}

function solve() {
	if (document.querySelectorAll('.next_btn').length === 1) {
		document.querySelectorAll('.next_btn')[0].click();
		document.querySelectorAll('.levels')[0].click();
	}

	if (document.querySelectorAll('.text').length === 3) {
		document.querySelectorAll('.text')[2].click();
	}

	let type = determineType();

	if (type === "write") {
		solveTyping();
	} else if (type === "order") {
		solveOrder();
	} else if (type === "choose") {
		solveChoose();
	} else if (type === "teach") {
		clickNext();
		return;
	}

	clickNext();
}

function getPrompt() {
	let elt = document.querySelector('.qquestion.qtext');
	if (elt === null) {
		clickNext();
	}
	return elt.innerText;
}

function determineType() {
	//possible types: "order", "write", "choose", "teach"
	let boxes = document.querySelector('#boxes');

	if (boxes === null) {
		return;
	}
	let elt = boxes.children[0];

	if (elt.classList.contains("presentation")) {
		return "teach";
	}

	if (elt.classList.contains("tapping")) {
		return "order";
	}

	if (elt.classList.contains("typing")) {
		return "write";
	}

	if (elt.classList.contains("multiple_choice")) {
		return "choose";
	}

}

window.inter = window.setInterval(solveOrReview, 1000);
