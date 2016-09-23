webpackJsonp([2],[
/* 0 */
/***/ function(module, exports, __webpack_require__) {

	/* WEBPACK VAR INJECTION */(function(React, ReactDOM) {"use strict";

	var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

	function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

	function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

	var TabsControl = function (_React$Component) {
	    _inherits(TabsControl, _React$Component);

	    function TabsControl() {
	        _classCallCheck(this, TabsControl);

	        var _this2 = _possibleConstructorReturn(this, (TabsControl.__proto__ || Object.getPrototypeOf(TabsControl)).call(this));

	        _this2.state = {
	            currentIndex: 0
	        };
	        return _this2;
	    }

	    _createClass(TabsControl, [{
	        key: "check_tittle_index",
	        value: function check_tittle_index(index) {
	            return index === this.state.currentIndex ? "Tab_tittle active" : "Tab_tittle";
	        }
	    }, {
	        key: "check_item_index",
	        value: function check_item_index(index) {
	            return index === this.state.currentIndex ? "Tab_item show" : "Tab_item";
	        }
	    }, {
	        key: "render",
	        value: function render() {
	            var _this3 = this;

	            var _this = this;
	            return React.createElement(
	                "div",
	                null,
	                React.createElement(
	                    "div",
	                    { className: "Tab_tittle_wrap" },
	                    React.Children.map(this.props.children, function (element, index) {
	                        return (
	                            /*箭头函数没有自己的this，这里的this继承自外围作用域，即组件本身*/
	                            React.createElement(
	                                "div",
	                                { onClick: function onClick() {
	                                        _this3.setState({ currentIndex: index });
	                                    }, className: _this3.check_tittle_index(index) },
	                                element.props.name
	                            )
	                        );
	                    })
	                ),
	                React.createElement(
	                    "div",
	                    { className: "Tab_item_wrap" },
	                    React.Children.map(this.props.children, function (element, index) {
	                        return React.createElement(
	                            "div",
	                            { className: _this3.check_item_index(index) },
	                            element
	                        );
	                    })
	                )
	            );
	        }
	    }]);

	    return TabsControl;
	}(React.Component);

	var TabComponent = function (_React$Component2) {
	    _inherits(TabComponent, _React$Component2);

	    function TabComponent() {
	        _classCallCheck(this, TabComponent);

	        return _possibleConstructorReturn(this, (TabComponent.__proto__ || Object.getPrototypeOf(TabComponent)).apply(this, arguments));
	    }

	    _createClass(TabComponent, [{
	        key: "render",
	        value: function render() {
	            return React.createElement(
	                "div",
	                { className: "container" },
	                React.createElement(
	                    TabsControl,
	                    null,
	                    React.createElement(
	                        "div",
	                        { name: "first" },
	                        "我是第一帧"
	                    ),
	                    React.createElement(
	                        "div",
	                        { name: "second" },
	                        "我是第二帧"
	                    ),
	                    React.createElement(
	                        "div",
	                        { name: "third" },
	                        "我是第三帧"
	                    )
	                )
	            );
	        }
	    }]);

	    return TabComponent;
	}(React.Component);

	ReactDOM.render(React.createElement(TabComponent, null), document.getElementById("app"));
	/* WEBPACK VAR INJECTION */}.call(exports, __webpack_require__(1), __webpack_require__(4)))

/***/ }
]);