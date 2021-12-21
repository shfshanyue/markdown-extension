import React, { useCallback } from 'react'

async function setBackgroundColor() {
  const [tab] = await chrome.tabs.query({ active: true, currentWindow: true })
  const { color } = await chrome.storage.sync.get({
    color: 'bg-gray-50'
  })

  if (tab.id) {
    chrome.tabs.sendMessage(
      tab.id,
      {
        color
      },
      (msg) => {
      }
    )
  }
}

function BackgroundColorPicker() {
  const changeBackgroundColor = useCallback(() => {
    setBackgroundColor()
  }, [])

  return (
    <div className="flex flex-col items-center p-4">
      <div
        className="w-32 text-xl cursor-pointer select-none app-button"
        onClick={() => changeBackgroundColor()}
      >
        换肤
      </div>
      <div
        className="mt-2 cursor-pointer select-none"
        onClick={() => {
          chrome.runtime.openOptionsPage()
        }}
      >
        配置肤色
      </div>
    </div>
  )
}

export default BackgroundColorPicker
