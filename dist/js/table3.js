webpackJsonp([5],[
/* 0 */
/***/ function(module, exports, __webpack_require__) {

	/* WEBPACK VAR INJECTION */(function(React, ReactDOM) {'use strict';

	//主要的变化就是要通信的两个组件，直接通过其组件句柄去直接访问其方法，没有了中间环节
	// 测试数据
	var _score = [{ name: '张三', gender: '男', chinese: 85, math: 98, _id: 0 }, { name: '张三', gender: '女', chinese: 95, math: 90, _id: 1 }, { name: '李四', gender: '男', chinese: 65, math: 48, _id: 2 }, { name: '大妹', gender: '女', chinese: 95, math: 100, _id: 3 }, { name: '王五', gender: '男', chinese: 75, math: 88, _id: 4 }, { name: '赵钱', gender: '男', chinese: 75, math: 98, _id: 5 }, { name: '二妹', gender: '女', chinese: 90, math: 98, _id: 6 }];

	var PubSub = __webpack_require__(6);
	var StudentScoreTable,
	    _StudentScoreTable,
	    GenderFilter,
	    NameFilter,
	    ScoreTable,
	    ScoreItem,
	    ScoreItemDeleteEvt = 'scoreitem delete event',
	    GenderFilterChangeEvt = 'genderFilter change event',
	    NameFilterChangeEvt = 'nameFilter change event';

	StudentScoreTable = React.createClass({
	    displayName: 'StudentScoreTable',

	    getInitialState: function getInitialState() {
	        _StudentScoreTable = this;
	        return {
	            genderFilter: 0,
	            nameFilter: '',
	            data: _score,
	            modifyScore: null,
	            className: 'dialog modify'
	        };
	    },
	    componentDidMount: function componentDidMount() {
	        // 订阅ScoreItem的删除事件
	        PubSub.subscribe(ScoreItemDeleteEvt, this.onDeleteScoreItem);

	        // 订阅GenderFilter的改变事件
	        // PubSub.subscribe(GenderFilterChangeEvt, this.onGenderChange);
	        PubSub.subscribe(GenderFilterChangeEvt, this.onGenderChange);

	        // 订阅NameFilter的改变事件
	        PubSub.subscribe(NameFilterChangeEvt, this.onNameChange);
	    },
	    onGenderChange: function onGenderChange(e, gender) {
	        console.log("e:", e);
	        console.log("gender:", gender);
	        this.setState({ genderFilter: gender });
	    },
	    onDeleteScoreItem: function onDeleteScoreItem(e, id) {
	        var data = this.state.data.map(function (item) {
	            if (item._id === id) {
	                item.deleteFlag = true;
	            }
	            return item;
	        });

	        this.setState(data, data);
	    },
	    onNameChange: function onNameChange(e, name) {
	        this.setState({ nameFilter: name });
	    },
	    render: function render() {
	        console.log("this.state:", this.state);
	        return React.createElement(
	            'div',
	            null,
	            React.createElement(GenderFilter, { genderFilter: this.state.genderFilter }),
	            React.createElement(NameFilter, { nameFilter: this.state.nameFilter }),
	            React.createElement(ScoreTable, { scoreNotes: this.state.data })
	        );
	    }
	});

	GenderFilter = React.createClass({
	    displayName: 'GenderFilter',

	    genderChangeHandler: function genderChangeHandler() {
	        // 发布GenderChange事件
	        console.log("this.refs.genderFilter.value:", this.refs.genderFilter.value);
	        PubSub.publish(GenderFilterChangeEvt, this.refs.genderFilter.value);
	    },
	    render: function render() {
	        return React.createElement(
	            'div',
	            { className: 'condition-item' },
	            React.createElement(
	                'label',
	                null,
	                React.createElement(
	                    'span',
	                    null,
	                    '按性别筛选'
	                ),
	                React.createElement(
	                    'select',
	                    { onChange: this.genderChangeHandler, ref: 'genderFilter' },
	                    React.createElement(
	                        'option',
	                        { value: '0' },
	                        'All'
	                    ),
	                    React.createElement(
	                        'option',
	                        { value: '1' },
	                        '男生'
	                    ),
	                    React.createElement(
	                        'option',
	                        { value: '2' },
	                        '女生'
	                    )
	                )
	            )
	        );
	    }
	});

	NameFilter = React.createClass({
	    displayName: 'NameFilter',

	    nameChangeHandler: function nameChangeHandler() {
	        PubSub.publish(NameFilterChangeEvt, this.refs.nameFilter.value);
	    },
	    render: function render() {
	        return React.createElement(
	            'div',
	            { className: 'condition-item' },
	            React.createElement(
	                'label',
	                null,
	                React.createElement(
	                    'span',
	                    null,
	                    '按姓名筛选'
	                ),
	                React.createElement('input', { type: 'text', ref: 'nameFilter', onChange: this.nameChangeHandler, value: this.props.nameFilter })
	            )
	        );
	    }
	});

	ScoreTable = React.createClass({
	    displayName: 'ScoreTable',

	    render: function render() {
	        var scoreNotes = [];
	        var genderFilter = +_StudentScoreTable.state.genderFilter,
	            nameFilter = _StudentScoreTable.state.nameFilter,
	            GENDER = ['', '男', '女'],
	            _this = this;

	        this.props.scoreNotes.map(function (scoreItem) {
	            if (genderFilter !== 0 && nameFilter === '') {
	                // 仅genderfilter生效
	                if (GENDER[genderFilter] === scoreItem.gender) {
	                    !scoreItem.deleteFlag && scoreNotes.push(React.createElement(ScoreItem, { score: scoreItem }));
	                }
	                return;
	            }

	            if (genderFilter === 0 && nameFilter !== '') {
	                // 仅nameFilter生效
	                if (scoreItem.name === nameFilter) {
	                    !scoreItem.deleteFlag && scoreNotes.push(React.createElement(ScoreItem, { score: scoreItem }));
	                }
	                return;
	            }

	            if (genderFilter !== 0 && nameFilter !== '') {
	                // 两个filter都生效
	                if (GENDER[genderFilter] === scoreItem.gender && scoreItem.name === nameFilter) {
	                    !scoreItem.deleteFlag && scoreNotes.push(React.createElement(ScoreItem, { score: scoreItem }));
	                }
	                return;
	            }

	            !scoreItem.deleteFlag && scoreNotes.push(React.createElement(ScoreItem, { score: scoreItem }));
	        });

	        return React.createElement(
	            'table',
	            null,
	            React.createElement(
	                'thead',
	                null,
	                React.createElement(
	                    'tr',
	                    null,
	                    React.createElement(
	                        'th',
	                        null,
	                        '姓名'
	                    ),
	                    React.createElement(
	                        'th',
	                        null,
	                        '性别'
	                    ),
	                    React.createElement(
	                        'th',
	                        null,
	                        '语文'
	                    ),
	                    React.createElement(
	                        'th',
	                        null,
	                        '数学'
	                    ),
	                    React.createElement(
	                        'th',
	                        null,
	                        '操作'
	                    )
	                )
	            ),
	            React.createElement(
	                'tbody',
	                null,
	                scoreNotes
	            )
	        );
	    }
	});

	ScoreItem = React.createClass({
	    displayName: 'ScoreItem',

	    deleteHandler: function deleteHandler(e, id) {
	        PubSub.publish(ScoreItemDeleteEvt, this.props.score._id);
	    },
	    render: function render() {
	        var score = this.props.score;

	        return React.createElement(
	            'tr',
	            null,
	            React.createElement(
	                'td',
	                null,
	                score.name
	            ),
	            React.createElement(
	                'td',
	                null,
	                score.gender
	            ),
	            React.createElement(
	                'td',
	                null,
	                score.chinese
	            ),
	            React.createElement(
	                'td',
	                null,
	                score.math
	            ),
	            React.createElement(
	                'td',
	                null,
	                React.createElement(
	                    'span',
	                    { className: 'trigger' },
	                    '修改'
	                ),
	                React.createElement(
	                    'span',
	                    { className: 'trigger', onClick: this.deleteHandler },
	                    '删除'
	                )
	            )
	        );
	    }
	});

	__webpack_require__(7);

	// BETTER
	var MY_TOPIC = "hello";
	PubSub.subscribe(MY_TOPIC, function (msg, data) {
	    console.log("msg:", msg);
	    console.log(data);
	});

	PubSub.publish(MY_TOPIC, "world");

	ReactDOM.render(React.createElement(StudentScoreTable, null), document.querySelector('.j-score'));

	/*
	 React中组件通信的三种方法：

	 使用props，构建通信链
	 在组件初始化的时候，保存组件的句柄，在其它组件中，使用此句柄达到直接访问组件的目的，完成通信
	 使用PubSub模式
	 其中，第1种方式，在组件嵌套较深时，显示不适用。
	 第2种在组件很多时，也得定义维护很多变量。
	 相比之下，PubSub模式有助于解藕和代码组织，在React的组件通信时，推荐使用此方法。

	* */
	/* WEBPACK VAR INJECTION */}.call(exports, __webpack_require__(1), __webpack_require__(4)))

/***/ },
/* 1 */,
/* 2 */,
/* 3 */,
/* 4 */,
/* 5 */
/***/ function(module, exports, __webpack_require__) {

	module.exports = (__webpack_require__(3))(35);

/***/ },
/* 6 */
/***/ function(module, exports, __webpack_require__) {

	var __WEBPACK_AMD_DEFINE_FACTORY__, __WEBPACK_AMD_DEFINE_ARRAY__, __WEBPACK_AMD_DEFINE_RESULT__;/*
	Copyright (c) 2010,2011,2012,2013,2014 Morgan Roderick http://roderick.dk
	License: MIT - http://mrgnrdrck.mit-license.org

	https://github.com/mroderick/PubSubJS
	*/
	(function (root, factory){
		'use strict';

	    if (true){
	        // AMD. Register as an anonymous module.
	        !(__WEBPACK_AMD_DEFINE_ARRAY__ = [exports], __WEBPACK_AMD_DEFINE_FACTORY__ = (factory), __WEBPACK_AMD_DEFINE_RESULT__ = (typeof __WEBPACK_AMD_DEFINE_FACTORY__ === 'function' ? (__WEBPACK_AMD_DEFINE_FACTORY__.apply(exports, __WEBPACK_AMD_DEFINE_ARRAY__)) : __WEBPACK_AMD_DEFINE_FACTORY__), __WEBPACK_AMD_DEFINE_RESULT__ !== undefined && (module.exports = __WEBPACK_AMD_DEFINE_RESULT__));

	    } else if (typeof exports === 'object'){
	        // CommonJS
	        factory(exports);

	    }

	    // Browser globals
	    var PubSub = {};
	    root.PubSub = PubSub;
	    factory(PubSub);
	    
	}(( typeof window === 'object' && window ) || this, function (PubSub){
		'use strict';

		var messages = {},
			lastUid = -1;

		function hasKeys(obj){
			var key;

			for (key in obj){
				if ( obj.hasOwnProperty(key) ){
					return true;
				}
			}
			return false;
		}

		/**
		 *	Returns a function that throws the passed exception, for use as argument for setTimeout
		 *	@param { Object } ex An Error object
		 */
		function throwException( ex ){
			return function reThrowException(){
				throw ex;
			};
		}

		function callSubscriberWithDelayedExceptions( subscriber, message, data ){
			try {
				subscriber( message, data );
			} catch( ex ){
				setTimeout( throwException( ex ), 0);
			}
		}

		function callSubscriberWithImmediateExceptions( subscriber, message, data ){
			subscriber( message, data );
		}

		function deliverMessage( originalMessage, matchedMessage, data, immediateExceptions ){
			var subscribers = messages[matchedMessage],
				callSubscriber = immediateExceptions ? callSubscriberWithImmediateExceptions : callSubscriberWithDelayedExceptions,
				s;

			if ( !messages.hasOwnProperty( matchedMessage ) ) {
				return;
			}

			for (s in subscribers){
				if ( subscribers.hasOwnProperty(s)){
					callSubscriber( subscribers[s], originalMessage, data );
				}
			}
		}

		function createDeliveryFunction( message, data, immediateExceptions ){
			return function deliverNamespaced(){
				var topic = String( message ),
					position = topic.lastIndexOf( '.' );

				// deliver the message as it is now
				deliverMessage(message, message, data, immediateExceptions);

				// trim the hierarchy and deliver message to each level
				while( position !== -1 ){
					topic = topic.substr( 0, position );
					position = topic.lastIndexOf('.');
					deliverMessage( message, topic, data, immediateExceptions );
				}
			};
		}

		function messageHasSubscribers( message ){
			var topic = String( message ),
				found = Boolean(messages.hasOwnProperty( topic ) && hasKeys(messages[topic])),
				position = topic.lastIndexOf( '.' );

			while ( !found && position !== -1 ){
				topic = topic.substr( 0, position );
				position = topic.lastIndexOf( '.' );
				found = Boolean(messages.hasOwnProperty( topic ) && hasKeys(messages[topic]));
			}

			return found;
		}

		function publish( message, data, sync, immediateExceptions ){
			var deliver = createDeliveryFunction( message, data, immediateExceptions ),
				hasSubscribers = messageHasSubscribers( message );

			if ( !hasSubscribers ){
				return false;
			}

			if ( sync === true ){
				deliver();
			} else {
				setTimeout( deliver, 0 );
			}
			return true;
		}

		/**
		 *	PubSub.publish( message[, data] ) -> Boolean
		 *	- message (String): The message to publish
		 *	- data: The data to pass to subscribers
		 *	Publishes the the message, passing the data to it's subscribers
		**/
		PubSub.publish = function( message, data ){
			return publish( message, data, false, PubSub.immediateExceptions );
		};

		/**
		 *	PubSub.publishSync( message[, data] ) -> Boolean
		 *	- message (String): The message to publish
		 *	- data: The data to pass to subscribers
		 *	Publishes the the message synchronously, passing the data to it's subscribers
		**/
		PubSub.publishSync = function( message, data ){
			return publish( message, data, true, PubSub.immediateExceptions );
		};

		/**
		 *	PubSub.subscribe( message, func ) -> String
		 *	- message (String): The message to subscribe to
		 *	- func (Function): The function to call when a new message is published
		 *	Subscribes the passed function to the passed message. Every returned token is unique and should be stored if
		 *	you need to unsubscribe
		**/
		PubSub.subscribe = function( message, func ){
			if ( typeof func !== 'function'){
				return false;
			}

			// message is not registered yet
			if ( !messages.hasOwnProperty( message ) ){
				messages[message] = {};
			}

			// forcing token as String, to allow for future expansions without breaking usage
			// and allow for easy use as key names for the 'messages' object
			var token = 'uid_' + String(++lastUid);
			messages[message][token] = func;

			// return token for unsubscribing
			return token;
		};

		/* Public: Clears all subscriptions
		 */
		PubSub.clearAllSubscriptions = function clearAllSubscriptions(){
			messages = {};
		};

		/*Public: Clear subscriptions by the topic
		*/
		PubSub.clearSubscriptions = function clearSubscriptions(topic){
			var m; 
			for (m in messages){
				if (messages.hasOwnProperty(m) && m.indexOf(topic) === 0){
					delete messages[m];
				}
			}
		};

		/* Public: removes subscriptions.
		 * When passed a token, removes a specific subscription.
		 * When passed a function, removes all subscriptions for that function
		 * When passed a topic, removes all subscriptions for that topic (hierarchy)
		 *
		 * value - A token, function or topic to unsubscribe.
		 *
		 * Examples
		 *
		 *		// Example 1 - unsubscribing with a token
		 *		var token = PubSub.subscribe('mytopic', myFunc);
		 *		PubSub.unsubscribe(token);
		 *
		 *		// Example 2 - unsubscribing with a function
		 *		PubSub.unsubscribe(myFunc);
		 *
		 *		// Example 3 - unsubscribing a topic
		 *		PubSub.unsubscribe('mytopic');
		 */
		PubSub.unsubscribe = function(value){
			var isTopic    = typeof value === 'string' && messages.hasOwnProperty(value),
				isToken    = !isTopic && typeof value === 'string',
				isFunction = typeof value === 'function',
				result = false,
				m, message, t;

			if (isTopic){
				delete messages[value];
				return;
			}

			for ( m in messages ){
				if ( messages.hasOwnProperty( m ) ){
					message = messages[m];

					if ( isToken && message[value] ){
						delete message[value];
						result = value;
						// tokens are unique, so we can just stop here
						break;
					}

					if (isFunction) {
						for ( t in message ){
							if (message.hasOwnProperty(t) && message[t] === value){
								delete message[t];
								result = true;
							}
						}
					}
				}
			}

			return result;
		};
	}));


/***/ },
/* 7 */
/***/ function(module, exports, __webpack_require__) {

	/* WEBPACK VAR INJECTION */(function(moment) {"use strict";

	// var $ = require('jquery');
	// var React = require('react');
	// var ReactDOM = require('react-dom');

	var str = 'this is a page!!!!';
	// var moment = require('moment');

	console.log("str:", str);
	console.log("str:", str);
	console.log("str:", str);
	console.log("str:", str);

	console.log('moment', moment().locale('zh-cn').format('LLLL'));
	/* WEBPACK VAR INJECTION */}.call(exports, __webpack_require__(5)))

/***/ }
]);