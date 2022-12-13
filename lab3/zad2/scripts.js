let landscape = document.getElementById('landscape');

landscape.addEventListener('click', function(e) {switchImg(e, landscape)});
console.log(landscape.getAttribute('src'));

function switchImg(e, elem) {
    switch (elem.getAttribute('src')) {
        case "./img/mountains.jpg" :
            elem.setAttribute('src', './img/sea.jpg');
            elem.style.setProperty('border-color', 'blue');
            break;
        case "./img/sea.jpg" :
            elem.setAttribute('src', './img/forest.jpg');
            elem.style.setProperty('border-color', 'green');
            break;
        case "./img/forest.jpg" :
            elem.setAttribute('src', './img/mountains.jpg');
            elem.style.setProperty('border-color', 'red');
            break;
    }
}