const gridContainer = document.querySelector(".grid");
const sizeButton = document.querySelector("#size");
const rainbowButton = document.querySelector("#rainbow");

let size = 16;
let color = gridContainer.style.elementActiveBgColor;


function modifyColorByColorTableChoice(picker) {
    color = picker.toHEXAString();
    gridContainer.style.setProperty("--element-active-bg-color", color);
    
}


function randomColoring() {
    color = "rainbow";
}



function getNewSize(action) {
    console.log("getNewSize called");
    let userSize = parseInt(prompt("Please enter a square grid size (A single positive number no more than 100)."), 10);
        
    while (isNaN(userSize) || userSize <= 0 || userSize > 100) {
        userSize = parseInt(prompt("You must enter a positive integer no greater than 100."), 10);
    }

    action.target.dataset.size = userSize;
    reset();
    gridConfig();
}


function activateListeners() {
    gridContainer.addEventListener("mouseover", function (event) {
        
        if (event.target.className == "grid-item") {
            event.target.classList.add("active");
        
            if (color != "rainbow") {
                // event.target.classList.add("active");
                event.target.style.backgroundColor = color;
            } else {
                event.target.style.backgroundColor = `hsl(${Math.random() * 360}, 100%, 50%)`;
            }
        }
    });
    sizeButton.addEventListener("click", getNewSize);
    rainbowButton.addEventListener("click", randomColoring);
}


function changeSize() {
    
    if (sizeButton.dataset != undefined) {
        
        if (sizeButton.dataset.size && sizeButton.dataset.size != "size" && sizeButton.dataset.size != size) {
            size = sizeButton.dataset.size;
        }
    }
    
    ["--element-height", "--element-width"].forEach((attrib) => {
        gridContainer.style.setProperty(attrib, (40 / size) + "rem");
    });
}


function reset() {
    console.log("resetting");
    const children = document.querySelectorAll(".grid-item");
    children.forEach((child) => {
        gridContainer.removeChild(child);
    });
    color = gridContainer.style.defaultActiveBgColor;
    gridConfig();
}


function drawGrid() {
    console.log("draw grid");
    const gridColItem = [];
    const gridRowItem = [];
    
    for (let i = 0; i < size; i++) {
        gridRowItem[i] = document.createElement("div");
        gridRowItem[i].style.display = "inline-grid";
        
        gridContainer.appendChild(gridRowItem[i]);
        gridContainer.appendChild(document.createElement("br"));
        
        for (let j = 1; j <= size; j++) {
            gridColItem[j] = document.createElement("div");
            gridColItem[j].classList.add("grid-item");
            gridColItem[j].style.gridRow = `${i}`;
            gridColItem[j].style.gridColumn = `${j}`;
            
            gridColItem[j].innerHTML = "&nbsp;";
            gridContainer.appendChild(gridColItem[j]);
        };
    };
}


function gridConfig() {
    console.log("grid config called");
    changeSize();
    let gridSize = (size * size) * 2;

    ["--grid-width", "--grid-height"].forEach((attrib) => {
        let msg = attrib == "--grid-height" ? "height" : "width";
        console.log(`${msg}:  ${attrib},  ${gridSize}`);
        gridContainer.style.setProperty(attrib, gridSize);
    });
    
    drawGrid();
}


gridConfig();
activateListeners();