// CURSOR //
const cursor = document.getElementById('cursor-inner');

function enableCustomCursor() {
    document.body.style.cursor = "none"
    cursor.style.display = "unset";
    document.addEventListener('mousemove', (e) => {
        cursor.style.left = e.clientX + 'px';
        cursor.style.top = e.clientY + 'px';
    });
}

function disableCustomCursor() {
    cursor.style.display = "none";
    document.body.style.cursor = ""
    document.removeEventListener('mousemove', (e) => {
        cursor.style.left = e.clientX + 'px';
        cursor.style.top = e.clientY + 'px';
    });
}



// ZOMBIE //
class Zombie {
    constructor() {
        this.speed = (Math.random() * 4 + 1) * 100;
        this.scaleParameter = Math.random() + 0.8;
        this.width = 200 * this.scaleParameter;
        this.height = 312 * this.scaleParameter;
        this.imgOffset = 0;
        this.yOffset = Math.random() * 250 - 100;

        this.img = document.createElement('img');
        this.img.src = "images/walkingdead.png"
        this.img.classList.add('zombie-img');
        this.img.style.height = `${this.height}px`;
        this.img.setAttribute('dragable', 'false');

        this.div = document.createElement('div');
        this.div.classList.add('zombie-div');

        this.div.style.width = `${this.width}px`;
        this.div.style.height = `${this.height}px`;
        this.div.style.bottom = `${this.yOffset}px`;
        this.div.style.transition = `all ${window.innerWidth / this.speed}s linear`;
        this.div.addEventListener('mousedown', () => { this.shot(); });

        zombies.add(this);
        // append zombie's div to the board
        this.div.appendChild(this.img);
        //console.log(this.div);
        document.getElementById('board').appendChild(this.div);

        this.animate();
    }

    animate() {
        // start transitioning
        setTimeout(() => {
            this.div.style.transform = `translate(${-200}vw)`;
        }, 10);

        this.id = setInterval(() => { this.nextFrame() }, 100);
    }

    nextFrame() {
        this.imgOffset -= this.width;
        if (this.imgOffset <= -1800 * this.scaleParameter) {
            this.imgOffset = 0;
        }
        this.img.style.transform = `translate(${this.imgOffset}px)`;



        // if this zombie reached the end of the map
        if (this.div.getBoundingClientRect().x < -this.width * 1.05) {
            this.reachedEndOfMap();
        }
    }

    shot() {
        gainScore();
        this.die();
    }

    reachedEndOfMap() {
        this.die();
        looseHealth();
    }

    die() {
        zombies.delete(this);
        document.getElementById('board').removeChild(this.div);
        this.div.remove();
        clearInterval(this.id);
    }

}



// VARIOUS VARIABLES AND THEIR FUNCTIONS

let zombies = new Set();
let score = 0;
let health = 3;
const healthDiv = document.getElementById("health");
const nameDiv = document.getElementById("name");
const scoreDiv = document.getElementById("score");

function looseScore() {
    deltaScore(-6);
}

function gainScore() {
    deltaScore(18);
}

function deltaScore(n) {
    score += n;
    scoreDiv.textContent = score;
}

function looseHealth() {
    health--;
    if (health <= 0) {
        endGame();
    }
    healthDiv.textContent = `${health} ❤️`;
}

function resetAllValues() {
    score = 0;
    scoreDiv.textContent = score;
    health = 3;
    healthDiv.textContent = `${health} ❤️`;
}



// START / END GAME //
const uiBar = document.getElementById('ui-bar');
document.getElementById('play-again-button').addEventListener('click', playAgain);
let zombieSpawner;

function startGame() {
    resetAllValues();
    showDefeatPrompt(false);
    showUsernamePrompt(false);
    buildGameScene();
}

function endGame() {
    dismantleGameScene();
    updateAndBuildLeaderboard();
    showDefeatPrompt(true);
}

function playAgain() {
    showUsernamePrompt(true);
    showDefeatPrompt(false);
}

function buildGameScene() {
    nameDiv.textContent = usernameInput.value;

    uiBar.style.display = "flex";
    document.body.addEventListener('mousedown', looseScore);
    document.body.setAttribute('dragable', 'false');
    document.getElementById('board').style.display = "block";

    enableCustomCursor();

    zombieSpawner = setInterval(() => { { new Zombie(); } }, 250);
}

function dismantleGameScene() {
    for (let zombie of zombies) {
        zombie.die();
    }
    uiBar.style.display = "none";
    document.body.removeEventListener('mousedown', looseScore);
    document.getElementById('board').style.display = "none";
    document.body.setAttribute('dragable', 'true');
    disableCustomCursor();
    clearInterval(zombieSpawner);
}

function showDefeatPrompt(bool) {
    document.getElementById('defeat-div').style.display = (bool) ? "flex" : "none";

    // destroy leaderboard
    const leaderboard = document.querySelector("#leaderboard-list");
    leaderboard.removeChild(document.querySelector("#leaderboard-list>tbody"));
    leaderboard.append(document.createElement('tbody'));
}

function showUsernamePrompt(bool) {
    usernameDiv.style.display = (bool) ? "flex" : "none";
    usernameInput.style.borderColor = (bool) ? "initial" : "red";
}

async function updateAndBuildLeaderboard() {
    let json = await updateServerWithMyEntry(usernameInput.value, score);
    buildLeaderboard(json);
}

function buildLeaderboard(json) {
    json = json.sort((a, b) => b.score - a.score);

    const tableBody = document.querySelector("#leaderboard-list > tbody");
    let tr, num, username, score, date;
    for (let i = 0; i < 7; i++) {
        if (json[i] == undefined) {
            break;
        }
        num = createTableDataWith(i + 1);
        username = createTableDataWith(json[i].username);
        score = createTableDataWith(json[i].score);
        date = createTableDataWith(json[i].date);

        tr = document.createElement('tr');
        tr.appendChild(num);
        tr.appendChild(username);
        tr.appendChild(score)
        tr.appendChild(date);

        tableBody.appendChild(tr);
        
    }
}

function createTableDataWith(arg) {
    let newTD = document.createElement('td');
    newTD.textContent = arg;
    return newTD;
}

// USERNAME PROMPT //
const usernameInput = document.getElementById('username-input');
const startGameButton = document.getElementById('start-game-button');
const usernameDiv = document.getElementById('username-div');

startGameButton.addEventListener('click', attemptToStartGame);

function attemptToStartGame() {
    if (verifyUsername()) {
        startGame();
    } else {
        usernameInput.style.borderColor = "red";
    }
}

function verifyUsername() {
    // if there are only letters and numbers (from 3 up to 20)
    const regexp2 = /^[a-zA-Z0-9]{3,20}$/;
    return usernameInput.value.match(regexp2);
}



// SERVER COMMUNICATION //

async function updateServerWithMyEntry(name, score) {
    let json = await getData();
    const myNewEntry = createNewEntry(name, score);
    console.log(json);
    json.push(myNewEntry);
    pushData(json);
    return json;
}

function createNewEntry(myUsername, myScore) {
    const date = new Date();
    let newEntry = { username: myUsername, score: myScore, date: `${date.toISOString()}` };
    return newEntry;
}

async function pushData(json) {
    fetch("https://jsonblob.com/api/jsonBlob/1051932939973312512/", {
        method: "put",
        headers: {
            "Content-type": "application/json; charset=UTF-8"
        },
        body: JSON.stringify(json)
    })
}

async function getData() {
    const res = await fetch("https://jsonblob.com/api/jsonBlob/1051932939973312512/");
    const json = await res.json();
    return json;
}

//if you want to reset server's json, uncomment following code
/*let json = [];
pushData(json);*/
