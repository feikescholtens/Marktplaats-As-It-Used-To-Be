chrome.runtime.onInstalled.addListener(() => {
  chrome.declarativeContent.onPageChanged.removeRules(undefined, function() {
    chrome.declarativeContent.onPageChanged.addRules([{
      conditions: [new chrome.declarativeContent.PageStateMatcher({
        pageUrl: {
          urlMatches: "https://*/*"
        },
      })],
      actions: [new chrome.declarativeContent.ShowPageAction()]
    }])
  })
})

chrome.storage.sync.get("settings", function(data) {

  if (Object.keys(data).length === 0) { //Set default settings
    chrome.storage.sync.set({
      settings: {
        businessAds: true,
        otherAds: false
      }
    }, () => { console.log("Saved settings!") })
  }

})