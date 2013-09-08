var assert = require("assert"),
	bindAction = require('../lib/flow').bind,
	cheerio = require('cheerio'),
	path = require('path');

describe('binding html with plates', function(){
	it('should take clipboard html and bind to array', function() {
		var previewrContext = { scopes: [] };
		previewrContext.clipboard = cheerio.load('<div class="name"></div><div class="age"></div>');

		bindAction([{ name: "john", age: 30 }, { name: "stuart", age: 38 }], previewrContext, function(){
			assert.equal('<div class="name">john</div><div class="age">30</div><div class="name">stuart</div><div class="age">38</div>', previewrContext.clipboard.html());
		});
	});

	it('can handle objects holding arrays as well as just arrays', function() {
		var previewrContext = { scopes: [] };
		previewrContext.clipboard = cheerio.load('<ul><li class="items"><span class="name"></span><span class="age"></span></li></ul><div id="totalAge"></div>');

		bindAction({ items: [ {name: "john", age: 30}, {name: "stuart", age:38}], totalAge: 68 }, previewrContext, function(){
			assert.equal('<ul><li class="items"><span class="name">john</span><span class="age">30</span></li><li class="items"><span class="name">stuart</span><span class="age">38</span></li></ul><div id="totalAge">68</div>', previewrContext.clipboard.html());
		});
	});

	it('loads json object from file path', function() {
		var previewrContext = { scopes: [] };
		previewrContext.clipboard = cheerio.load('<ul><li class="items"><span class="name"></span><span class="age"></span></li></ul><div id="totalAge"></div>');

		var jsonPath = path.resolve('./test/data/bind-data.json');
		bindAction(jsonPath, previewrContext, function(err) {
			assert.equal(err, null);
			assert.equal('<ul><li class="items"><span class="name">john</span><span class="age">30</span></li><li class="items"><span class="name">stuart</span><span class="age">38</span></li></ul><div id="totalAge">68</div>', previewrContext.clipboard.html());
		});
	});
});