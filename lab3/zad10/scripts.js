const ball = document.getElementById('ball');
const warning = document.getElementById('warning');

document.getElementById('clickable-pitch').addEventListener('click', moveBall);
document.addEventListener('click', showWarning);
document.getElementById('ball').addEventListener('click', () => {console.log("ball");});

function moveBall(e) {
    
    //stopBubble(e);
    const offsetX = ball.clientWidth;
    const offsetY = ball.clientWidth;
    
    console.log(e.clientX, e.clientY);
    console.log(e.clientX - offsetX, e.clientY - offsetY);
    if ((e.clientX >= 50 && e.clientX <= 550) && (e.clientY >= 50 && e.clientY <= 350)) {
        hideWarning();
        ball.style.transform = `translate(${e.clientX-offsetX}px, ${e.clientY-offsetY}px)`;
    }
    else {
        showWarning(e);
    }
    stopBubble(e);
}

function showWarning(e) {
    warning.style.display = 'block';
    warning.style.transform = `translate(${e.clientX}px, ${e.clientY-400}px)`;
}

function hideWarning() {
    warning.style.display = 'none';

}

function stopBubble(e) {
    if (!e) {
        let e = window.event;
    }
    e.cancelBubble = true;
    if (e.stopPropagation) {
        e.stopPropagation();
    }
}
