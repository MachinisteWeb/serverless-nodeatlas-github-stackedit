var renderer = new marked.Renderer(),
	mainContentTitle = document.getElementsByClassName('main--content--title')[0],
	mainContentBody = document.getElementsByClassName('main--content--body')[0];

fetch('https://haeresis.github.io/serverless-nodeatlas-github-stackedit/content/partials/header.md')
.then(function(response) {
	response.text().then(function (data) {
		mainContentTitle.innerHTML = marked(data, { renderer: renderer });
	});
});

fetch('https://haeresis.github.io/serverless-nodeatlas-github-stackedit/content/pages/index.md')
.then(function(response) {
	response.text().then(function (data) {
		mainContentBody.innerHTML = marked(data, { renderer: renderer });
	});
});