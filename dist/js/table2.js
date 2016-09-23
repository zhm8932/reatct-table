webpackJsonp([3],[
/* 0 */
/***/ function(module, exports, __webpack_require__) {

	/* WEBPACK VAR INJECTION */(function(React, ReactDOM) {'use strict';

	//主要的变化就是要通信的两个组件，直接通过其组件句柄去直接访问其方法，没有了中间环节
	// 测试数据
	var _score = [{ name: '张三', gender: '男', chinese: 85, math: 98, _id: 0 }, { name: '张三', gender: '女', chinese: 95, math: 90, _id: 1 }, { name: '李四', gender: '男', chinese: 65, math: 48, _id: 2 }, { name: '大妹', gender: '女', chinese: 95, math: 100, _id: 3 }, { name: '王五', gender: '男', chinese: 75, math: 88, _id: 4 }, { name: '赵钱', gender: '男', chinese: 75, math: 98, _id: 5 }, { name: '二妹', gender: '女', chinese: 90, math: 98, _id: 6 }];

	var StudentScoreTable, GenderFilter, NameFilter, ScoreTable, ScoreItem, _StudentScoreTable, _GenderFilter, _NameFilter, _ScoreItem;

	var StudentScoreTable = React.createClass({
	    displayName: 'StudentScoreTable',

	    getInitialState: function getInitialState() {
	        _StudentScoreTable = this; // 把StudentScoreTable组件赋值给一个变量，以便在其它组件中可以使用此组件的方法
	        return {
	            genderFilter: 0,
	            nameFilter: '',
	            data: _score,
	            modifyScore: null,
	            className: 'dialog modify'
	        };
	    },
	    onGenderChange: function onGenderChange(gender) {
	        this.setState({ genderFilter: gender });
	    },
	    onDeleteScoreItem: function onDeleteScoreItem(id) {
	        var data = this.state.data.map(function (item) {
	            if (item._id === id) {
	                item.deleteFlag = true;
	            }
	            return item;
	        });

	        this.setState(data, data);
	    },
	    onNameChange: function onNameChange(name) {
	        this.setState({ nameFilter: name });
	    },
	    render: function render() {
	        return React.createElement(
	            'div',
	            null,
	            React.createElement(GenderFilter, { genderFilter: this.state.genderFilter }),
	            React.createElement(NameFilter, { nameFilter: this.state.nameFilter }),
	            React.createElement(ScoreTable, { scoreNotes: this.state.data })
	        );
	    }
	});

	var GenderFilter = React.createClass({
	    displayName: 'GenderFilter',

	    getInitialState: function getInitialState() {
	        _GenderFilter = this;
	        return null;
	    },
	    genderChangeHandler: function genderChangeHandler() {
	        console.log("_StudentScoreTable:", _StudentScoreTable);
	        _StudentScoreTable.onGenderChange(this.refs.genderFilter.value);
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

	var NameFilter = React.createClass({
	    displayName: 'NameFilter',

	    getInitialState: function getInitialState() {
	        _NameFilter = this;
	        return null;
	    },
	    nameChangeHandler: function nameChangeHandler() {
	        _StudentScoreTable.onNameChange(this.refs.nameFilter.value);
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

	var ScoreTable = React.createClass({
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

	var ScoreItem = React.createClass({
	    displayName: 'ScoreItem',

	    getInitialState: function getInitialState() {
	        _ScoreItem = this;
	        return null;
	    },
	    deleteHandler: function deleteHandler(e, id) {
	        _StudentScoreTable.onDeleteScoreItem(this.props.score._id);
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

	ReactDOM.render(React.createElement(StudentScoreTable, null), document.querySelector('.j-score'));
	/* WEBPACK VAR INJECTION */}.call(exports, __webpack_require__(1), __webpack_require__(4)))

/***/ }
]);