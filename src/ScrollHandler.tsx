import React, { SyntheticEvent } from 'react'

export interface Props {
  onTop?: (position: ScrollPosition) => void
  onBottom?: (position: ScrollPosition) => void
  onUp?: (position: ScrollPosition) => void
  onDown?: (position: ScrollPosition) => void
  topOffset?: number
  bottomOffset?: number
  children?: any
}

export interface ScrollPosition {
  scrollTop: number
  isTop: boolean
  isBottom: boolean
  isUp: boolean
  isDown: boolean
}

export default class ScrollHandler extends React.Component<Props, {}> {
  private scrollable: React.CSSProperties = {
    overflowY: 'scroll',
    height: 'inherit'
  }

  private lastScrollTop = 0
  private currentScrollTop = 0

  private position: { [key: string]: boolean } = {
    isUp: false,
    isDown: false,
    isTop: true,
    isBottom: false
  }

  private handlers: { [key: string]: (position: ScrollPosition) => void } = {
    onUp: null,
    onDown: null,
    onTop: null,
    onBottom: null
  }

  public componentDidMount() {
    this.assignHandlers(this.props)
  }

  public componentWillUnmount() {
    if (window.onscroll) {
      window.onscroll = null
    }
  }

  public componentDidUpdate() {
    this.assignHandlers(this.props)
  }

  public render() {
    if (!this.props.children) {
      return <div />
    }

    return (
      <div style={this.scrollable} onScroll={this.handleScrollEvent}>
        {this.props.children}
      </div>
    )
  }

  private assignHandlers = (props: Props) => {
    this.handlers = {
      onUp: props.onUp,
      onDown: props.onDown,
      onTop: props.onTop,
      onBottom: props.onBottom
    }

    if (props.children) {
      window.onscroll = null
    } else {
      window.onscroll = () =>
        this.handleScroll({
          scrollTop: window.scrollY || window.pageYOffset,
          offsetHeight: window.innerHeight,
          scrollHeight: document.body.offsetHeight
        })
    }
  }

  private handleScrollEvent = (ev: SyntheticEvent<any>) => {
    return this.handleScroll(ev.currentTarget)
  }

  private handleScroll = (scrollData: {
    scrollTop: number
    offsetHeight: number
    scrollHeight: number
  }) => {
    this.currentScrollTop = scrollData.scrollTop

    this.callHandler('Up', scrollData.scrollTop < this.lastScrollTop)
    this.callHandler('Down', scrollData.scrollTop > this.lastScrollTop)
    this.callHandler('Top', scrollData.scrollTop <= (this.props.topOffset || 0))
    this.callHandler(
      'Bottom',
      scrollData.scrollTop + scrollData.offsetHeight >=
        scrollData.scrollHeight - (this.props.bottomOffset || 0)
    )

    this.lastScrollTop = scrollData.scrollTop
  }

  private callHandler = (position: string, condition: boolean) => {
    this.position[`is${position}`] = condition

    if (!this.handlers[`on${position}`] || !this.position[`is${position}`]) {
      return
    }

    return this.handlers[`on${position}`]({
      scrollTop: this.currentScrollTop,
      isUp: this.position.isUp,
      isDown: this.position.isDown,
      isTop: this.position.isTop,
      isBottom: this.position.isBottom
    })
  }
}
