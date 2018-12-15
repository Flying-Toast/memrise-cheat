window.fullDefs = {};

window.finishedFetches = "";

window.levels = document.querySelector('.levels.clearfix').children;

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


				let colAString;
				let colBString;

				if (colB.classList.contains("image")) {//image
					colBString = colB.children[0].children[0].src;
				} else {//not image
					colBString = colB.innerText;
				}

				if (colA.classList.contains("image")) {
					colAString = colA.children[0].children[0].src;
				} else {
					colAString = colA.innerText;
				}

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
