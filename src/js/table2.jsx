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

var StudentScoreTable,
    GenderFilter,
    NameFilter,
    ScoreTable,
    ScoreItem,
    _StudentScoreTable,
    _GenderFilter,
    _NameFilter,
    _ScoreItem;

var StudentScoreTable = React.createClass({
    getInitialState: function () {
        _StudentScoreTable = this; // 把StudentScoreTable组件赋值给一个变量，以便在其它组件中可以使用此组件的方法
        return {
            genderFilter: 0,
            nameFilter: '',
            data: _score,
            modifyScore: null,
            className: 'dialog modify'
        }
    },
    onGenderChange: function (gender) {
        this.setState({genderFilter: gender});
    },
    onDeleteScoreItem: function (id) {
        var data = this.state.data.map(function (item) {
            if(item._id === id) {
                item.deleteFlag = true;
            }
            return item;
        });

        this.setState(data, data);
    },
    onNameChange: function (name) {
        this.setState({nameFilter: name});
    },
    render: function () {
        return (
            <div>
                <GenderFilter genderFilter={this.state.genderFilter}/>
                <NameFilter nameFilter={this.state.nameFilter}/>
                <ScoreTable scoreNotes={this.state.data} />
            </div>
        );
    }
});

var GenderFilter = React.createClass({
    getInitialState: function () {
        _GenderFilter = this;
        return null;
    },
    genderChangeHandler: function () {
        console.log("_StudentScoreTable:",_StudentScoreTable)
        _StudentScoreTable.onGenderChange(this.refs.genderFilter.value);
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

var NameFilter = React.createClass({
    getInitialState: function () {
        _NameFilter = this;
        return null;
    },
    nameChangeHandler: function () {
        _StudentScoreTable.onNameChange(this.refs.nameFilter.value);
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

var ScoreTable = React.createClass({
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

var ScoreItem = React.createClass({
    getInitialState: function () {
        _ScoreItem = this;
        return null;
    },
    deleteHandler: function (e, id) {
        _StudentScoreTable.onDeleteScoreItem(this.props.score._id);
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

ReactDOM.render(<StudentScoreTable />, document.querySelector('.j-score'));