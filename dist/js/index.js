webpackJsonp([0],[
/* 0 */
/***/ function(module, exports, __webpack_require__) {

	/* WEBPACK VAR INJECTION */(function(React, ReactDOM, $) {"use strict";

	// var $ = require('jquery');
	// var React = require('react');
	// var ReactDOM = require('react-dom');


	console.log("dll's React:", React);
	console.log("dll's ReactDOM:", ReactDOM);

	var a = '88883ddd331111';

	console.log("a:", a);

	console.log("bbb:", a);
	console.log("bbb:", a);

	var add = function add(x, y) {
	    return x + y;
	};

	console.log("add:", add(3, 6));
	console.log("jquery:", $());

	// require('../sass/index.scss');
	var moment = __webpack_require__(5);
	// require('./page');

	console.log('moment:', moment().locale('zh-cn').format('LLLL'));

	var Hello = React.createClass({
	    displayName: "Hello",
	    render: function render() {
	        return React.createElement(
	            "p",
	            null,
	            "Hello !!!!!"
	        );
	    }
	});

	ReactDOM.render(React.createElement(Hello, null), document.querySelector('.app'));
	/* WEBPACK VAR INJECTION */}.call(exports, __webpack_require__(1), __webpack_require__(4), __webpack_require__(2)))

/***/ }
]);