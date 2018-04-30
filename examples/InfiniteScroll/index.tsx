import React from 'react'
import { render } from 'react-dom'
import { generateData } from '../helpers'
import ScrollHandler from '../../lib/ScrollHandler'

export interface State {
  isFetching: boolean
  items: number[]
}

export default class InfiniteScroll extends React.Component<{}, State> {
  public state: State = {
    isFetching: false,
    items: []
  }

  public componentDidMount() {
    this.setState({ items: generateData(20) })
  }

  public render() {
    return (
      <div>
        <div style={{ marginBottom: '20px' }}>Scroll me to the bottom:</div>

        <div
          style={{
            height: '200px',
            width: '200px',
            border: '1px solid black'
          }}
        >
          <ScrollHandler onBottom={this.fetchData} bottomOffset={50}>
            <ul style={{ listStyle: 'none', padding: '5px', margin: 0 }}>
              {this.state.items.map(item => <li key={item}>{item}</li>)}
            </ul>
          </ScrollHandler>
        </div>

        <div style={{ marginTop: '20px' }}>
          {this.state.isFetching && 'Fetching data...'}
        </div>
      </div>
    )
  }

  private fetchData = () => {
    // prevent fetching data
    if (this.state.isFetching) {
      return
    }

    this.setState({ isFetching: true })

    setTimeout(() => {
      this.setState({
        isFetching: false,
        items: [...this.state.items, ...generateData(5)]
      })
    }, 500)
  }
}

render(
  <InfiniteScroll />,
  document.body.insertBefore(
    document.createElement('div'),
    document.body.firstChild
  )
)
