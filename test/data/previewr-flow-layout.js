module.exports = exports = {
	"pages": {
		"home": [
			{"layout": "pages/index.html"},
			{"load": "pages/homepage/home.html"},
			{"appendTo": ".main-content"}
		],
		"gallery": [
			{"layout": "pages/index.html" },
			{"load": "features/gallery/gallery.html"},
			{"appendTo": ".main-content"}
		],
		"gallery/no-items": [
			{"inherit": "gallery"},
			{"load": "features/gallery/no-items.html"},
			{"appendTo": ".items"},
			{"empty": ".main-content ul"}
		],
		"gallery/paged-items": [
			{"inherit": "gallery"},
			{"load": "features/gallery/item-template.html"},
			{"bind": [{ "name": "john" }, { "name": "Stuart" }]},
			{"appendTo": ".items"},
			{"load": "features/pagination/standard-paging.html"},
			{"appendTo": ".main-content"}
		],
		"gallery/pagination": [
			{"inherit": "gallery/paged-items"},
			{"find": ".pagination li:first-child"},
			{"addClass": "first-item"},
			{"endFind": 1}
		],
		"gallery/pagination/last-page": [
			{"inherit": "gallery/paged-items"},
			{"find": ".pagination li:last-child"},
			{"addClass": "last-item"},
			{"endFind": 1}
		]
	}
}