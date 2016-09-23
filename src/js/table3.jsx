//主要的变化就是要通信的两个组件，直接通过其组件句柄去直接访问其方法，没有了中间环节
// 测试数据
var _score = [
    {name: '张三', gender: '男', chinese: 85, math: 98, _id:0},
    {name: '张三', gender: '女', chinese: 95, math: 90, _id:1},
    {name: '李四', gender: '男', chinese: 65, math: 48, _id:2},
    {name: '大妹', gender: '女', chinese: 95, math: 100, _id:3},
    {name: '王五', gender: '男', chinese: 75, math: 88, _id:4},
    {name: '赵钱', gender: '男', chinese: 75, math: 98, _id:5},
    {name: '二妹', gender: '女', chinese: 90, math: 98, _id:6}
];

const PubSub = require('pubsub-js');
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
    getInitialState: function () {
        _StudentScoreTable = this;
        return {
            genderFilter: 0,
            nameFilter: '',
            data: _score,
            modifyScore: null,
            className: 'dialog modify'
        }
    },
    componentDidMount: function () {
        // 订阅ScoreItem的删除事件
        PubSub.subscribe(ScoreItemDeleteEvt, this.onDeleteScoreItem);

        // 订阅GenderFilter的改变事件
        // PubSub.subscribe(GenderFilterChangeEvt, this.onGenderChange);
        PubSub.subscribe(GenderFilterChangeEvt, this.onGenderChange);

        // 订阅NameFilter的改变事件
        PubSub.subscribe(NameFilterChangeEvt, this.onNameChange);

    },
    onGenderChange: function (e,gender) {
        console.log("e:",e)
        console.log("gender:",gender)
        this.setState({genderFilter: gender});
    },
    onDeleteScoreItem: function (e,id) {
        var data = this.state.data.map(function (item) {
            if(item._id === id) {
                item.deleteFlag = true;
            }
            return item;
        });

        this.setState(data, data);
    },
    onNameChange: function (e,name) {
        this.setState({nameFilter: name});
    },
    render: function () {
        console.log("this.state:",this.state)
        return (
            <div>
                <GenderFilter genderFilter={this.state.genderFilter}/>
                <NameFilter nameFilter={this.state.nameFilter}/>
                <ScoreTable scoreNotes={this.state.data} />
            </div>
        );
    }
});

GenderFilter = React.createClass({
    genderChangeHandler: function () {
        // 发布GenderChange事件
        console.log("this.refs.genderFilter.value:",this.refs.genderFilter.value)
        PubSub.publish(GenderFilterChangeEvt, this.refs.genderFilter.value);
    },
    render: function () {
        return (
            <div className="condition-item">
                <label>
                    <span>按性别筛选</span>
                    <select onChange={this.genderChangeHandler} ref="genderFilter">
                        <option value="0">All</option>
                        <option value="1">男生</option>
                        <option value="2">女生</option>
                    </select>
                </label>
            </div>
        );
    }
});

NameFilter = React.createClass({
    nameChangeHandler: function () {
        PubSub.publish(NameFilterChangeEvt, this.refs.nameFilter.value);
    },
    render: function () {
        return (
            <div className="condition-item">
                <label>
                    <span>按姓名筛选</span>
                    <input type="text" ref="nameFilter" onChange={this.nameChangeHandler} value={this.props.nameFilter}/>
                </label>
            </div>
        );
    }
});

ScoreTable = React.createClass({
    render: function () {
        var scoreNotes = [];
        var genderFilter = +_StudentScoreTable.state.genderFilter,
            nameFilter = _StudentScoreTable.state.nameFilter,
            GENDER = ['', '男', '女'],
            _this = this;

        this.props.scoreNotes.map(function (scoreItem) {
            if (genderFilter !== 0 && nameFilter === '') {
                // 仅genderfilter生效
                if (GENDER[genderFilter] === scoreItem.gender) {
                    !scoreItem.deleteFlag && scoreNotes.push(<ScoreItem score={scoreItem} />);
                }
                return;
            }

            if (genderFilter === 0 && nameFilter !== '') {
                // 仅nameFilter生效
                if (scoreItem.name === nameFilter) {
                    !scoreItem.deleteFlag && scoreNotes.push(<ScoreItem score={scoreItem} />);
                }
                return;
            }

            if (genderFilter !== 0 && nameFilter !== '') {
                // 两个filter都生效
                if (GENDER[genderFilter] === scoreItem.gender && scoreItem.name === nameFilter) {
                    !scoreItem.deleteFlag && scoreNotes.push(<ScoreItem score={scoreItem} />);
                }
                return;
            }

            !scoreItem.deleteFlag && scoreNotes.push(<ScoreItem score={scoreItem} />);
        });

        return (
            <table>
                <thead>
                <tr>
                    <th>姓名</th>
                    <th>性别</th>
                    <th>语文</th>
                    <th>数学</th>
                    <th>操作</th>
                </tr>
                </thead>
                <tbody>
                {scoreNotes}
                </tbody>
            </table>
        );
    }
});

ScoreItem = React.createClass({
    deleteHandler: function (e, id) {
        PubSub.publish(ScoreItemDeleteEvt, this.props.score._id);
    },
    render: function () {
        var score = this.props.score;

        return (
            <tr>
                <td>{score.name}</td>
                <td>{score.gender}</td>
                <td>{score.chinese}</td>
                <td>{score.math}</td>
                <td><span className="trigger">修改</span><span className="trigger" onClick={this.deleteHandler}>删除</span></td>
            </tr>
        );
    }
});


// BETTER
var MY_TOPIC = "hello";
PubSub.subscribe(MY_TOPIC, function( msg, data ){
    console.log("msg:",msg)
    console.log( data )
});

PubSub.publish(MY_TOPIC, "world");

ReactDOM.render(<StudentScoreTable />, document.querySelector('.j-score'));

/*
 React中组件通信的三种方法：

 使用props，构建通信链
 在组件初始化的时候，保存组件的句柄，在其它组件中，使用此句柄达到直接访问组件的目的，完成通信
 使用PubSub模式
 其中，第1种方式，在组件嵌套较深时，显示不适用。
 第2种在组件很多时，也得定义维护很多变量。
 相比之下，PubSub模式有助于解藕和代码组织，在React的组件通信时，推荐使用此方法。

* */