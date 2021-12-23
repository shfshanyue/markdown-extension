import { readability } from 'markdown-read/dist/readability'

chrome.runtime.onMessage.addListener((msg, sender, sendResponse) => {
  if (msg.html) {
    const doc = document.cloneNode(true)
    const content = readability(doc as Document)
    sendResponse(content)
  }
})
