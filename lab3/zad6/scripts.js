let addButton = document.getElementById('add');
let firstLastNameInput = document.getElementById('first-last-name');
let phoneNumberInput = document.getElementById('phone-number');

let entries = document.getElementById('entries');

addButton.addEventListener('click', addEntry);

function addEntry() {
    if (!firstLastNameInput.checkValidity()) {
        alert("Imię i nazwisko nie są podane w prawidłowym formacie!");
        return;
    }

    if (!phoneNumberInput.checkValidity()) {
        alert("Numer telefonu nie jest podany w prawidłowym formacie!");
        return;
    }

    let section = document.createElement("section");
    section.classList.add('entry')

    let leftSection = document.createElement('div');

    let leftSectionFirstLastName = document.createElement('h3');
    leftSectionFirstLastName.textContent=firstLastNameInput.value;
    let leftSectionPhoneNumber = document.createElement('p');
    leftSectionPhoneNumber.textContent=phoneNumberInput.value;
    
    leftSection.appendChild(leftSectionFirstLastName);
    leftSection.appendChild(leftSectionPhoneNumber);

    section.appendChild(leftSection);

    let rightSection = document.createElement('div');
    rightSection.textContent="🗑️"

    rightSection.addEventListener('click', deleteEntry);
    section.appendChild(rightSection);

    document.getElementById("entries").appendChild(section);
}

function deleteEntry() {
    let upperParent = document.getElementById("entries");
    upperParent.removeChild(this.parentNode);
}

