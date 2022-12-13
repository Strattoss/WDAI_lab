getAnswers();

async function getData() {
    const res = await fetch("http://localhost:3000/cities");
    const json = await res.json()
    return json;
    
}

async function getAnswers() {
    const json = await getData();
    //console.log(json);
    getA(json);
    getB(json);
    getC(json);
    getD(json);
    getE(json);
    getF(json);
    getG(json);
}

// contains exactly two lower case letters 'a' (not 'A')
function containsDoubleA (str) {
    let firstA = str.indexOf('a');
    if (firstA == -1) {
        return false;
    }

    let secondA = str.indexOf('a', firstA + 1);
    if (secondA == -1){
        return false;
    }

    let lastA = str.lastIndexOf('a');

    return secondA == lastA;
}

async function getA(json) {
    const correct = json.filter(ob => ob.province == "małopolskie");

    let counter = 0;
    let cities = "";
    for (let ob of correct) {
        cities += ob.name + ", ";
        counter += 1;
    }

    document.getElementById('a-answer').textContent = cities.substring(0, cities.length - 2);
}

async function getB(json) {
    let correct = json.filter(ob => containsDoubleA(ob.name));

    let cities = "";
    for (let ob of correct) {
        cities += ob.name + ", ";
    }

    document.getElementById('b-answer').textContent = cities.substring(0, cities.length - 2);
}

async function getC(json) {
    
    // deep copy
    let json_copy = JSON.parse(JSON.stringify(json));
    
    json_copy = json_copy.sort((a, b) => {
        if (a.dentensity == b.dentensity) {
            return 0;
        }
        return b.dentensity - a.dentensity;
    })

    console.log(json_copy);

    document.getElementById('c-answer').textContent = json_copy[4].name;
    document.getElementById('c-answer2').textContent = json_copy[4].dentensity;
}

async function getD(json) {
    const correct = json.filter(ob => ob.people > 100000);
    
    cities = ""
    for (let city of correct) {
        cities += city.name + " city" + ", ";
    }

    document.getElementById('d-answer').textContent = cities.substring(0, cities.length - 2);
}

async function getE(json) {
    let limit = 80000;

    let lessThanLimit = json.filter(ob => ob.people > limit);
    let moreThanLimit = json.filter(ob => ob.people < limit);

    document.getElementById('e-answer').textContent = moreThanLimit.length;
    document.getElementById('e-answer2').textContent = lessThanLimit.length;
    document.getElementById('e-answer3').textContent =
        (lessThanLimit.length > moreThanLimit.length) ?
        "Więcej jest miast poniżej "+limit+" mieszkańców" :
        "Więcej jest miast powyżej "+limit+" mieszkańców";
}

async function getF(json) {
    
    let area = 0;
    let counter = 0;

    for (let ob of json) {
        
        if (ob.township[0] == 'P') {
            area += ob.area;
            counter += 1;
            console.log(ob);
        }
    }

    document.getElementById('f-answer').textContent = area/counter;
}

async function getG(json) {
    let correct = json.filter(ob => ob.province == "pomorskie" && ob.people > 5000);

    let cities = "";

    for (let ob of correct) {
        cities += ob.name + ", ";
    }

    document.getElementById('g-answer').textContent = cities.substring(0, cities.length - 2);
}

