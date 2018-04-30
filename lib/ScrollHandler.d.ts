/// <reference types="react" />
import React from 'react';
export interface Props {
    onTop?: (scroll: ScrollState) => void;
    onBottom?: (scroll: ScrollState) => void;
    onUp?: (scroll: ScrollState) => void;
    onDown?: (scroll: ScrollState) => void;
    topOffset?: number;
    bottomOffset?: number;
    children?: any;
}
export interface ScrollState {
    scrollTop: number;
    isTop: boolean;
    isBottom: boolean;
    isUp: boolean;
    isDown: boolean;
}
export default class ScrollHandler extends React.Component<Props, {}> {
    private lastScrollTop;
    private isTop;
    private isBottom;
    private isUp;
    private isDown;
    private wrapper;
    componentDidMount(): void;
    render(): JSX.Element;
    private handleScrollEvent;
    private handleScroll;
    private handleScrollUp;
    private handleScrollDown;
    private handleScrollTop;
    private handleScrollBottom;
    private getScrollCurrentState;
}
