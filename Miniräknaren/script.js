// Hämta knappar och element
const digits = document.querySelectorAll('.digit');
const operators = document.querySelectorAll('.op');
const resultDisplay = document.getElementById('result');
const inputDisplay = document.getElementById('input');
const historyList = document.querySelector('.history');

// Variabler för att hålla tillstånd
let currentInput = '';
let currentOperator = '';
let previousResult = 0;
let history = [];

// Funktion för att uppdatera displayen
function updateDisplay() {
    resultDisplay.textContent = previousResult;
    inputDisplay.textContent = currentInput;
}

// Funktion för att uppdatera historiken
function updateHistory() {
    historyList.innerHTML = '';
    history.forEach(entry => {
        const li = document.createElement('li');
        li.innerHTML = `<code>${entry}</code>`;
        historyList.appendChild(li);
    });
}

// Händelsehanterare för sifferknappar
digits.forEach(button => {
    button.addEventListener('click', () => {
        currentInput += button.textContent.trim();
        updateDisplay();
    });
});

// Händelsehanterare för operatorknappar
operators.forEach(button => {
    button.addEventListener('click', () => {
        const operator = button.textContent.trim();

        if (operator === 'Clear') {
            currentInput = '';
            currentOperator = '';
            previousResult = 0;
            history = [];
            updateHistory();
        } else if (operator === '=') {
            if (currentInput && currentOperator) {
                let currentNumber = parseFloat(currentInput);
                let expression = `${previousResult} ${currentOperator} ${currentNumber}`;
                switch (currentOperator) {
                    case '+':
                        previousResult += currentNumber;
                        break;
                    case '-':
                        previousResult -= currentNumber;
                        break;
                    case '*':
                        previousResult *= currentNumber;
                        break;
                    case '/':
                        if (currentNumber !== 0) {
                            previousResult /= currentNumber;
                        } else {
                            alert("Cannot divide by zero!");
                        }
                        break;
                }
                history.push(`${expression} = ${previousResult}`);
                currentInput = '';
                currentOperator = '';
                updateHistory();
            }
        } else {
            if (currentInput) {
                if (previousResult === 0 && !currentOperator) {
                    previousResult = parseFloat(currentInput);
                } else {
                    let currentNumber = parseFloat(currentInput);
                    let expression = `${previousResult} ${currentOperator} ${currentNumber}`;
                    switch (currentOperator) {
                        case '+':
                            previousResult += currentNumber;
                            break;
                        case '-':
                            previousResult -= currentNumber;
                            break;
                        case '*':
                            previousResult *= currentNumber;
                            break;
                        case '/':
                            if (currentNumber !== 0) {
                                previousResult /= currentNumber;
                            } else {
                                alert("Cannot divide by zero!");
                            }
                            break;
                    }
                    history.push(`${expression} = ${previousResult}`);
                }
                currentInput = '';
                currentOperator = operator;
                updateHistory();
            } else {
                currentOperator = operator;
            }
        }
        updateDisplay();
    });
});

// Initiera displayen
updateDisplay();