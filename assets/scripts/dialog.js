// INITIAL OPENING ON LOAD PAGE
document.querySelector("html").onload = openDialog();
document.querySelector("html").onload = dialogFillSelect();
// END INITIAL OPENING ON LOAD PAGE

// CALLERS
const dialogOpener = document.querySelector(".fa-gear")
dialogOpener.addEventListener("click", openDialog)

const dialogCloser = document.querySelector(".bingo-settings-cancel-button")
dialogCloser.addEventListener("click", closeDialog)

const addSelectorGame = document.querySelector(".selectorAdder-text")
addSelectorGame.addEventListener("click", createSelectBox)

document.querySelector("dialog").addEventListener("submit", buildOnSubmit)
// END OF CALLERS

// FUNCTIONS
function openDialog(){document.querySelector("dialog").showModal()}
function closeDialog(){document.querySelector("dialog").close()}

function dialogFillSelect(){
    const firstSelectGames = document.querySelector(".bingo-games")
    const reverseGameOptions = gameOptions.toReversed();

    reverseGameOptions.forEach(element => createOptionForSelect(element, firstSelectGames))
}

function createSelectBox(){
    const gamesDiv = document.querySelector(".dialog-gameSelectors")
    const newToOld = gameOptions.toReversed();

     let createGrouper = document.createElement("div")
     createGrouper.classList.add("dialog-gameSelectors")

    let createdSelector = document.createElement("select")
    createdSelector.setAttribute("name", "games"+(gamesDiv.childElementCount/2))
    createdSelector.classList.add("bingo-games")

    
    let createdRemoveButton = document.createElement("i")
    createdRemoveButton.classList.add("fa-solid")
    createdRemoveButton.classList.add("fa-xmark")
    
    
    newToOld.forEach(element => createOptionForSelect(element, createdSelector))

    createGrouper.appendChild(createdSelector)
    createGrouper.appendChild(createdRemoveButton)
    gamesDiv.appendChild(createGrouper)
}

function createOptionForSelect(element, selector){
    let tempOptionObject = document.createElement("option")
    tempOptionObject.setAttribute("value", element)
    tempOptionObject.innerHTML = element
    selector.appendChild(tempOptionObject)
}

function buildOnSubmit(){
    let tempDialog = document.querySelector("dialog")
    event.preventDefault();
    tempDialog.close()
    buildBingo()  
}

// END OF FUNCTIONS