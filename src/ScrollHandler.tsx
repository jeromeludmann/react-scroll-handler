import React, { SyntheticEvent } from 'react'

export interface Props {
  onTop?: (scroll: ScrollState) => void
  onBottom?: (scroll: ScrollState) => void
  onUp?: (scroll: ScrollState) => void
  onDown?: (scroll: ScrollState) => void
  topOffset?: number
  bottomOffset?: number
  children?: any
}

export interface ScrollState {
  scrollTop: number
  isTop: boolean
  isBottom: boolean
  isUp: boolean
  isDown: boolean
}

interface ScrollEventData {
  scrollTop: number
  offsetHeight: number
  scrollHeight: number
}

export default class ScrollHandler extends React.Component<Props, {}> {
  private lastScrollTop = 0
  private isTop = true
  private isBottom = false
  private isUp = false
  private isDown = false
  private wrapper: React.CSSProperties = {
    overflowY: 'scroll',
    height: 'inherit'
  }

  public componentDidMount() {
    if (!this.props.children) {
      window.onscroll = () =>
        this.handleScroll({
          scrollTop: window.scrollY || window.pageYOffset,
          offsetHeight: window.innerHeight,
          scrollHeight: document.body.offsetHeight
        })
    }
  }

  public render() {
    if (!this.props.children) {
      return <div />
    }

    return (
      <div style={this.wrapper} onScroll={this.handleScrollEvent}>
        {this.props.children}
      </div>
    )
  }

  private handleScrollEvent = (ev: SyntheticEvent<any>) => {
    return this.handleScroll(ev.currentTarget)
  }

  private handleScroll = (scrollData: ScrollEventData) => {
    for (const cb of [
      this.handleScrollUp,
      this.handleScrollDown,
      this.handleScrollTop,
      this.handleScrollBottom
    ]) {
      cb(scrollData)
    }

    this.lastScrollTop = scrollData.scrollTop
  }

  private handleScrollUp = ({ scrollTop }: ScrollEventData) => {
    this.isUp = scrollTop < this.lastScrollTop

    if (!this.props.onUp) {
      return
    }

    if (!this.isUp) {
      return
    }

    this.props.onUp(this.getScrollCurrentState(scrollTop))
  }

  private handleScrollDown = ({ scrollTop }: ScrollEventData) => {
    this.isDown = scrollTop > this.lastScrollTop

    if (!this.props.onDown) {
      return
    }

    if (!this.isDown) {
      return
    }

    this.props.onDown(this.getScrollCurrentState(scrollTop))
  }

  private handleScrollTop = ({ scrollTop }: ScrollEventData) => {
    this.isTop = scrollTop <= (this.props.topOffset || 0)

    if (!this.props.onTop) {
      return
    }

    if (!this.isTop) {
      return
    }

    this.props.onTop(this.getScrollCurrentState(scrollTop))
  }

  private handleScrollBottom = ({
    scrollTop,
    offsetHeight,
    scrollHeight
  }: ScrollEventData) => {
    this.isBottom =
      scrollTop + offsetHeight >= scrollHeight - (this.props.bottomOffset || 0)

    if (!this.props.onBottom) {
      return
    }

    if (!this.isBottom) {
      return
    }

    this.props.onBottom(this.getScrollCurrentState(scrollTop))
  }

  private getScrollCurrentState = (scrollTop: number) => ({
    scrollTop,
    isTop: this.isTop,
    isBottom: this.isBottom,
    isUp: this.isUp,
    isDown: this.isDown
  })
}
