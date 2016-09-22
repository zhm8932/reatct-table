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

let StudentScoreTable = React.createClass({
    getInitialState(){
        return{
            genderFilter:0,
            nameFilter:'',
            data:_score,
            modifyScore: null,
            className: 'dialog modify'
        }
    },
    handlerChangeGender(gender){
        this.setState({genderFilter:gender})
    },
    handleChangeName(name){
        this.setState({nameFilter:name})
    },
    handlerEdit(id){

    },
    handlerDlete(id){  //删除
        // var data= this.state.data.map(function (item) {  //删除一行数据 map()
        //     console.log("item:",item)
        //     if(item._id==id){
        //         item.deleteFlag=true
        //     }
        //     return item
        // })
        
        var data = this.state.data.filter(function (item) {  //删除一行数据 filter()
            return item._id != id
        })

        this.setState({data:data})
    },
    render:function () {
        return(
            <div>
                <h3>Hello</h3>
                <GenderFilter handlerChangeGender = {this.handlerChangeGender}/>
                <NameFilter handleChangeName = {this.handleChangeName}/>
                <ScoreTable scoreNotes={this.state.data} nameFilter={this.state.nameFilter} genderFilter={this.state.genderFilter} handlerDlete = {this.handlerDlete} handlerEdit = {this.handlerEdit}/>
            </div>
        )
    }
})

//性别筛选
let GenderFilter = React.createClass({
    handlerChangeGender(){
        console.log("this.refs.genderFilter.value:",this.refs.genderFilter.value)
        this.props.handlerChangeGender(this.refs.genderFilter.value)
    },
    render(){
        return(
            <div className="condition-item">
                <label>
                    <span>按性别筛选：</span>
                    <select ref="genderFilter" onChange={this.handlerChangeGender}>
                        <option value="0">All</option>
                        <option value="1">男生</option>
                        <option value="2">女生</option>
                    </select>
                </label>
            </div>
        )
    }
});

//姓名筛选
let NameFilter = React.createClass({
    handleChangeName(){
      this.props.handleChangeName(this.refs.nameFilter.value)
    },
    render(){
        return(
            <div className="condition-item">
                <label>
                    <span>按姓名筛选：</span>
                    <input type="text" ref="nameFilter" onChange={this.handleChangeName}/>
                </label>
            </div>
        )
    }
});

//分数表
let ScoreTable = React.createClass({
    handlerDlete(id){
      this.props.handlerDlete(id)
    },
    handlerEdit(id){
        this.props.handlerEdit(id)
    },
    render(){
        let scoreNotes = [],
            genderFilter = this.props.genderFilter,
            nameFilter = this.props.nameFilter,
            GENDER = ['', '男', '女'],
            _this = this;

        this.props.scoreNotes.map(function (scoreItem) {
            // console.log("scoreItem:",scoreItem)
            if(genderFilter!=0&&nameFilter==''){
                // console.log("scoreItem:",scoreItem)
                //仅genderFiter有效
                if(GENDER[genderFilter] === scoreItem.gender){
                    scoreNotes.push(scoreItem)
                    // !scoreItem.deleteFlag&&scoreNotes.push(<ScoreItem score={scoreItem}/>)

                }
                return;
            }
            if(genderFilter==0&&nameFilter!=''){
                console.log("scoreItem.name.search(nameFilter):",scoreItem.name.search(nameFilter))
                if(scoreItem.name.search(nameFilter)!=-1){
                    scoreNotes.push(scoreItem)
                    // !scoreItem.deleteFlag&&scoreNotes.push(<ScoreItem score={scoreItem}/>)
                }
                return
            }

            if(genderFilter!=0&&nameFilter!=''){
                if(GENDER[genderFilter]==scoreItem.gender&&scoreItem.name.search(nameFilter)!=-1){
                    scoreNotes.push(scoreItem)
                    // !scoreItem.deleteFlag&&scoreNotes.push(<ScoreItem score={scoreItem}/>)
                }
                return
            }
            scoreNotes.push(scoreItem)//


            // !scoreItem.deleteFlag&&scoreNotes.push(<ScoreItem score={scoreItem} handlerDlete={_this.handlerDlete}/>)
        });



        console.log("scoreNotes:",scoreNotes)
        return(
            <table>
                <thead>
                    <tr><th>性别</th><th>性别</th><th>语文</th><th>数学</th><th>操作</th></tr>
                </thead>
                <tbody>
                    {
                        scoreNotes.map(function (score) {
                            return <ScoreItem score={score} handlerDlete={_this.handlerDlete} handlerEdit={_this.handlerEdit}/>
                        })
                    }
                </tbody>
            </table>
        )
    }
})

//TR
let ScoreItem = React.createClass({
    handlerEdit(){
        this.props.handlerEdit(this.props.score._id)
    },
    handlerDlete(){
        this.props.handlerDlete(this.props.score._id)
    },
    render(){
        let score=this.props.score;
        return(
            <tr>
                <td>{score.name}</td>
                <td>{score.gender}</td>
                <td>{score.chinese}</td>
                <td>{score.math}</td>
                <td><span onClick={this.handlerEdit}>修改</span><span onClick={this.handlerDlete}>删除</span></td>
            </tr>
        )
    }
})

ReactDOM.render(<StudentScoreTable/>,document.querySelector('.j-score'));