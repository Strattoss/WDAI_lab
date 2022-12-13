let pointsCounter = 0;
let propagationOn = true;
let propagationOrderReversed = false;

let box1 = document.getElementById("box1");
let box2 = document.getElementById("box2");
let box3 = document.getElementById("box3");

box1.addEventListener('click', box1Clicked);
box2.addEventListener('click', box2Clicked);
box3.addEventListener('click', box3Clicked);

document.getElementById('clear-button').addEventListener('click', clearMessages);
document.getElementById('reset-button').addEventListener('click', resetEverything);
document.getElementById('propagation-button').addEventListener('click', switchProagation);
document.getElementById('reverse-button').addEventListener('click', reverseProagationDirection);

function clearMessages() {
    document.getElementById('info').innerText = "";
}

function resetEverything() {
    pointsCounter = 0;
    document.getElementById('points').innerText = 0;

    propagationOn = true

    while (propagationOrderReversed) {
        reverseProagationDirection();
    }

    document.getElementById('info').innerText = "Reset!";
}

function switchProagation() {
    propagationOn = !propagationOn;
}

function reverseProagationDirection() {
    switch (propagationOrderReversed) {
        case true: {
            box1.removeEventListener('click', box1Clicked, true);
            box2.removeEventListener('click', box2Clicked, true);
            box3.removeEventListener('click', box3Clicked, true);

            box1.addEventListener('click', box1Clicked);
            box2.addEventListener('click', box2Clicked);
            box3.addEventListener('click', box3Clicked);

            break;
        }
        case false: {
            box1.removeEventListener('click', box1Clicked);
            box2.removeEventListener('click', box2Clicked);
            box3.removeEventListener('click', box3Clicked);

            box1.addEventListener('click', box1Clicked, true);
            box2.addEventListener('click', box2Clicked, true);
            box3.addEventListener('click', box3Clicked, true);

            break;
        }
    }

    propagationOrderReversed = !propagationOrderReversed;
}

function showMessage(s) {
    document.getElementById('info').innerText += s + "\n"
}

function updatePoints(val) {
    pointsCounter += val;
    document.getElementById("points").innerText = pointsCounter;
}

function box1Clicked(e) {
    stopBubbleIfNeeded(e);
    updatePoints(1);

    let infoText = document.getElementById("info");
    showMessage("nacisnąłeś niebieski o wartości 1");
}

function box2Clicked(e) {
    stopBubbleIfNeeded(e);
    if (pointsCounter > 30) {
        return;
    }

    updatePoints(2);

    let infoText = document.getElementById("info");
    showMessage("nacisnąłeś czerwony o wartości 2");
}

function box3Clicked(e) {
    stopBubbleIfNeeded(e);
    if (pointsCounter > 50) {
        return;
    }

    updatePoints(5);

    let infoText = document.getElementById("info");
    showMessage("nacisnąłeś żółty o wartości 5");

}

function stopBubbleIfNeeded(e) {
    if (!propagationOn) {
        if (!e) {
            let e = window.event;
        }
        e.cancelBubble = true;
        if (e.stopPropagation) {
            e.stopPropagation();
        }
    }
}
