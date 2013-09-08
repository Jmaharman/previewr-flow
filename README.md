#previewr-flow

This is a helper library that's used to generate HTML based on a set of instructions using predefined commands. The idea is that you create a chain of actions that flow from one to the next to generate your desired HTML using css selectors and common methods you know from libraries such as jQuery.

NOTE: This is currently only expected to be used as a dependency for previewr and could likely change while due to the API being unstable and possibly being refactored again. It's adviced that you do not use this directly for now.

##.previewr-flow.json
This file is a json document which describes how a site can be generated using "pages" and action objects. Any keys placed on the "pages" object will be used as a URL, with the value being an array of actions to be run. 

```javascript
{
	"pages": {
		"home": [
			/* action objects, ... */
		]
	}
}
```

NOTE: I've realised that the idea of the ".previewr-flow.json" is actually a bit more focused towards "previewr" app itself rather than its own entity at the moment. This will be reviewed soon and decided what to do with it.

##flowing a document together.

When flowing a document the selected page's array of actions are run one after another to create an HTML document. The first action within each array must be either "layout" or "inherits", if you don't then bad things will happen to you!

- The "layout" creates the initial HTML document that is traversed and manipulated throughout the rest of the flow. The current scope at this point is set to the root of the html document.
- 
- actions can decide whether they wish to manipulate the global scope, current scope or clipboard data. We suggest that each action can only manipulate one at a time so that they can be used in a multi-tude of ways.
- generally 


##actions
Actions are plain old javascript objects with one key and value. The key states which action is to be run and the value is what is passed to the "action" itself (which is a function).

Here is a list of all the built in actions and how they work:

```javascript
{ "key": "value"}
```

NOTE: Any files that are loaded in an action will be loaded from the root of the application.

###layout
"layout" loads the initial HTML document that you'll be manipulating through-out the rest of the flow.
```javascript
{ "layout": "foo.html"}
```

###inherits
"inherits" copies another pages actions so you can re-use a current page layout. The value must be a URL of another "page" within the "pages" object (See above).

```javascript
{ "inherits": "home" }
```

###load
"load" will load an HTML document into the clipboard of previewr-flow ready for any additional manipulation.

```javascript
{ "load": "bar.html" }
```

###appendTo
"appendTo" will take whatever is in the current clipboard and append it to the element found with the CSS selector given.

```javascript
{ "appendTo": ".main-content" }
```

###empty
"empty" will empty any contents found within the CSS selector given.

```javascript
{ "empty": ".main-content" }
```

###find
"find" will change the current scope of the document to the CSS selector given.

```javascript
{ "find": ".main-content" }
```

###endFind
"endFind" will back out of the current scope created when using "find" further up in the page flow. It accepts a number to define how many scopes to back out of.

```javascript
{ "endFine": 1 }
```

###addClass
"addClass" does exactly what it says on the tin, adding the class given to the current scope. Try to use inline with "find" for the best results.

```javascript
{ "find": ".main-content" },
{ "addClass": "new-class-added"},
{ "endFind": 1}
```

###bind
"bind" can be used to bind a plain old javascript object against HTML or a template.

```javascript
{ "load": "bar.html" },
{ "bind": [{ "name": "john" }, { "name": "stuart" }]},
{ "appendTo": ".main-content" }
```

NOTE: At the moment this is actually just taking the HTML in the clipboard and duplicating it as many times as there are records in the array. This needs work to do the following:

- [ ] Bind basic objects to HTML using class mapping or something similar, basically avoiding specialized templates.
- [ ] Find a way of allowing developers to actually overwrite the "html templating" that we intend to create and use their own.

## How to create your own actions...

When each action is run it receives an object with a $scope property on it. This $scope object is the Cheerio document... COMPLETE THIS.