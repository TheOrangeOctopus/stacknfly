let closeLoginDisplay = document.querySelector(".close-login")
let loginDisplay = document.querySelector(".login-button")
let loginDomEl = document.querySelector(".login-box")

let addInfoBtn = document.querySelector(".btn-stackInfo")
let addStepBtn = document.querySelector(".btn-addStep")
let mainInfoDomEl = document.querySelector(".stack-mainInfo")
let stepDomEl = document.querySelector(".step-creation")
let sourceTypeDomEl = document.querySelector(".source-type")
let sourcesDomEl = document.querySelectorAll(".source")



//let previewFormImgUrlDomEl =  document.querySelector("#img-url")

function fadeInDOMEl(domEl, classToToggle, time) {
    domEl.setAttribute(`style`, `opacity:0;`)
    domEl.classList.toggle(classToToggle)
    setTimeout(function () { domEl.setAttribute(`style`, `opacity:100; transition:${time}ms`) }, time)
  
  setTimeout(() => { domEl.removeAttribute("style") }, time * 2);
}

function fadeOutDOMEl(domEl, classToToggle, time) {
  /* domEl.setAttribute(`style`, `opacity:100;`) */
  domEl.setAttribute(`style`, `opacity:0;transition:${time}ms;`)
  setTimeout(function () {
  domEl.classList.toggle(classToToggle)}, time)
setTimeout(() => { domEl.removeAttribute("style") }, time * 2);
}

function toggleClass2DOMEl(domEl1, domEl2, classToToggle, time) {
  domEl1.setAttribute(`style`, `opacity:0; transition:${time}ms`)
  setTimeout(() => {
    domEl1.classList.toggle(classToToggle)
    domEl2.setAttribute(`style`, `opacity:0; transition:${time}ms`)
    domEl2.classList.toggle(classToToggle)
    setTimeout(function () { domEl2.setAttribute(`style`, `opacity:100; transition:${time}ms`) }, time)
  }, time);
  setTimeout(() => { domEl2.removeAttribute("style") }, time * 3);
}

function loadInfoFromEditor() {
  //Falta hacer el img uploader y la petición del nombre de usuario
  let previewTitleDomEl = document.querySelector("#new-stack-title")
  let previewDescDomEl = document.querySelector("#new-stack-description")
  let previewFormTitleDomEl = document.querySelector("#title")
  let previewFormDescDomEl = document.querySelector("#description")
  let previewFormCategoryDomEl = document.querySelector("#category")
  let previewFormTagsDomEl = document.querySelector("#tags")
  let previewFormTimeDomEl = document.querySelector("#time")
  //let previewFormCreatorDomEl = document.querySelector("#creator")

  let title = document.querySelector("#new-title").value
  let description = document.querySelector("#new-description").value
  let category = document.querySelector("#new-category").value
  let time = document.querySelector("#new-time").value
  let tags = document.querySelector("#new-tags").value
  //let imgUrl = document.querySelector("#new-img-url").value
  //let creator= document.querySelector("#new-creator").value
  previewTitleDomEl.innerHTML = title
  previewDescDomEl.innerHTML = description

  previewFormTitleDomEl.value = title
  previewFormDescDomEl.value = description
  previewFormCategoryDomEl.value = category
  previewFormTagsDomEl.value = tags
  previewFormTimeDomEl.value = time
  // previewFormCreatorDomEl.value=creator
}


function loadStepFromEditor() {
  let stepsContainerDomEl = document.querySelector(".new-stack-steps")
  let newStepDomEl = document.createElement("div")
  let newStepTitleDomEl = document.createElement("h2")
  let newStepInstDomEl = document.createElement("p")
  let title = document.querySelector("#step-title").value
  let instructions = document.querySelector("#step-instructions").value

  function spotifySourceLoader(container) {
    let sourceContainerDomEl = document.createElement("div")
    let a = document.createElement("a")
    let link = document.querySelector("#link-url").value

    a.setAttribute("href", `${link}`)
    a.innerHTML = link

    sourceContainerDomEl.appendChild(a)
    container.appendChild(sourceContainerDomEl)
   }
  function youtubeSourceLoader(container) { }
  function bookSourceLoader(container) { }
  function fileSourceLoader(container) { }
  function linkSourceLoader(container) {
    let sourceContainerDomEl = document.createElement("div")
    let a = document.createElement("a")
    let link = document.querySelector("#link-url").value

    a.setAttribute("href", `${link}`)
    a.innerHTML = link

    sourceContainerDomEl.appendChild(a)
    container.appendChild(sourceContainerDomEl)
  }

  newStepDomEl.setAttribute("class", "new-stack-step")
  newStepTitleDomEl.setAttribute("class", "new-step-title")
  newStepInstDomEl.setAttribute("class", "new-step-description")

  newStepTitleDomEl.innerHTML = title
  newStepInstDomEl.innerHTML = instructions

  newStepDomEl.appendChild(newStepTitleDomEl)
  newStepDomEl.appendChild(newStepInstDomEl)
  stepsContainerDomEl.appendChild(newStepDomEl)

  let sourceType = document.querySelector(".source-type")

  switch (sourceType.value) {
    case "link":
      linkSourceLoader(newStepDomEl)
      break;
    case "spotify":
      spotifySourceLoader(newStepDomEl)
      break;
    case "youtube":
      youtubeSourceLoader(newStepDomEl)
      break;
    case "book":
      bookSourceLoader(newStepDomEl)
      break;
    case "file":
      fileSourceLoader(newStepDomEl)
      break;
  }


}


//Login Display Toggle
loginDisplay.addEventListener("click", function (e) {
  e.preventDefault()
  fadeInDOMEl(loginDomEl, "hidden", 150)
  /* loginDomEl.classList.toggle("hidden") */
})
closeLoginDisplay.addEventListener("click", function (e) {
  e.preventDefault()
  fadeOutDOMEl(loginDomEl, "hidden", 150)
})

//New Stack Handlers
addInfoBtn.addEventListener("click", function (e) {
  e.preventDefault()
  toggleClass2DOMEl(mainInfoDomEl, stepDomEl, "hidden", 300)
  loadInfoFromEditor()
})

addStepBtn.addEventListener("click", function (e) {
  e.preventDefault()
  loadStepFromEditor()
})

sourceTypeDomEl.addEventListener("change", function (e) {
  e.preventDefault()
  sourcesDomEl.forEach((e) => {
    e.classList.add("hidden")
  })
  document.querySelector(`.${sourceTypeDomEl.value}`).classList.toggle("hidden")
})

new Sortable(stepsContainer, {
  animation: 150,
  ghostClass: 'ghost'
});

////////////

