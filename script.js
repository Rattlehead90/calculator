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

function enterNumber(key) {
    if (display.textContent == buffer && operator) {
        display.textContent = '';
    }
    display.textContent += key;
};

function overflow() {
    if (display.textContent.length > 11) {
        if (+display.textContent % 1 !== 0) {
            display.textContent = (+display.textContent).toFixed(11);
        } else {
            display.textContent = (+display.textContent).toExponential(6);
        }
    }
}

function clear() {
    display.textContent = '';
    operator = null;
    buffer = null;
}

function operateOnBuffer(key) { 
    if (operator) {
        display.textContent = operate(operator, buffer, Number(display.textContent));
        overflow();
        }
    operator = key;
    buffer = +display.textContent;  

}

function equals() {
    display.textContent = operate(operator, buffer, Number(display.textContent));
    operator = null;
    overflow();
}

//Numpad functionality
numpad.forEach((button) => {
    if (button.classList.contains('number')) {
        button.addEventListener('click', () => {
            enterNumber(button.textContent);
        })
    }

    if (button.id === 'clear') button.addEventListener('click', clear);

    if (button.classList.contains('operator')) {
        button.addEventListener('click', () => {
            operateOnBuffer(button.id);
        });
    }

    if (button.id === 'equals') button.addEventListener('click', equals);
});

//Keyboard support 

function keyboardInput(e) {
    if (isFinite(e.key)) {
        enterNumber(e.key);
    }
    
    if (e.key === 'Enter') {
        equals();
    }
    //Operators from keyboard
    if (e.key === '+') {
        operateOnBuffer('add');
    }

    if (e.key === '-') {
        operateOnBuffer('subtract');
    } 
    
    if (e.key === '/') {
        operateOnBuffer('divide');
    }

    if (e.key === '*') {
        operateOnBuffer('multiply');
    }

    if (e.key === 'Backspace' || e.key === 'Delete') {
        clear();
    }
}

window.addEventListener('keydown', keyboardInput);