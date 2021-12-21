import React from 'react'
import ReactDOM from 'react-dom'
import Counter from '../components/counter'
import BackgroundColorPicker from '../components/background-color-picker'

import './index.css'

function Popup() {
  return (
    <div
      className="p-4 w-[400px] text-center"
    >
      <h1 className="text-3xl bold">React Chrome Extension</h1>
      <small className="mb-4">
        <span className="font-mono">Author: </span><span>山月</span>
      </small>
      <Counter />
      <BackgroundColorPicker />
      <header>
        <span className="font-mono">Github: </span>
        <a href="https://github.com/shfshanyue/react-chrome-extension">react-chrome-extension</a>
      </header>
    </div>
  )
}

ReactDOM.render(
  <React.StrictMode>
    <Popup />
  </React.StrictMode>,
  document.getElementById('app')
)
