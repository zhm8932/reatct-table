webpackJsonp([3],[
/* 0 */
/***/ function(module, exports, __webpack_require__) {

	/* WEBPACK VAR INJECTION */(function(React, ReactDOM) {'use strict';

	//使用了props进行组件间通讯

	// 测试数据
	var _score = [{ name: '张三', gender: '男', chinese: 85, math: 98, _id: 0 }, { name: '张三', gender: '女', chinese: 95, math: 90, _id: 1 }, { name: '李四', gender: '男', chinese: 65, math: 48, _id: 2 }, { name: '大妹', gender: '女', chinese: 95, math: 100, _id: 3 }, { name: '王五', gender: '男', chinese: 75, math: 88, _id: 4 }, { name: '赵钱', gender: '男', chinese: 75, math: 98, _id: 5 }, { name: '二妹', gender: '女', chinese: 90, math: 98, _id: 6 }];

	var StudentScoreTable = React.createClass({
	    displayName: 'StudentScoreTable',
	    getInitialState: function getInitialState() {
	        return {
	            genderFilter: 0,
	            nameFilter: '',
	            data: _score,
	            modifyScore: null,
	            className: 'dialog modify'
	        };
	    },
	    handlerChangeGender: function handlerChangeGender(gender) {
	        this.setState({ genderFilter: gender });
	    },
	    handleChangeName: function handleChangeName(name) {
	        this.setState({ nameFilter: name });
	    },
	    handlerEdit: function handlerEdit(id) {},
	    handlerDlete: function handlerDlete(id) {
	        //删除
	        // var data= this.state.data.map(function (item) {  //删除一行数据 map()
	        //     console.log("item:",item)
	        //     if(item._id==id){
	        //         item.deleteFlag=true
	        //     }
	        //     return item
	        // })

	        var data = this.state.data.filter(function (item) {
	            //删除一行数据 filter()
	            return item._id != id;
	        });

	        this.setState({ data: data });
	    },

	    render: function render() {
	        return React.createElement(
	            'div',
	            null,
	            React.createElement(
	                'h3',
	                null,
	                'Hello'
	            ),
	            React.createElement(GenderFilter, { handlerChangeGender: this.handlerChangeGender }),
	            React.createElement(NameFilter, { handleChangeName: this.handleChangeName }),
	            React.createElement(ScoreTable, { scoreNotes: this.state.data, nameFilter: this.state.nameFilter, genderFilter: this.state.genderFilter, handlerDlete: this.handlerDlete, handlerEdit: this.handlerEdit })
	        );
	    }
	});

	//性别筛选
	var GenderFilter = React.createClass({
	    displayName: 'GenderFilter',
	    handlerChangeGender: function handlerChangeGender() {
	        console.log("this.refs.genderFilter.value:", this.refs.genderFilter.value);
	        this.props.handlerChangeGender(this.refs.genderFilter.value);
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
	                    '按性别筛选：'
	                ),
	                React.createElement(
	                    'select',
	                    { ref: 'genderFilter', onChange: this.handlerChangeGender },
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

	//姓名筛选
	var NameFilter = React.createClass({
	    displayName: 'NameFilter',
	    handleChangeName: function handleChangeName() {
	        this.props.handleChangeName(this.refs.nameFilter.value);
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
	                    '按姓名筛选：'
	                ),
	                React.createElement('input', { type: 'text', ref: 'nameFilter', onChange: this.handleChangeName })
	            )
	        );
	    }
	});

	//分数表
	var ScoreTable = React.createClass({
	    displayName: 'ScoreTable',
	    handlerDlete: function handlerDlete(id) {
	        this.props.handlerDlete(id);
	    },
	    handlerEdit: function handlerEdit(id) {
	        this.props.handlerEdit(id);
	    },
	    render: function render() {
	        var scoreNotes = [],
	            genderFilter = this.props.genderFilter,
	            nameFilter = this.props.nameFilter,
	            GENDER = ['', '男', '女'],
	            _this = this;

	        this.props.scoreNotes.map(function (scoreItem) {
	            // console.log("scoreItem:",scoreItem)
	            if (genderFilter != 0 && nameFilter == '') {
	                // console.log("scoreItem:",scoreItem)
	                //仅genderFiter有效
	                if (GENDER[genderFilter] === scoreItem.gender) {
	                    scoreNotes.push(scoreItem);
	                    // !scoreItem.deleteFlag&&scoreNotes.push(<ScoreItem score={scoreItem}/>)
	                }
	                return;
	            }
	            if (genderFilter == 0 && nameFilter != '') {
	                console.log("scoreItem.name.search(nameFilter):", scoreItem.name.search(nameFilter));
	                if (scoreItem.name.search(nameFilter) != -1) {
	                    scoreNotes.push(scoreItem);
	                    // !scoreItem.deleteFlag&&scoreNotes.push(<ScoreItem score={scoreItem}/>)
	                }
	                return;
	            }

	            if (genderFilter != 0 && nameFilter != '') {
	                if (GENDER[genderFilter] == scoreItem.gender && scoreItem.name.search(nameFilter) != -1) {
	                    scoreNotes.push(scoreItem);
	                    // !scoreItem.deleteFlag&&scoreNotes.push(<ScoreItem score={scoreItem}/>)
	                }
	                return;
	            }
	            scoreNotes.push(scoreItem); //


	            // !scoreItem.deleteFlag&&scoreNotes.push(<ScoreItem score={scoreItem} handlerDlete={_this.handlerDlete}/>)
	        });

	        console.log("scoreNotes:", scoreNotes);
	        console.log("scoreNotes:", scoreNotes);
	        console.log("scoreNotes:", scoreNotes);
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
	                        '性别'
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
	                scoreNotes.map(function (score) {
	                    return React.createElement(ScoreItem, { score: score, handlerDlete: _this.handlerDlete, handlerEdit: _this.handlerEdit });
	                })
	            )
	        );
	    }
	});

	//TR
	var ScoreItem = React.createClass({
	    displayName: 'ScoreItem',
	    handlerEdit: function handlerEdit() {
	        this.props.handlerEdit(this.props.score._id);
	    },
	    handlerDlete: function handlerDlete() {
	        this.props.handlerDlete(this.props.score._id);
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
	                    { onClick: this.handlerEdit },
	                    '修改'
	                ),
	                React.createElement(
	                    'span',
	                    { onClick: this.handlerDlete },
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