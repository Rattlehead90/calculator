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
let operator;
let buffer;

function enterNumber(button) {
    display.textContent += button.textContent;
};

function clear() {
    display.textContent = '';
    operator = '';
    buffer = 0;
}

numpad.forEach((button) => {
    if (button.classList.contains('number')) {
        button.addEventListener('click', () => {
            enterNumber(button);
        })
    }

    if (button.id === 'clear') button.addEventListener('click', clear);

    if (button.classList.contains('operator')) {
        button.addEventListener('click', () => {
            operator = button.id;
            buffer = +display.textContent;
            display.textContent = '';
        });
    }

    if (button.id === 'equals') button.addEventListener('click', () => {
        display.textContent = operate(operator, buffer, Number(display.textContent));
    });
});