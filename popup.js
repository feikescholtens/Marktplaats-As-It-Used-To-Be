const businessAdsSelector = document.querySelector("#businessAds"),
  otherAdsSelector = document.querySelector("#otherAds")


businessAdsSelector.addEventListener("change", saveSettings)
otherAdsSelector.addEventListener("change", saveSettings)


function saveSettings() {
  chrome.storage.sync.set({
    settings: {
      businessAds: businessAdsSelector.checked,
      otherAds: otherAdsSelector.checked
    }
  }, () => { console.log("Saved settings!") })
}



chrome.storage.sync.get("settings", function(data) {
  businessAdsSelector.checked = data["settings"].businessAds
  otherAdsSelector.checked = data["settings"].otherAds
})