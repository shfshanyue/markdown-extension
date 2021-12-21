chrome.runtime.onMessage.addListener((msg, sender, sendResponse) => {
  if (msg.color) {
    document.body.style.backgroundColor = msg.color
  }
})
