//////////////WHOLE COURSE(FOR REVIEW)/////////////////on the main page:
var fullDefs = {};

var finishedFetches = "";

var levels = document.querySelector('.levels.clearfix').children;

for (let i = 0; i < levels.length; i++) {

	if (i === 0) {
		window.finishedFetches = "";
	}

	fetch(levels[i].href)
	.then(function(response) {
		return response.text();
	})
	.then(function(data) {
		let doc = document.createElement('html');
		doc.innerHTML = data;
		let things = doc.querySelectorAll('.things.clearfix')[0];
		let terms = Array.prototype.slice.call(things.children);
		terms.splice(0, 3);
		terms.splice(terms.length - 1, 1);

		let defs = {};

		for (let i = 0; i < terms.length; i++) {
			let colA = terms[i].children[2];
			let colB = terms[i].children[3];
			let colAString = colA.innerText;
			let colBString = colB.innerText;
			defs[colAString] = colBString;
			defs[colBString] = colAString;
		}

		for (let prop in defs) {
			fullDefs[prop] = defs[prop];
		}
		
		window.finishedFetches += "+";

		if (document.querySelector('.levels.clearfix').children.length === window.finishedFetches.length) {
			window.name = JSON.stringify(fullDefs);
			console.log("done");
		}
	});
}

//////////////SINGLE LEVEL://////////////on the main page with all the definitions:

var things = document.querySelectorAll('.things.clearfix')[0];
var terms = Array.prototype.slice.call(things.children);
terms.splice(0, 3);
terms.splice(terms.length - 1, 1);

var defs = {};

for (let i = 0; i < terms.length; i++) {
	let colA = terms[i].children[2];
	let colB = terms[i].children[3];
	let colAString = colA.innerText;
	let colBString = colB.innerText;
	defs[colAString] = colBString;
	defs[colBString] = colAString;
}

window.name = JSON.stringify(defs);

//////////////////////////in the actual 'game' page:
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

function solve() {
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

window.setInterval(solve, 1000);
