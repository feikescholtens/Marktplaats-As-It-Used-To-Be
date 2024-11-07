let settings

chrome.storage.sync.get("settings", function(data) {
  settings = data["settings"]
})



let ran = false
let myInterval

function removeStuff() {
  // if (ran === true) return

  console.log("trying to remove")
  //Append single elements directly
  const elementsToRemove = [
    document.querySelector(".ndfc-wrapper"),
    document.querySelector(".saveSearchControl p"),
    document.querySelector(".hz-ViewControl"),
    document.querySelector("#adsense-container"),
    document.querySelector(".hz-H1Title"),
    document.querySelector(".hz-SuggestedSearches"),
    document.querySelector(".hz-Footer-appsInstall"),
    document.querySelector(".hz-Listings__container--cas"),
    document.querySelector(".faqFooter"),
    document.querySelector(".hz-H1Title"),
    document.querySelector("#adsense-container"),
  ]


  //Apend multiple elements
  document.querySelectorAll(".hz-Listing--list-item").forEach(listElement => {

    const aTag = listElement.querySelector("a")
    if (settings.businessAds) {
      if (aTag.getAttribute("data-tracking")) elementsToRemove.push(listElement) //Remove brdrijfsadvertenties
    }

    if (settings.otherAds) {
      if (listElement.querySelector(".hz-Listing-priority").innerText !== " " && listElement.querySelector(".hz-Listing-priority").innerText !== "") elementsToRemove.push(listElement) //Remove dagtoppersen dergelijke as wel
    }
  })
  document.querySelectorAll(".hz-Banner--fluid").forEach(element => elementsToRemove.push(element))
  document.querySelectorAll(".hz-Footer-blog").forEach(element => elementsToRemove.push(element))

  let stopInEnd = false

  for (elementID in elementsToRemove) {
    if (elementsToRemove[elementID]) {
      elementsToRemove[elementID].style.display = "none"
      if (elementsToRemove[elementID].classList.contains("hz-Listing--list-item")) {
        stopInEnd = true
      }

    }
  }

  if (stopInEnd) {
    setTimeout(() => clearInterval(myInterval), 1000)
    ran = true
  }


  //Hiding elements
  const parent = document.querySelector(".hz-Page-element--breadCrumbAndSaveSearch")

  if (!parent.querySelector(".hz-ViewControl-group--functional-options")) { //Move sort option selector
    const sortSelect = document.querySelectorAll(".hz-ViewControl-group--functional-options")[document.querySelectorAll(".hz-ViewControl-group--functional-options").length - 1]
    const saveSearch = document.querySelector(".saveSearchControl")

    if (sortSelect && saveSearch) parent.insertBefore(sortSelect, saveSearch)
  }

}

window.addEventListener('load', startRemovingProcess)
document.addEventListener("click", startRemovingProcess)

function startRemovingProcess() {
  ran = false
  myInterval = setInterval(removeStuff, 10)
  setTimeout(() => {
    clearInterval(myInterval)

  }, 5000)
}