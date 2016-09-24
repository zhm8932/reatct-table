class TabBox extends React.Component{
    constructor(){
        super()
        this.state = {
            currentIndex : 0
        }
    }
    check_tittle_index(index){
        console.log("index:",index)
        return index === this.state.currentIndex?"active" : "";
        // return index === this.state.currentIndex?"Tab_tittle active" : "Tab_tittle";
    }
    check_content_index(index){
        // console.log("index:",index)
        // console.log("this.state.currentIndex:",this.state.currentIndex)
        return index===this.state.currentIndex ? "Tab_item show" : "Tab_item";
    }
    handlerClick(index){
        console.log("this:",this)
        console.log("index1111111111:",index)
        console.log("this.props11:",this.props)
        this.setState({currentIndex:this.props.index})
    }
    render(){
        let _this = this;
        console.log("React.Children:",React.Children)
        console.log("this.props.children:",this.props.children)
        return (
            <div>
                <div className="Tab_tittle_wrap">
                    { //动态生成Tab导航
                        React.Children.map(this.props.children,(element,index)=>{
                            return (
                                <div onClick={()=>{this.setState({currentIndex:index})}} className={this.check_tittle_index(index)} index={index}>{element.props.name}</div>
                            )
                        })

                    }
                </div>
                {/*Tab内容区域*/}
                <div className="Tab_item_wrap">
                    {
                        React.Children.map(this.props.children,(element,index)=>{
                            return <div className={this.check_content_index(index)}>{element.props.children}</div>
                        })
                    }
                </div>
            </div>
        )

    }
}

class TabComponent extends React.Component{
    handlerC(){
        console.log("this.p:",this.props)
    }
    render(){
        return (
            <div className="container">
                <TabBox  >
                    <ul name="教育"><ul><li>我是第一帧</li><li>中国打破了世界软件巨头规则</li><li>口语：会说中文就能说英语！</li></ul></ul>
                    <ul name="培训"><li>我是第二帧</li><li>中国打破了世界软件巨头规则</li><li>口语：会说中文就能说英语！</li></ul>
                    <ul name="出国"><li>我是第三帧</li><li>中国打破了世界软件巨头规则</li><li>口语：会说中文就能说英语！</li></ul>
                </TabBox>
            </div>
        )
    }
}

ReactDOM.render(<TabComponent/>,document.getElementById("app"));