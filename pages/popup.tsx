import React, { useEffect, useState } from 'react'
import ReactDOM from 'react-dom'
import { turndown } from 'markdown-read/dist/turndown'

import './index.css'

async function html(): Promise<any | null> {
  const [tab] = await chrome.tabs.query({ active: true, currentWindow: true })
  return new Promise(resolve => {
    if (tab.id) {
      chrome.tabs.sendMessage(
        tab.id,
        {
          html: true
        },
        (content) => {
          resolve(content)
        }
      )
    } else {
      resolve(null)
    }
  })
}

function Popup() {
  const [content, setContent] = useState<string>('')

  useEffect(() => {
    html().then(content => {
      if (content) {
        setContent(turndown(content.content))
      }
    })
  }, [])

  return (
    <div
      className="p-2 w-[420px] grid grid-rows-[50px,500px,30px] rounded-lg"
    >
      <h1 className="mt-2 mb-2 text-3xl bold">Markdown Reader</h1>
      <textarea
        className="px-2 py-1 overflow-auto break-all border border-red-300 rounded content whitespace-wrap"
        value={content}
      />
      <div>hello, world</div>
    </div>
  )
}

ReactDOM.render(
  <React.StrictMode>
    <Popup />
  </React.StrictMode>,
  document.getElementById('app')
)
