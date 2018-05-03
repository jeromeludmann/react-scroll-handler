import React from 'react'
import { render } from 'react-dom'
import { generateData } from '../helpers'
import ScrollHandler, { ScrollPosition } from '../../lib/ScrollHandler'

const {
  restoredStickedBar,
  hiddenStickedBar,
  visibleStickedBar
} = require('./style.css')

export interface State {
  items: number[]
  className: any
}

export default class StickedBar extends React.Component<{}, State> {
  public state: State = {
    items: [],
    className: restoredStickedBar
  }

  private lastScrollTop: number

  public componentDidMount() {
    this.setState({ items: generateData(200) })
  }

  public render() {
    return (
      <div>
        <ScrollHandler
          onTop={this.handleScrollTop}
          onUp={this.handleScrollUp}
          onDown={this.handleScrollDown}
          topOffset={100}
        />

        <h1 className={this.state.className}>Scroll me to down then to up</h1>

        <ul style={{ listStyle: 'none', padding: '0', marginTop: '80px' }}>
          {this.state.items.map(item => <li key={item}>{item}</li>)}
        </ul>
      </div>
    )
  }

  private handleScrollTop = (scrollState: ScrollPosition) => {
    if (!scrollState.isUp) {
      this.setState({ className: restoredStickedBar })
    }
  }

  private handleScrollUp = (scrollState: ScrollPosition) => {
    if (scrollState.scrollTop === 0) {
      this.setState({ className: restoredStickedBar })
    } else if (!scrollState.isTop) {
      this.setState({ className: visibleStickedBar })
    }
  }

  private handleScrollDown = (scrollState: ScrollPosition) => {
    if (scrollState.isTop) {
      return
    }

    this.setState({ className: hiddenStickedBar })
  }
}

render(
  <StickedBar />,
  document.body.insertBefore(
    document.createElement('div'),
    document.body.firstChild
  )
)
