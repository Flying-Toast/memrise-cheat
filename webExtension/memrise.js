var prepButton = document.querySelector('#prep');

prepButton.addEventListener('click', prep);

function prep() {
	browser.tabs.executeScript({
		file: '/getDefs.js'
	});
}