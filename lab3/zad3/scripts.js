let addButton = document.getElementById('add');
let removeButton = document.getElementById('remove');
let list = document.getElementById('list');

let newElement = document.createElement('li');
newElement.innerHTML = "g";


addButton.addEventListener('click', function (e) { addElement(e, list) });
removeButton.addEventListener('click', function (e) { removeElement(e, list) });

function addElement(e, list) {
    let newElement = document.createElement('li');
    newElement.innerHTML = Math.floor(Math.random()*100);
    list.appendChild(newElement);
}

function removeElement(e, list) {
    let child_to_remove = list.querySelector('li');
    if (child_to_remove) { list.removeChild(list.querySelector('li')); }
}
