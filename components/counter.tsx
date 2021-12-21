import React, { useState, useEffect } from 'react'

function Counter() {
  const [count, setCount] = useState(0)

  useEffect(() => {
    chrome.action.setBadgeText({ text: count.toString() });
  }, [count])

  return (
    <div className="flex flex-col items-center p-4">
      <div className="w-32 text-xl cursor-pointer select-none app-button" onClick={() => setCount(c => c + 1)}>
        Counter
      </div>
      <div className="text-base">{count}</div>
    </div>
  )
}

export default Counter
