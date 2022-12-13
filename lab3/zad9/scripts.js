// card and card elements
const card = document.getElementById('employee-card');
const img = document.getElementById('employee-img');
const name = document.getElementById('employee-name');
const position = document.getElementById('employee-position');
const selfdescription = document.getElementById('employee-selfdescription');

const elementsToRotate = [img, name, position, selfdescription];

// left and right buttons
const leftButton = document.getElementById("swipe-left-button");
const rightButton = document.getElementById("swipe-right-button");
const randomButton = document.getElementById("random-button");

leftButton.addEventListener('click', leftSwipe);
rightButton.addEventListener('click', rightSwipe);
randomButton.addEventListener('click', randomSwipe);

let currentNum = 0;
let json;

window.addEventListener("load", async () => {
    await loadJson();
    loadPerson(currentNum)
});

async function getData() {
    const res = await fetch("http://localhost:3000/employees");
    const json = await res.json();
    return json;
}

async function loadJson() {
    json = await getData();
}

function leftSwipe() {
    leftRotation(-1);
}

function rightSwipe() {
    leftRotation(1);
}

function randomSwipe() {
    const rand = Math.floor(Math.random() * (json.length-1) + 1);
    console.log(rand);
    rightRotation(rand);
}

function leftRotation(num) {
    blockAllButtons();

    for (let elem of elementsToRotate) {
        elem.classList.add("left-rotation");
    }
    setTimeout(() => {
        changeCurrentNumBy(num);
        loadPerson(currentNum);

        for (let elem of elementsToRotate) {
            elem.classList.remove("left-rotation");
            elem.classList.add("back-rotation");
        }
        setTimeout(() => {
            for (let elem of elementsToRotate) {
                elem.classList.remove("back-rotation");
            }
            unblockAllButtons();
        }, 500)
    }, 500);

    
}

function rightRotation(num) {
    blockAllButtons();

    for (let elem of elementsToRotate) {
        elem.classList.add("right-rotation");
    }
    setTimeout(() => {
        changeCurrentNumBy(num);
        loadPerson(currentNum);

        for (let elem of elementsToRotate) {
            elem.classList.remove("right-rotation");
            elem.classList.add("back-rotation");
        }
        setTimeout(() => {
            for (let elem of elementsToRotate) {
                elem.classList.remove("back-rotation");
            }
            unblockAllButtons();
        }, 500)
    }, 500); 
}

function blockAllButtons () {
    leftButton.removeEventListener('click', leftSwipe);
    rightButton.removeEventListener('click', rightSwipe);
    randomButton.removeEventListener('click', randomSwipe);
}

function unblockAllButtons () {
    leftButton.addEventListener('click', leftSwipe);
    rightButton.addEventListener('click', rightSwipe);
    randomButton.addEventListener('click', randomSwipe);
}

function loadPerson(num) {
    img.setAttribute('src', "img/" + json[num].img);
    name.textContent = json[num].name;
    position.textContent = json[num].position;
    selfdescription.textContent = json[num].selfdescription;
}

function changeCurrentNumBy(n) {
    if (n >= 0 || currentNum + n >= 0) {
        currentNum = (currentNum + n) % json.length;
        return;
    }
    while (n < 0) {
        n += json.length;
    }
    currentNum = n;
}

