var cheerio = require('cheerio'),
	fs = require('fs'),
	_ = require('underscore'),
	Plates = require('plates');

// TODO: Read this.
/// I wonder if this is perfect for pipes?

// All flow actions states should receive:
/// Action input details
/// previewrContext
/// All flow states should modify these objects to adjust the result over multiple flows.
module.exports = exports = {

	layout: function(templateFile, previewrContext, cb) {
		fs.readFile(templateFile, 'utf8', function (err, data) {
			if (err)
				return cb(err);

			previewrContext.$scope = previewrContext.$ = cheerio.load(data);
			cb();
		});
	},

	load: function(templateFile, previewrContext, cb) {
		fs.readFile(templateFile, 'utf8', function (err, data) {
			if (err)
				return cb(err);

			previewrContext.clipboard = cheerio.load(data);
			console.info(previewrContext.clipboard.length);
			cb();
		});
	},

	appendTo: function(selector, previewrContext, cb) {
		previewrContext.$scope(selector).append(previewrContext.clipboard.html());
		cb();
	},

	empty: function(selector, previewrContext, cb) {
		previewrContext.$scope(selector).empty();
		cb();
	},

	find: function(selector, previewrContext, cb) {
		previewrContext.scopes.push(previewrContext.$scope);
		previewrContext.$scope = previewrContext.$scope(selector);
		cb();
	},

	endFind: function(levels, previewrContext, cb) {
		while (levels > 0 && previewrContext.scopes.length > 0) {
			previewrContext.$scope = previewrContext.scopes.pop();
			levels--;
		}
		cb();
	},

	bind: function(bindDetails, previewrContext, cb) {
		if (_.isString(bindDetails)) {
			fs.readFile(bindDetails, 'utf8', function (err, data) {
				if (err)
					return cb(err);

				bindToHtml(JSON.parse(data), previewrContext.clipboard);
				cb();
			});
		} else {
			bindToHtml(bindDetails, previewrContext.clipboard);
			cb();
		}
	},

	// TODO: Hook up some sexy ES6 to hook up a few of these from Cheerio.
	addClass: function(className, previewrContext, cb) {
		passThrough('addClass', className, previewrContext, cb);
	},

	// TODO: Hook up some sexy ES6 to hook up a few of these from Cheerio.
	removeClass: function(className, previewrContext, cb) {
		passThrough('removeClass', className, previewrContext, cb);
	}
}

function passThrough(action, input, previewrContext, cb) {
	previewrContext.$scope[action](input);
	cb();
}

// Binding to HTML is done via classes and IDs, no special templating languages.
function bindToHtml(data, cheerioDoc) {
	var html = cheerioDoc.html();
	cheerioDoc.root().empty();
	cheerioDoc.root().append(Plates.bind(html, data));
	return ;
}