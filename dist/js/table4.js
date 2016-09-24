webpackJsonp([6],[
/* 0 */
/***/ function(module, exports, __webpack_require__) {

	/* WEBPACK VAR INJECTION */(function(ReactDOM) {'use strict';

	var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) { return typeof obj; } : function (obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol ? "symbol" : typeof obj; };

	var React = __webpack_require__(1);

	var $ = React.DOM;

	// Some shared attrs for JsonTable and JsonRow
	var defaultSettings = {
	    header: true,
	    noRowsMessage: 'No items',
	    classPrefix: 'json'
	},
	    getSetting = function getSetting(name) {
	    var settings = this.props.settings;

	    if (!settings || typeof settings[name] == 'undefined') return defaultSettings[name];

	    return settings[name];
	};

	var JsonTable = React.createClass({
	    displayName: 'JsonTable',

	    getSetting: getSetting,

	    render: function render() {
	        var cols = this.normalizeColumns(),
	            contents = [this.renderRows(cols)];

	        if (this.getSetting('header')) contents.unshift(this.renderHeader(cols));

	        var tableClass = this.props.className || this.getSetting('classPrefix') + 'Table';

	        return $.table({ className: tableClass }, contents);
	    },

	    renderHeader: function renderHeader(cols) {
	        var me = this,
	            prefix = this.getSetting('classPrefix'),
	            headerClass = this.getSetting('headerClass'),
	            cells = cols.map(function (col) {
	            var className = prefix + 'Column';
	            if (headerClass) className = headerClass(className, col.key);

	            return $.th({ className: className, key: col.key, onClick: me.onClickHeader, "data-key": col.key }, col.label);
	        });

	        return $.thead({ key: 'th' }, $.tr({ className: prefix + 'Header' }, cells));
	    },

	    renderRows: function renderRows(cols) {
	        var me = this,
	            items = this.props.rows,
	            settings = this.props.settings || {},
	            i = 1;

	        if (!items || !items.length) return $.tbody({ key: 'body' }, [$.tr({ key: 'row' }, $.td({ key: 'column' }, this.getSetting('noRowsMessage')))]);

	        var rows = items.map(function (item) {
	            var key = me.getKey(item, i);
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
	        });

	        return $.tbody({ key: 'body' }, rows);
	    },

	    getItemField: function getItemField(item, field) {
	        return item[field];
	    },

	    normalizeColumns: function normalizeColumns() {
	        var getItemField = this.props.cellRenderer || this.getItemField,
	            cols = this.props.columns,
	            items = this.props.rows;

	        if (!cols) {
	            if (!items || !items.length) return [];

	            return Object.keys(items[0]).map(function (key) {
	                return { key: key, label: key, cell: getItemField };
	            });
	        }

	        return cols.map(function (col) {
	            var key;
	            if (typeof col == 'string') {
	                return {
	                    key: col,
	                    label: col,
	                    cell: getItemField
	                };
	            }

	            if ((typeof col === 'undefined' ? 'undefined' : _typeof(col)) == 'object') {
	                key = col.key || col.label;

	                // This is about get default column definition
	                // we use label as key if not defined
	                // we use key as label if not defined
	                // we use getItemField as cell function if not defined
	                return {
	                    key: key,
	                    label: col.label || key,
	                    cell: col.cell || getItemField
	                };
	            }

	            return {
	                key: 'unknown',
	                name: 'unknown',
	                cell: 'Unknown'
	            };
	        });
	    },

	    getKey: function getKey(item, i) {
	        var field = this.props.settings && this.props.settings.keyField;
	        if (field && item[field]) return item[field];

	        if (item.id) return item.id;

	        if (item._id) return item._id;

	        return i;
	    },

	    shouldComponentUpdate: function shouldComponentUpdate() {
	        return true;
	    },

	    onClickRow: function onClickRow(e, item) {
	        if (this.props.onClickRow) {
	            this.props.onClickRow(e, item);
	        }
	    },

	    onClickHeader: function onClickHeader(e) {
	        if (this.props.onClickHeader) {
	            this.props.onClickHeader(e, e.target.dataset.key);
	        }
	    },

	    onClickCell: function onClickCell(e, key, item) {
	        if (this.props.onClickCell) {
	            this.props.onClickCell(e, key, item);
	        }
	    }
	});

	var Row = React.createClass({
	    displayName: 'Row',

	    getSetting: getSetting,

	    render: function render() {
	        var me = this,
	            props = this.props,
	            cellClass = this.getSetting('cellClass'),
	            rowClass = this.getSetting('rowClass'),
	            prefix = this.getSetting('classPrefix'),
	            cells = props.columns.map(function (col) {
	            var content = col.cell,
	                key = col.key,
	                className = prefix + 'Cell ' + prefix + 'Cell_' + key;

	            if (cellClass) className = cellClass(className, key, props.item);

	            if (typeof content == 'function') content = content(props.item, key);

	            return $.td({
	                className: className,
	                key: key,
	                "data-key": key,
	                onClick: me.onClickCell
	            }, content);
	        });

	        var className = prefix + 'Row ' + prefix + (props.i % 2 ? 'Odd' : 'Even');

	        if (props.reactKey) className += ' ' + prefix + 'Row_' + props.reactKey;

	        if (rowClass) className = rowClass(className, props.item);

	        return $.tr({
	            className: className,
	            onClick: me.onClickRow,
	            key: this.props.reactKey
	        }, cells);
	    },

	    onClickCell: function onClickCell(e) {
	        this.props.onClickCell(e, e.target.dataset.key, this.props.item);
	    },

	    onClickRow: function onClickRow(e) {
	        this.props.onClickRow(e, this.props.item);
	    }
	});

	// module.exports = JsonTable;


	var items = [{ name: 'Louise', age: 27, color: 'blue' }, { name: 'Lisa', age: 34, color: 'yellow' }, { name: 'Margaret', age: 15, color: 'red' }];

	var SelectTable = React.createClass({
	    displayName: 'SelectTable',

	    getInitialState: function getInitialState() {
	        // We will store the selected cell and row, also the sorted column
	        return { row: false, cell: false, sort: false };
	    },
	    render: function render() {
	        var me = this,

	        // clone the rows
	        items = this.props.rows.slice();
	        // Sort the table
	        if (this.state.sort) {
	            items.sort(function (a, b) {
	                return a[me.state.sort] > b[me.state.sort] ? 1 : -1;
	            });
	        }

	        return React.createElement(JsonTable, {
	            rows: items,
	            settings: this.getSettings(),
	            onClickCell: this.onClickCell,
	            onClickHeader: this.onClickHeader,
	            onClickRow: this.onClickRow });
	    },

	    getSettings: function getSettings() {
	        var me = this;
	        // We will add some classes to the selected rows and cells
	        return {
	            keyField: 'name',
	            cellClass: function cellClass(current, key, item) {
	                if (me.state.cell == key && me.state.row == item.name) return current + ' cellSelected';
	                return current;
	            },
	            headerClass: function headerClass(current, key) {
	                if (me.state.sort == key) return current + ' headerSelected';
	                return current;
	            },
	            rowClass: function rowClass(current, item) {
	                if (me.state.row == item.name) return current + ' rowSelected';
	                return current;
	            }
	        };
	    },

	    onClickCell: function onClickCell(e, column, item) {
	        this.setState({ cell: column });
	    },

	    onClickHeader: function onClickHeader(e, column) {
	        this.setState({ sort: column });
	    },

	    onClickRow: function onClickRow(e, item) {
	        this.setState({ row: item.name });
	    }
	});
	console.log("111111");
	ReactDOM.render(React.createElement(SelectTable, { rows: items }), document.body);
	/* WEBPACK VAR INJECTION */}.call(exports, __webpack_require__(4)))

/***/ }
]);