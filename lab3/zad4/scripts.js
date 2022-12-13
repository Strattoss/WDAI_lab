let incrementButton = document.getElementById('increment-button');
let incrementButtonActive = true;
let switchButton = document.getElementById('switch-button');
let counter = document.getElementById('counter');

incrementButton.addEventListener('click', incrementCounter);
switchButton.addEventListener('click', switchIncrementButton);

function incrementCounter() {
    if (incrementButtonActive) { counter.innerHTML = parseInt(counter.innerHTML) + 1;}
}

function switchIncrementButton() {
    if (incrementButtonActive) {
        counter.innerHTML = 0;
        
    }
    incrementButtonActive = !incrementButtonActive;
}
