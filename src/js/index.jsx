// var $ = require('jquery');
// var React = require('react');
// var ReactDOM = require('react-dom');


console.log("dll's React:", React);
console.log("dll's ReactDOM:", ReactDOM);

let a = '88883ddd331111';

console.log("a:",a);

console.log("bbb:",a);
console.log("bbb:",a);




let add = (x,y)=>x+y;

console.log("add:",add(3,6));
console.log("jquery:",$());


// require('../sass/index.scss');
var moment = require('moment');
// require('./page');

console.log('moment:',moment().locale('zh-cn').format('LLLL'))

var  Hello = React.createClass({
    render(){
        return <p>Hello !!!!!</p>
    }
})

ReactDOM.render(<Hello/>,document.querySelector('.app'))
