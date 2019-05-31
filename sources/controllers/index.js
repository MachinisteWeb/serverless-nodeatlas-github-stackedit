/* jshint node: true */
exports.changeVariations = function (next, locals) {
	var NA = this,
		fs = NA.modules.fs,
		marked = NA.modules.marked,
		renderer = new marked.Renderer(),
		async = NA.modules.async;

	async.parallel([function (callback) {
		fs.readFile(__dirname + '../../../content/partials/header.md', 'utf8', function (err, data) {
			if (err) {
				throw err;
			}

			locals.title = marked(data, { renderer: renderer });
			callback(null);
		});
	}, function (callback) {
		fs.readFile(__dirname + '../../../content/pages/index.md', 'utf8', function (err, data) {
			if (err) {
				throw err;
			}

			locals.content = marked(data, { renderer: renderer });
			callback(null);
		});
	}], function(err) {
		if (err) {
			throw err;
		}

    	next();
	});
};