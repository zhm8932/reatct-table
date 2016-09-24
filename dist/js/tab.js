webpackJsonp([2],[
/* 0 */
/***/ function(module, exports, __webpack_require__) {

	/* WEBPACK VAR INJECTION */(function(React, ReactDOM) {"use strict";

	var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

	function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

	function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

	var TabBox = function (_React$Component) {
	    _inherits(TabBox, _React$Component);

	    function TabBox() {
	        _classCallCheck(this, TabBox);

	        var _this2 = _possibleConstructorReturn(this, (TabBox.__proto__ || Object.getPrototypeOf(TabBox)).call(this));

	        _this2.state = {
	            currentIndex: 0
	        };
	        return _this2;
	    }

	    _createClass(TabBox, [{
	        key: "check_tittle_index",
	        value: function check_tittle_index(index) {
	            console.log("index:", index);
	            return index === this.state.currentIndex ? "active" : "";
	            // return index === this.state.currentIndex?"Tab_tittle active" : "Tab_tittle";
	        }
	    }, {
	        key: "check_content_index",
	        value: function check_content_index(index) {
	            // console.log("index:",index)
	            // console.log("this.state.currentIndex:",this.state.currentIndex)
	            return index === this.state.currentIndex ? "Tab_item show" : "Tab_item";
	        }
	    }, {
	        key: "handlerClick",
	        value: function handlerClick(index) {
	            console.log("this:", this);
	            console.log("index1111111111:", index);
	            console.log("this.props11:", this.props);
	            this.setState({ currentIndex: this.props.index });
	        }
	    }, {
	        key: "render",
	        value: function render() {
	            var _this3 = this;

	            var _this = this;
	            console.log("React.Children:", React.Children);
	            console.log("this.props.children:", this.props.children);
	            return React.createElement(
	                "div",
	                null,
	                React.createElement(
	                    "div",
	                    { className: "Tab_tittle_wrap" },
	                    //动态生成Tab导航
	                    React.Children.map(this.props.children, function (element, index) {
	                        return React.createElement(
	                            "div",
	                            { onClick: function onClick() {
	                                    _this3.setState({ currentIndex: index });
	                                }, className: _this3.check_tittle_index(index), index: index },
	                            element.props.name
	                        );
	                    })
	                ),
	                React.createElement(
	                    "div",
	                    { className: "Tab_item_wrap" },
	                    React.Children.map(this.props.children, function (element, index) {
	                        return React.createElement(
	                            "div",
	                            { className: _this3.check_content_index(index) },
	                            element.props.children
	                        );
	                    })
	                )
	            );
	        }
	    }]);

	    return TabBox;
	}(React.Component);

	var TabComponent = function (_React$Component2) {
	    _inherits(TabComponent, _React$Component2);

	    function TabComponent() {
	        _classCallCheck(this, TabComponent);

	        return _possibleConstructorReturn(this, (TabComponent.__proto__ || Object.getPrototypeOf(TabComponent)).apply(this, arguments));
	    }

	    _createClass(TabComponent, [{
	        key: "handlerC",
	        value: function handlerC() {
	            console.log("this.p:", this.props);
	        }
	    }, {
	        key: "render",
	        value: function render() {
	            return React.createElement(
	                "div",
	                { className: "container" },
	                React.createElement(
	                    TabBox,
	                    null,
	                    React.createElement(
	                        "ul",
	                        { name: "教育" },
	                        React.createElement(
	                            "ul",
	                            null,
	                            React.createElement(
	                                "li",
	                                null,
	                                "我是第一帧"
	                            ),
	                            React.createElement(
	                                "li",
	                                null,
	                                "中国打破了世界软件巨头规则"
	                            ),
	                            React.createElement(
	                                "li",
	                                null,
	                                "口语：会说中文就能说英语！"
	                            )
	                        )
	                    ),
	                    React.createElement(
	                        "ul",
	                        { name: "培训" },
	                        React.createElement(
	                            "li",
	                            null,
	                            "我是第二帧"
	                        ),
	                        React.createElement(
	                            "li",
	                            null,
	                            "中国打破了世界软件巨头规则"
	                        ),
	                        React.createElement(
	                            "li",
	                            null,
	                            "口语：会说中文就能说英语！"
	                        )
	                    ),
	                    React.createElement(
	                        "ul",
	                        { name: "出国" },
	                        React.createElement(
	                            "li",
	                            null,
	                            "我是第三帧"
	                        ),
	                        React.createElement(
	                            "li",
	                            null,
	                            "中国打破了世界软件巨头规则"
	                        ),
	                        React.createElement(
	                            "li",
	                            null,
	                            "口语：会说中文就能说英语！"
	                        )
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