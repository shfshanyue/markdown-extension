import React, { useCallback, useEffect, useState } from 'react'
import ReactDOM from 'react-dom'
import { turndown } from 'markdown-read/dist/turndown'
import prettier from 'prettier'

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
  const [copyText, setCopyText] = useState<string>('复制')

  useEffect(() => {
    html().then(data => {
      if (data) {
        const markdown = `> 原文链接: ${data.url}\n> 作者: ${data.byline}\n\n${turndown(data.content)}`
        setContent(markdown)
      }
    })
  }, [])

  const format = useCallback((content) => {
    return prettier.format(content, {
      parser: 'markdown'
    })
  }, [])

  const copy = useCallback((content) => {
    navigator.clipboard.writeText(content).then(() => {
      setCopyText('复制成功')
      setTimeout(() => {
        setCopyText('复制')
      }, 3000)
    })
  }, [content])

  return (
    <div
      className="py-2 w-[420px] rounded-lg"
    >
      <div className="mt-2 mb-2 font-serif text-3xl font-semibold text-center">Markdown Reader</div>
      <textarea
        className="px-2 h-[460px] w-full py-1 overflow-auto break-all border-2 border-gray-300 rounded-none outline-none focus:ring-0 ring-0 border-x-0 border-y content whitespace-wrap"
        value={content}
        // onChange={(e) => setContent(e.target.value)}
      />
      <div className="flex justify-center gap-2 px-2 mt-2">
        <button className="app-button w-[95px] px-0" onClick={() => format(content)}>格式化</button>
        <button className="app-button w-[95px] px-0" onClick={() => copy(content)}>{copyText}</button>
      </div>
    </div>
  )
}

ReactDOM.render(
  <React.StrictMode>
    <Popup />
  </React.StrictMode>,
  document.getElementById('app')
)
