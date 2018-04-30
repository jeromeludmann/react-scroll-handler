'use strict';

function _interopDefault (ex) { return (ex && (typeof ex === 'object') && 'default' in ex) ? ex['default'] : ex; }

var React = _interopDefault(require('react'));

/*! *****************************************************************************
Copyright (c) Microsoft Corporation. All rights reserved.
Licensed under the Apache License, Version 2.0 (the "License"); you may not use
this file except in compliance with the License. You may obtain a copy of the
License at http://www.apache.org/licenses/LICENSE-2.0

THIS CODE IS PROVIDED ON AN *AS IS* BASIS, WITHOUT WARRANTIES OR CONDITIONS OF ANY
KIND, EITHER EXPRESS OR IMPLIED, INCLUDING WITHOUT LIMITATION ANY IMPLIED
WARRANTIES OR CONDITIONS OF TITLE, FITNESS FOR A PARTICULAR PURPOSE,
MERCHANTABLITY OR NON-INFRINGEMENT.

See the Apache Version 2.0 License for specific language governing permissions
and limitations under the License.
***************************************************************************** */
/* global Reflect, Promise */

var extendStatics = Object.setPrototypeOf ||
    ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
    function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };

function __extends(d, b) {
    extendStatics(d, b);
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
}

var ScrollHandler = /** @class */ (function (_super) {
    __extends(ScrollHandler, _super);
    function ScrollHandler() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        _this.lastScrollTop = 0;
        _this.isTop = true;
        _this.isBottom = false;
        _this.isUp = false;
        _this.isDown = false;
        _this.wrapper = {
            overflowY: 'scroll',
            height: 'inherit'
        };
        _this.handleScrollEvent = function (ev) {
            return _this.handleScroll(ev.currentTarget);
        };
        _this.handleScroll = function (scrollData) {
            for (var _i = 0, _a = [
                _this.handleScrollUp,
                _this.handleScrollDown,
                _this.handleScrollTop,
                _this.handleScrollBottom
            ]; _i < _a.length; _i++) {
                var cb = _a[_i];
                cb(scrollData);
            }
            _this.lastScrollTop = scrollData.scrollTop;
        };
        _this.handleScrollUp = function (_a) {
            var scrollTop = _a.scrollTop;
            _this.isUp = scrollTop < _this.lastScrollTop;
            if (!_this.props.onUp) {
                return;
            }
            if (!_this.isUp) {
                return;
            }
            _this.props.onUp(_this.getScrollCurrentState(scrollTop));
        };
        _this.handleScrollDown = function (_a) {
            var scrollTop = _a.scrollTop;
            _this.isDown = scrollTop > _this.lastScrollTop;
            if (!_this.props.onDown) {
                return;
            }
            if (!_this.isDown) {
                return;
            }
            _this.props.onDown(_this.getScrollCurrentState(scrollTop));
        };
        _this.handleScrollTop = function (_a) {
            var scrollTop = _a.scrollTop;
            _this.isTop = scrollTop <= (_this.props.topOffset || 0);
            if (!_this.props.onTop) {
                return;
            }
            if (!_this.isTop) {
                return;
            }
            _this.props.onTop(_this.getScrollCurrentState(scrollTop));
        };
        _this.handleScrollBottom = function (_a) {
            var scrollTop = _a.scrollTop, offsetHeight = _a.offsetHeight, scrollHeight = _a.scrollHeight;
            _this.isBottom =
                scrollTop + offsetHeight >= scrollHeight - (_this.props.bottomOffset || 0);
            if (!_this.props.onBottom) {
                return;
            }
            if (!_this.isBottom) {
                return;
            }
            _this.props.onBottom(_this.getScrollCurrentState(scrollTop));
        };
        _this.getScrollCurrentState = function (scrollTop) { return ({
            scrollTop: scrollTop,
            isTop: _this.isTop,
            isBottom: _this.isBottom,
            isUp: _this.isUp,
            isDown: _this.isDown
        }); };
        return _this;
    }
    ScrollHandler.prototype.componentDidMount = function () {
        var _this = this;
        if (!this.props.children) {
            window.onscroll = function () {
                return _this.handleScroll({
                    scrollTop: window.scrollY || window.pageYOffset,
                    offsetHeight: window.innerHeight,
                    scrollHeight: document.body.offsetHeight
                });
            };
        }
    };
    ScrollHandler.prototype.render = function () {
        if (!this.props.children) {
            return React.createElement("div", null);
        }
        return (React.createElement("div", { style: this.wrapper, onScroll: this.handleScrollEvent }, this.props.children));
    };
    return ScrollHandler;
}(React.Component));

module.exports = ScrollHandler;
//# sourceMappingURL=ScrollHandler.js.map
