//Math module

function add(a, b) {
    return +a + +b;
}

function subtract(a, b) {
    return +a - +b;
}

function multiply(a, b) {
    return a*b;
}

function divide(a, b) {
    return a/b;
}

function operate(operator, a, b) {
    if (operator === 'add') {
        return add(a, b);
    } else if (operator === 'subtract') {
        return subtract(a, b);
    } else if (operator === 'multiply') {
        return multiply(a, b);
    } else if (operator === 'divide') {
        return divide(a, b);
    } else {
        return 'ERROR';
    }
}

//Calculator interactivity module
const numpad = document.querySelectorAll('button');
const display = document.querySelector('.display');

function enterNumber(button) {
    display.textContent += button.textContent;
};

function clear() {
    display.textContent = '';
}

numpad.forEach((button) => {
    if (button.classList.contains('number')) {
        button.addEventListener('click', () => {
            enterNumber(button);
        })
    }

    if (button.id === 'clear') button.addEventListener('click', clear);
});