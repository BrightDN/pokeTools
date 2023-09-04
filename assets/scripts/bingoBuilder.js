// CALLERS
const bingoRebuilder = document.querySelector(".fa-rotate-right")
bingoRebuilder.addEventListener("click", buildBingo)

const getDocument = document.querySelector("html")
getDocument.addEventListener("click", function(event){
    if (event.target.matches('.bingoTile'))event.target.classList.toggle("overlayCheck")
    else if(event.target.parentElement.matches('.bingoTile'))event.target.parentElement.classList.toggle("overlayCheck")
})
// END OF CALLERS

//FUNCTIONS
function buildBingo(){
    const bingoPlaceElement = document.querySelector(".bingoGrid")
    bingoPlaceElement.innerHTML = ""
    bingoPlaceElement.style.setProperty("grid-template-columns", `repeat(${Math.sqrt(getGridSize())}, 1fr)`)

    const genList = createBingoList(getGridSize(), getChosenGames())
    for(const element of genList){createBingoTile(element, bingoPlaceElement)}
}

function getGridSize(){return document.getElementById("grid-size").value;}

function getChosenGames(){
    if(document.querySelector(".bingo-games").value == "all")return gameOptions
    
    const toIncludeGames = []; 
    document.querySelectorAll(".bingo-games")
    .forEach(function(currentValue){toIncludeGames
        .push(currentValue.value)})
    return toIncludeGames
}


function createBingoTile(element, parentEl){
    let tile = document.createElement("div")
    tile.classList.add("bingoTile")
    
    addImage(tile, element)
    let text = document.createElement("p")
    text.classList.add("bingoTileText")
    text.innerHTML = element.name

    tile.appendChild(text)
    parentEl.appendChild(tile)
}

function createBingoList(bingoSize, includedGames){
    return pokelist.filter(pokemonEntry => {
        for (const game of includedGames){
            if(pokemonEntry.availableGames.includes(game))return true
        }
        return false
    })
    .map(pokemonEntry => ({pokemonEntry, randomNumber: Math.random()}))
    .toSorted((a,b) => a.randomNumber - b.randomNumber)
    .map(entry => entry.pokemonEntry)
    .slice(0, bingoSize)
}

function addImage(placeToAddImageTo, elementUsed){
    let pokemonName = elementUsed.name;
    let pokemonGen = elementUsed.gen
    let imageObject = document.createElement("img");
    let pokemonImageSource = `https://github.com/BrightDN/poketoolsTools/blob/main/pokemonImages/gen${pokemonGen}/${pokemonName}.png?raw=true`
    
    imageObject.setAttribute("src", pokemonImageSource)
    imageObject.setAttribute("alt", `Image of ${pokemonName}`);
    placeToAddImageTo.appendChild(imageObject)
}
//END OF FUNCTIONS

// TESTING
// async function getDataTest() {
//     const requestURL =
//       "https://raw.githubusercontent.com/BrightDN/poketoolsTools/main/jsonTesting.json";
//     const request = new Request(requestURL);
  
//     const response = await fetch(request);
//     const gatheredData = await response.json();
//     console.log(gatheredData)
// }
// END OF TESTING