var cheerio = require('cheerio'),
	fs = require('fs');

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
		while (levels > 0) {
			previewrContext.scopes.pop();
			levels--;
		}
		cb();
	},

	bind: function(bindDetails, previewrContext, cb) {
		var html = previewrContext.clipboard.html();
		previewrContext.clipboard.root().empty();
		// Not sure we want to do bind really as it would require rules around the HTML etc?
		var i = bindDetails.length-1;
		while (i >= 0) {
			previewrContext.clipboard.root().append(html);
			i--;
		}
		cb();
	},

	// TODO: Hook up some sexy ES6 to hook up a few of these from Cheerio.
	addClass: function(className, previewrContext, cb) {
		passThrough('addClass', className, previewrContext, cb);
	}

}

function passThrough(action, input, previewrContext, cb) {
	previewrContext.$scope[action](input);
	cb();
}