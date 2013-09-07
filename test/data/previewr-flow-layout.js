module.exports = exports = {
	"template": [
		{"layout": "pages/index.html"}
	],
	"home": [
		{"inherit": "template"},
		{"load": "pages/homepage/home.html"},
		{"appendTo": ".main-content"}],
	"gallery": {
		"page": [
			{"inherit": "template" },
			{"load": "features/gallery/gallery.html"},
			{"appendTo": ".main-content"}],
		"no-items": [
			{"inherit": "gallery.page"},
			{"load": "features/gallery/no-items.html"},
			{"appendTo": ".items"},
			{"empty": ".main-content ul"}],
		"paged-items": [
			{"inherit": "gallery.page"},
			{"load": "features/gallery/item-template.html"},
			{"bind": [{ "name": "john" }, { "name": "Stuart" }]},
			{"appendTo": ".items"},
			{"load": "features/pagination/standard-paging.html"},
			{"appendTo": ".main-content"}
		],
		"pagination": {
			"first-page": [
				{"inherit": "gallery.paged-items"},
				{"find": ".pagination li:first-child"},
				{"addClass": "first-item"},
				{"endFind": 1}
			],
			"last-page": [
				{"inherit": "gallery.paged-items"},
				{"find": ".pagination li:last-child"},
				{"addClass": "last-item"},
				{"endFind": 1}
			]
		}
	}
}