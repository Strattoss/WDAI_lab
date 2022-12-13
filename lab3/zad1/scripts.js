const name_button = document.getElementById('name-button');
const name_place = document.getElementById('name-box');

name_button.addEventListener('click', readName);


function readName() {
    console.log("klik");
    name_place.innerText = prompt("Wpisz swoje imię");
}
