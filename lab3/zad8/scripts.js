// visibility button for new password input
const newPasswordVisibilityButton = document.getElementById('text-visibility-new-password');
const newPasswordInput = document.getElementById('new-password');
newPasswordVisibilityButton.addEventListener('click', e => { changeInputVisibility(e, newPasswordInput) });

// visibility button for repeated password input
const repeatedPasswordVisibilityButton = document.getElementById('text-visibility-repeated-password');
const repeatedPasswordInput = document.getElementById('repeated-password');
repeatedPasswordVisibilityButton.addEventListener('click', e => { changeInputVisibility(e, repeatedPasswordInput) });

newPasswordInput.addEventListener('keyup', checkValidity);
repeatedPasswordInput.addEventListener('keyup', checkIfNewAndRepeatedPasswordMatch);

const requirement1 = document.getElementById('requirement1');
const requirement2 = document.getElementById('requirement2');
const requirement3 = document.getElementById('requirement3');
const requirement4 = document.getElementById('requirement4');

function changeInputVisibility(e, input) {
    e.srcElement.setAttribute('src', (e.srcElement.getAttribute('src')=="img/closed_eye.jpg") ? "img/opened_eye.jpg":"img/closed_eye.jpg");
    const changeTo = (input.getAttribute('type') == 'text') ? 'password' : 'text';
    input.setAttribute('type', changeTo);
}

function updateAccordingToValidity(bool, requirement) {
    if (bool) {
        requirement.classList.remove("invalid");
        requirement.classList.add("valid");
        requirement.textContent = '✓';
    }
    else {
        requirement.classList.remove("valid");
        requirement.classList.add("invalid");
        requirement.textContent = '⛌';
    }

}

function checkIfNewAndRepeatedPasswordMatch() {
    if (repeatedPasswordInput.value == newPasswordInput.value) {
        repeatedPasswordInput.style.borderColor = "rgb(0, 165, 140)";
        document.getElementById('repeated-password-warning').style.display = "none";
        
    } else {
        repeatedPasswordInput.style.borderColor = "rgb(220, 10, 10)";
        document.getElementById('repeated-password-warning').style.display = "unset";
    }
    
}

function checkValidity() {
    inputValue = newPasswordInput.value;
    // if whole pssword is at least 8 characters long
    updateAccordingToValidity(inputValue.length >= 8, requirement1);

    // if there is at least one special character
    const regexp2 = /[^A-Za-z0-9]/g;
    updateAccordingToValidity(inputValue.match(regexp2), requirement2);

    // if there is at least one capital letter
    const regexp3 = /[A-Z]/g;
    updateAccordingToValidity(inputValue.match(regexp3), requirement3);

    // if there is at least one digit
    const regexp4 = /[0-9]/g;
    updateAccordingToValidity(inputValue.match(regexp4), requirement4);

    // if every condition is fulfilled
    if (inputValue.length >= 8 &&
        inputValue.match(regexp2) &&
        inputValue.match(regexp3) &&
        inputValue.match(regexp4)) {
            document.getElementById('new-password').style.borderColor = "rgb(0, 165, 140)";
            document.getElementById('new-password-warning').style.display = "none";
    }
    else {
        document.getElementById('new-password').style.borderColor = "rgb(220, 10, 10)";
        document.getElementById('new-password-warning').style.display = "unset";
    }
}