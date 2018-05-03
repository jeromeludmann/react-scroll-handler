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
        _this.scrollable = {
            overflowY: 'scroll',
            height: 'inherit'
        };
        _this.lastScrollTop = 0;
        _this.currentScrollTop = 0;
        _this.position = {
            isUp: false,
            isDown: false,
            isTop: true,
            isBottom: false
        };
        _this.handlers = {
            onUp: null,
            onDown: null,
            onTop: null,
            onBottom: null
        };
        _this.assignHandlers = function (props) {
            _this.handlers = {
                onUp: props.onUp,
                onDown: props.onDown,
                onTop: props.onTop,
                onBottom: props.onBottom
            };
            if (props.children) {
                window.onscroll = null;
            }
            else {
                window.onscroll = function () {
                    return _this.handleScroll({
                        scrollTop: window.scrollY || window.pageYOffset,
                        offsetHeight: window.innerHeight,
                        scrollHeight: document.body.offsetHeight
                    });
                };
            }
        };
        _this.handleScrollEvent = function (ev) {
            return _this.handleScroll(ev.currentTarget);
        };
        _this.handleScroll = function (scrollData) {
            _this.currentScrollTop = scrollData.scrollTop;
            _this.callHandler('Up', scrollData.scrollTop < _this.lastScrollTop);
            _this.callHandler('Down', scrollData.scrollTop > _this.lastScrollTop);
            _this.callHandler('Top', scrollData.scrollTop <= (_this.props.topOffset || 0));
            _this.callHandler('Bottom', scrollData.scrollTop + scrollData.offsetHeight >=
                scrollData.scrollHeight - (_this.props.bottomOffset || 0));
            _this.lastScrollTop = scrollData.scrollTop;
        };
        _this.callHandler = function (position, condition) {
            _this.position["is" + position] = condition;
            if (!_this.handlers["on" + position] || !_this.position["is" + position]) {
                return;
            }
            return _this.handlers["on" + position]({
                scrollTop: _this.currentScrollTop,
                isUp: _this.position.isUp,
                isDown: _this.position.isDown,
                isTop: _this.position.isTop,
                isBottom: _this.position.isBottom
            });
        };
        return _this;
    }
    ScrollHandler.prototype.componentDidMount = function () {
        this.assignHandlers(this.props);
    };
    ScrollHandler.prototype.componentWillUnmount = function () {
        if (window.onscroll) {
            window.onscroll = null;
        }
    };
    ScrollHandler.prototype.componentDidUpdate = function () {
        this.assignHandlers(this.props);
    };
    ScrollHandler.prototype.render = function () {
        if (!this.props.children) {
            return React.createElement("div", null);
        }
        return (React.createElement("div", { style: this.scrollable, onScroll: this.handleScrollEvent }, this.props.children));
    };
    return ScrollHandler;
}(React.Component));

module.exports = ScrollHandler;
//# sourceMappingURL=ScrollHandler.js.map
