// Simple Calculator Logic
// No imports needed; plain JavaScript for the browser.

// ------------------------------------------------------------
// Element references
// ------------------------------------------------------------
const display = document.getElementById('display');
const buttons = document.querySelectorAll('.btn');

// ------------------------------------------------------------
// State variables
// ------------------------------------------------------------
let currentInput = '';
let previousValue = null; // Number stored from previous operand
let operator = null;      // '+', '-', '*', '/'
let shouldResetDisplay = false; // When true, next digit clears the display

// ------------------------------------------------------------
// Initialization
// ------------------------------------------------------------
function initCalculator() {
    // Attach click listeners to every button
    buttons.forEach(btn => {
        btn.addEventListener('click', handleButtonClick);
    });

    // Optional keyboard support
    document.addEventListener('keydown', handleKeyDown);
}

// ------------------------------------------------------------
// Event Handlers
// ------------------------------------------------------------
function handleButtonClick(event) {
    const action = event.currentTarget.dataset.action;
    const value = event.currentTarget.dataset.value;

    switch (action) {
        case 'digit':
            appendDigit(value);
            break;
        case 'decimal':
            appendDigit('.');
            break;
        case 'operator':
            setOperator(value);
            break;
        case 'equals':
            calculateResult();
            break;
        case 'clear':
            clearDisplay();
            break;
        case 'backspace':
            backspace();
            break;
        default:
            // Unknown action – ignore
            break;
    }
}

function handleKeyDown(event) {
    // Allow only relevant keys
    const key = event.key;
    if (key >= '0' && key <= '9') {
        appendDigit(key);
        event.preventDefault();
    } else if (key === '.' || key === ',') { // comma as decimal in some locales
        appendDigit('.');
        event.preventDefault();
    } else if (key === '+' || key === '-' || key === '*' || key === '/' ) {
        setOperator(key);
        event.preventDefault();
    } else if (key === 'Enter' || key === '=') {
        calculateResult();
        event.preventDefault();
    } else if (key === 'Backspace') {
        backspace();
        event.preventDefault();
    } else if (key === 'Escape' || key.toLowerCase() === 'c') {
        clearDisplay();
        event.preventDefault();
    }
}

// ------------------------------------------------------------
// Core calculator functions
// ------------------------------------------------------------
function appendDigit(digit) {
    // Prevent multiple decimals
    if (digit === '.' && currentInput.includes('.')) return;

    if (shouldResetDisplay) {
        currentInput = '';
        shouldResetDisplay = false;
    }
    // Avoid leading zeros (except for decimal numbers like 0.5)
    if (digit !== '.' && currentInput === '0') {
        currentInput = digit;
    } else {
        currentInput += digit;
    }
    updateDisplay();
}

function setOperator(op) {
    // If there is no current input, treat previousValue as the left operand
    if (currentInput === '' && previousValue !== null) {
        operator = op;
        return;
    }

    if (previousValue === null) {
        previousValue = parseFloat(currentInput);
    } else if (operator) {
        // Compute pending operation before setting new operator
        const result = compute(previousValue, parseFloat(currentInput), operator);
        if (result === undefined) return; // error already handled
        previousValue = result;
        currentInput = String(result);
        updateDisplay();
    }
    operator = op;
    shouldResetDisplay = true;
}

function calculateResult() {
    if (operator === null || previousValue === null) {
        // Nothing to calculate
        return;
    }
    const currentVal = currentInput === '' ? previousValue : parseFloat(currentInput);
    const result = compute(previousValue, currentVal, operator);
    if (result === undefined) return; // error already displayed
    // Show result and reset state for next calculation
    currentInput = String(result);
    updateDisplay();
    previousValue = null;
    operator = null;
    shouldResetDisplay = true;
}

function compute(a, b, op) {
    let res;
    switch (op) {
        case '+':
            res = a + b;
            break;
        case '-':
            res = a - b;
            break;
        case '*':
            res = a * b;
            break;
        case '/':
            if (b === 0) {
                displayError('Cannot divide by zero');
                return undefined;
            }
            res = a / b;
            break;
        default:
            return undefined;
    }
    // Round to avoid floating‑point artefacts (e.g., 0.1 + 0.2 = 0.3000000004)
    return Math.round(res * 1e12) / 1e12;
}

function clearDisplay() {
    currentInput = '';
    previousValue = null;
    operator = null;
    shouldResetDisplay = false;
    updateDisplay();
}

function backspace() {
    if (shouldResetDisplay) {
        // If display is about to be reset, just clear it
        clearDisplay();
        return;
    }
    currentInput = currentInput.slice(0, -1);
    updateDisplay();
}

function updateDisplay() {
    display.textContent = currentInput || '0';
}

function displayError(message) {
    display.textContent = message;
    shouldResetDisplay = true;
    // Reset calculator state after an error so the user can start fresh
    currentInput = '';
    previousValue = null;
    operator = null;
}

// ------------------------------------------------------------
// Start the calculator once the DOM is ready
// ------------------------------------------------------------
if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', initCalculator);
} else {
    initCalculator();
}
