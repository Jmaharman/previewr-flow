var assert = require("assert"),
	flowUtils = require('../lib/flowutils'),
  flowLayout = require('./data/previewr-flow-layout');

// TODO: Change the json to be for tests only once settled.
describe('flowUtils', function(){
	describe('#flowCollector', function() {
		it('should return null when not found', function(){
			var matches = flowUtils.collectFlow('no-items-found', flowLayout);
			assert.equal(matches, null);
		})
		it('should return the home array home found', function(){
			var matches = flowUtils.collectFlow('home', flowLayout);
			assert.equal(matches, flowLayout.home);
		})
		it('should return the gallery.pagination.last-page array', function(){
			var matches = flowUtils.collectFlow('gallery.pagination.last-page', flowLayout);
			assert.equal(matches, flowLayout.gallery.pagination['last-page']);
		})
		it('should return the first child array within gallery', function(){
			var matches = flowUtils.collectFlow('gallery', flowLayout);
			assert.equal(matches, flowLayout.gallery.page);
		})
	})

	describe('#expandFlow', function() {
		it('home should return 3 flow actions', function(){
			var matches = flowUtils.collectExpandedFlow('home', flowLayout);
			assert.equal(flowUtils.actionKey(matches[0]), "layout");
			assert.equal(matches.length, 3);
		})
		it('gallery.pagination.last-page should return the 11 actions', function(){
			var matches = flowUtils.collectExpandedFlow('gallery.pagination.last-page', flowLayout);
			assert.equal(flowUtils.actionKey(matches[0]), "layout");
			assert.equal(matches.length, 11);
		})
		it('gallery should return 3 flow and starts', function(){
			var matches = flowUtils.collectExpandedFlow('gallery', flowLayout);
			assert.equal(flowUtils.actionKey(matches[0]), "layout");
			assert.equal(matches.length, 3);
		})
	})
	describe('#actionKey', function() {
		it('should return the first key of an object', function(){
			assert.equal(flowUtils.actionKey({'test': 'value'}), 'test');
		})
	})
})