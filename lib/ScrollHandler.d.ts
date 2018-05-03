/// <reference types="react" />
import React from 'react';
export interface Props {
    onTop?: (position: ScrollPosition) => void;
    onBottom?: (position: ScrollPosition) => void;
    onUp?: (position: ScrollPosition) => void;
    onDown?: (position: ScrollPosition) => void;
    topOffset?: number;
    bottomOffset?: number;
    children?: any;
}
export interface ScrollPosition {
    scrollTop: number;
    isTop: boolean;
    isBottom: boolean;
    isUp: boolean;
    isDown: boolean;
}
export default class ScrollHandler extends React.Component<Props, {}> {
    private scrollable;
    private lastScrollTop;
    private currentScrollTop;
    private position;
    private handlers;
    componentDidMount(): void;
    componentWillUnmount(): void;
    componentDidUpdate(): void;
    render(): JSX.Element;
    private assignHandlers;
    private handleScrollEvent;
    private handleScroll;
    private callHandler;
}
