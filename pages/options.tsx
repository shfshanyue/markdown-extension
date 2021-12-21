import React, { useEffect, useState } from 'react'
import ReactDOM from 'react-dom'
import classNames from 'classnames'

import './index.css'

function Options() {
  const [color, setColor] = useState<string>('')

  useEffect(() => {
    if (color) {
      chrome.storage.sync.set({
        color
      })
    }
  }, [color])

  useEffect(() => {
    chrome.storage.sync.get({
      color: 'bg-gray-50'
    }).then(({ color }) => {
      setColor(color)
    })
  }, [])

  const colors= [
    'snow',
    'azure',
    'whitesmoke',
    'lightyellow',
    'lightcyan',
    'lightblue',
    'lightgreen',
  ]

  return (
    <div className="container p-4">
      <h1 className="mb-4 text-gray-600">
        Select BackgroundColor
      </h1>
      <div className="flex gap-4">
        {
          colors.map(name => (
            <div
              key={name}
              className={classNames(name === color ? 'ring-2 ring-orange-400' : '', 'cursor-pointer shadow rounded w-16 h-16')}
              style={{
                backgroundColor: name
              }}
              onClick={() => {
                setColor(name)
              }}
            >
        
            </div>
          ))
        }
      </div>
    </div>
  )
}

ReactDOM.render(
  <React.StrictMode>
    <Options />
  </React.StrictMode>,
  document.getElementById('app')
)
