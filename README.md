# react-scroll-handler

⚛ Scroll events handling with React

Just made for my needs, feel free to improve it.

## Installation

```sh
npm install react-scroll-handler
```

## Usage

See examples below:

* [InfiniteScroll](https://github.com/jeromeludmann/react-scroll-handler/blob/master/examples/InfiniteScroll/index.tsx)
* [StickedBar](https://github.com/jeromeludmann/react-scroll-handler/blob/master/examples/StickedBar/index.tsx)

## Props

| Property       | Type                       | Description                       |
| -------------- | -------------------------- | --------------------------------- |
| `onTop`        | `(ScrollPosition) => void` | Triggers when scroll is to top    |
| `onBottom`     | `(ScrollPosition) => void` | Triggers when scroll is to bottom |
| `onUp`         | `(ScrollPosition) => void` | Triggers when scroll goes up      |
| `onDown`       | `(ScrollPosition) => void` | Triggers when scroll goes down    |
| `topOffset`    | `number`                   | Defines top offset                |
| `bottomOffset` | `number`                   | Defines bottom offset             |

`ScrollPosition`:

* `scrollTop`: number
* `isTop`: boolean
* `isBottom`: boolean
* `isUp`: boolean
* `isDown`: boolean
