'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.updateFocusIndex = exports.setRowUnFocus = exports.setRowFocus = undefined;

var _util = require('neoui-sparrow/js/util');

/**
 * 设置焦点行
 * @param {Object} index 行对象或者行index
 * @param quiet 不触发事件
 * @param force 当index行与已focus的行相等时，仍然触发事件
 */
var setRowFocus = function setRowFocus(index, quiet, force) {
    var rowId = null;
    if (index instanceof Row) {
        index = this.getIndexByRowId(index.rowId);
        rowId = index.rowId;
    }
    if (index === -1 || index === this.focusIndex() && !force) {
        return;
    }
    this.focusIndex(index);
    if (quiet) {
        return;
    }
    this.currentRowChange(-this.currentRowChange());
    if (!rowId) {
        rowId = this.getRow(index).rowId;
    }
    this.trigger(DataTable.ON_ROW_FOCUS, {
        index: index,
        rowId: rowId
    });
    this.updateCurrIndex();
};

/**
 * 焦点行反选
 */
/**
 * Module : kero dataTable rowFocus
 * Author : liuyk(liuyk@yonyou.com)
 * Date   : 2016-08-08 09:59:01
 */
var setRowUnFocus = function setRowUnFocus() {
    this.currentRowChange(-this.currentRowChange());
    var indx = this.focusIndex(),
        rowId = null;
    if (indx !== -1) {
        rowId = this.getRow(indx).rowId;
    }
    this.trigger(DataTable.ON_ROW_UNFOCUS, {
        index: indx,
        rowId: rowId
    });
    this.focusIndex(-1);
    this.updateCurrIndex();
};

var updateFocusIndex = function updateFocusIndex(opIndex, opType, num) {
    if (!(0, _util.isNumber)(num)) {
        num = 1;
    }
    if (opIndex <= this.focusIndex() && this.focusIndex() != -1) {
        if (opType === '+') {
            this.focusIndex(this.focusIndex() + num);
        } else if (opType === '-') {
            if (this.focusIndex() >= opIndex && this.focusIndex() <= opIndex + num - 1) {
                this.focusIndex(this.focusIndex() - 1);
            } else if (this.focusIndex() > opIndex + num - 1) {
                this.focusIndex(this.focusIndex() - num);
            }
        }
    }
};

exports.setRowFocus = setRowFocus;
exports.setRowUnFocus = setRowUnFocus;
exports.updateFocusIndex = updateFocusIndex;