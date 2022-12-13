async function getJson() {
    const res = await fetch("https://restcountries.com/v3.1/all");
    return await res.json();
}

window.onload = async () => {
    objJson = await getJson();
    

    changePage(1);
};

let objJson;
let currentPage = 1;
let recordsPerPage = 20;
const listingTable = document.getElementById("listing-table");
const listingTableBody = listingTable.querySelector("tbody");
const page_span = document.getElementById("page");

const wantedData = ["capital", "population", "area"];

let btnNext = document.getElementById("btn-next");
let btnPrev = document.getElementById("btn-prev");
btnNext.addEventListener('click', nextPage);
btnPrev.addEventListener('click', prevPage);


function prevPage() {
    if (currentPage > 1) {
        currentPage--;
        changePage(currentPage);
    }
}

function nextPage() {
    if (currentPage < numPages()) {
        currentPage++;
        changePage(currentPage);
    }
}

function changePage(page) {
    // validate page
    if (page < 1) page = 1;
    if (page > numPages()) {
        page = numPages();
    }

    // reset table
    resetTable();


    let sortedJson = sortJsonByName(objJson, true);
    //console.log(sortedJson);
    

    for (var i = (page - 1) * recordsPerPage; i < (page * recordsPerPage); i++) {
        let newRow = document.createElement('tr');
        let newTabData;

        // add a number
        newTabData = document.createElement('td');
        newTabData.textContent = i + 1;
        newRow.appendChild(newTabData);

        // add a name
        newTabData = document.createElement('td');
        newTabData.textContent = sortedJson[i].name.common;
        newRow.appendChild(newTabData);

        // add wanted data
        for (let requiredData of wantedData) {
            newTabData = document.createElement('td');
            newTabData.textContent = (sortedJson[i].hasOwnProperty(requiredData)) ? sortedJson[i][requiredData] : "";
            newRow.appendChild(newTabData);
        }

        listingTableBody.appendChild(newRow);

    }
    page_span.innerHTML = page;

    if (page == 1) {
        btnPrev.style.visibility = "hidden";
    } else {
        btnPrev.style.visibility = "visible";
    }

    if (page == numPages()) {
        btnNext.style.visibility = "hidden";
    } else {
        btnNext.style.visibility = "visible";
    }
}

function numPages() {
    return Math.ceil(objJson.length / recordsPerPage);
}

function sortJsonByName(json, ascending) {
    return json.sort(function(a, b) {
        if (ascending) {
            return (a.name.common > b.name.common) ? 1 : ((a.name.common < b.name.common) ? -1 : 0);
        } else {
            return (b.name.common > a.name.common) ? 1 : ((b.name.common < a.name.common) ? -1 : 0);
        }
    });
}

function resetTable() {
    listingTableBody.innerHTML = "";

    let newRow = document.createElement('tr');
    let newTabData;

    // add a number
    newTabData = document.createElement('th');
    newTabData.textContent = "Number";
    newRow.appendChild(newTabData);

    // add a name
    newTabData = document.createElement('th');
    newTabData.textContent = "Name";
    newRow.appendChild(newTabData);

    // add wanted data
    for (let requiredData of wantedData) {
        newTabData = document.createElement('th');
        newTabData.textContent = requiredData.charAt(0).toUpperCase() + requiredData.slice(1);
        newRow.appendChild(newTabData);
    }

    listingTableBody.appendChild(newRow);


}
