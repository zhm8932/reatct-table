var React = require('react');

var $ = React.DOM;


var items = [
    { name: 'Louise', age: 27, color: 'blue' },
    { name: 'Lisa', age:34, color: 'yellow'},
    { name: 'Margaret', age: 15, color: 'red'}
];
// var columns={'name':'姓名','year':'年龄','color':'颜色'};
var columns=['姓名','年龄','颜色'];

const SelectTable = React.createClass({
    getInitialState(){
        return {row:false,cell:false,sort:false}
    },
    render(){
        let me = this;
        return <JsonTable rows={items} columns={columns} className="table"></JsonTable>
    }
})

/*
 ReactElement DOM.HTML_TAG(
 [object props],
 [children ...]
 )
* */

var defaultSettings = {
    header: true,
    noRowsMessage: 'No items',
    classPrefix: 'json'
}
function getSetting(name){
    let settings = this.props.settings;
    if(!settings||typeof settings[name]=='undefined'){
        return defaultSettings[name];
    }
    return settings[name]
};

const JsonTable = React.createClass({
    getSetting(name){
        let settings = this.props.settings;
        if(!settings||typeof settings[name]=='undefined'){
            return defaultSettings[name];
        }
        return settings[name]
    },
    render(){
        let cols = this.normalizeColumns();

        console.log("cols:",cols)

        let contents = [this.renderRows(cols)];

        if(this.getSetting('header')){
            contents.unshift(this.renderHeader(cols));
        }
        let tableClass = this.props.className||this.getSetting('classPrefix')+'Table';
        return React.DOM.table({className:tableClass},contents)
    },
    renderHeader(cols){
        console.log("renderHeader")
        var me = this,
            prefix = this.getSetting('classPrefix'),
            headerClass = this.getSetting('headerClass'),
            cells = cols.map(function (col) {
                let className = prefix+'Column';
                if(headerClass){
                    className =headerClass(className,col.key)

                    console.log("className:",className)
                }
                return React.DOM.th(
                    {className:className,key:col.key},
                    col.label
                )
            })
        return React.DOM.tr({className:prefix+'Header'},cells)
    },
    renderRows(cols){
        console.log("renderRows")
        let me = this,
            items = this.props.rows,
            settings = this.settings ||{},
            i=1;


        if(!items||!items.length){
            return React.DOM.tbody(
                {key:'tbody'},
                [React.DOM.tr({key:'row'},React.DOM.td({key:'column'},this.getSetting('noRowsMessage')))]
            )
        }

        console.log("items:",items)
        var rows = items.map((item)=>{
            var key = me.getKey(item,i);
            return React.createElement(Row, {
                key: key,
                reactKey: key,
                item: item,
                settings: settings,
                columns: cols,
                i: i++,
                onClickRow: me.onClickRow,
                onClickCell: me.onClickCell
            });
        })


        return React.DOM.tbody({key:'tbody'},rows)
    },
    getKey: function( item, i ){
        var field = this.props.settings && this.props.settings.keyField;
        if( field && item[ field ] )
            return item[ field ];

        if( item.id )
            return item.id;

        if( item._id )
            return item._id;

        return i;
    },
    normalizeColumns(){
        let getItemField = this.props.cellReader||this.getItemField,
            cols = this.props.columns,
            items = this.props.rows;
        console.log("cols:",cols)
        console.log("items:",items)

        if(!cols){
            if(!items||!items.length){
                return [];
            }

            return Object.keys(items[0]).map(function (key) {
                console.log("key:",key)
                return {key:key,label:key,cell:getItemField}
            })
        }

        return cols.map(function (col) {
            var key;
            if(typeof col =='string'){
                return {
                    key:col,
                    label:col,
                    cell:getItemField
                }
            }

        })
    }
})

var Row = React.createClass({
    getSetting: getSetting,

    render: function() {
        var me = this,
            props = this.props,
            cellClass = this.getSetting('cellClass'),
            rowClass = this.getSetting('rowClass'),
            prefix = this.getSetting('classPrefix'),
            cells = props.columns.map( function( col ){
                var content = col.cell,
                    key = col.key,
                    className = prefix + 'Cell ' + prefix + 'Cell_' + key
                    ;

                if( cellClass )
                    className = cellClass( className, key, props.item );

                if( typeof content == 'function' )
                    content = content( props.item, key );

                return $.td( {
                    className: className,
                    key: key,
                    "data-key": key,
                    onClick: me.onClickCell
                }, content );
            })
            ;
        console.log("props:",props)

        var className = prefix + 'Row ' + prefix +
                (props.i % 2 ? 'Odd' : 'Even')
            ;

        // if( props.reactKey )
        //     className += ' ' + prefix + 'Row_' + props.reactKey;
        //
        // if( rowClass )
        //     className = rowClass( className, props.item );

        return $.tr({
            className: className,
            onClick: me.onClickRow,
            key: this.props.reactKey
        }, cells );
    }
});
ReactDOM.render(<SelectTable rows={ items } columns={columns} />, document.body);
