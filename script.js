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
//FUCK IT DOESN'T LET YOU START THE SECOND NUMBER WITH THE SAME DIGIT
function enterNumber(button) {
    if (display.textContent == buffer) {
        display.textContent = '';
    }
    display.textContent += button.textContent;
};

function round() {
    display.textContent = (+display.textContent).toFixed(11);
}

function clear() {
    display.textContent = '';
    operator = null;
    buffer = null;
}

function operateOnBuffer(key) { //there's a problem when you try to enter new number after equals
    if (operator) {
        display.textContent = operate(operator, buffer, Number(display.textContent));
        if (display.textContent.length > 11) {
            round();
        }
        }
    operator = key;
    buffer = +display.textContent;

}

function equals() {
    display.textContent = operate(operator, buffer, Number(display.textContent));
    operator = null;
    if (display.textContent.length > 11) {
        round();
    }
}

//Numpad functionality
numpad.forEach((button) => {
    if (button.classList.contains('number')) {
        button.addEventListener('click', () => {
            enterNumber(button);
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
        if (display.textContent == buffer) {
            display.textContent = '';
        }
        display.textContent += e.key;
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