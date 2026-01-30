# SimpleCalculator

## Description
SimpleCalculator is a lightweight, browser‑based calculator built with plain **HTML**, **CSS**, and **JavaScript**. It provides a clean, responsive UI for basic arithmetic operations without any build steps or external dependencies.

## Tech Stack
- **HTML5** – Structure of the calculator UI.
- **CSS3** – Styling and layout (grid based for responsive button arrangement).
- **JavaScript (ES6)** – Core logic handling button clicks, expression evaluation, and error handling.

## Features
- **Basic arithmetic** – addition, subtraction, multiplication, division.
- **Clear (C)** – resets the display to `0`.
- **Backspace (⌫)** – removes the last entered character.
- **Decimal support** – allows floating‑point calculations.
- **Keyboard friendly** – all operations are driven by button clicks (can be extended to keyboard shortcuts).
- **Error handling** – displays `Error` for invalid expressions (e.g., division by zero) and recovers gracefully.

## Installation / Setup
1. **Clone the repository**
   ```bash
   git clone https://github.com/yourusername/SimpleCalculator.git
   cd SimpleCalculator
   ```
2. **Open the application**
   - No build tools or package managers are required.
   - Simply open `index.html` in any modern web browser (Chrome, Firefox, Edge, Safari).
   ```bash
   # On macOS/Linux you can use:
   open index.html
   # On Windows:
   start index.html
   ```
   The calculator UI will load and be ready for use.

## Usage
- **Display** – Shows the current input or result. Starts at `0`.
- **Buttons**
  - **Digits (0‑9)** – Append the digit to the current number.
  - **Decimal (.)** – Adds a decimal point; prevents multiple decimals in a single number.
  - **Operators (+, -, *, /)** – Append the operator; replaces the previous operator if pressed consecutively.
  - **Equals (=)** – Evaluates the expression using JavaScript's `eval` under a safe wrapper and displays the result.
  - **Clear (C)** – Resets the calculator to its initial state.
  - **Backspace (⌫)** – Deletes the last character; if the display becomes empty, it resets to `0`.
- **Error handling** – If the expression cannot be evaluated (e.g., syntax error, division by zero), the display shows `Error`. Press **C** or **⌫** to recover.

## Development Notes
### File Structure
```
SimpleCalculator/
├─ index.html      # Main HTML markup – UI layout and button definitions.
├─ style.css       # Styling – grid layout, button appearance, responsive design.
├─ script.js       # Core JavaScript – event handling, calculation logic.
└─ README.md       # Project documentation (this file).
```
### Editing the Project
- **HTML (`index.html`)** – Modify the markup to add/remove buttons or change the layout. Ensure each button retains the `data-action` and `data-value` attributes used by the script.
- **CSS (`style.css`)** – Adjust colors, fonts, spacing, or make the calculator responsive to different screen sizes.
- **JavaScript (`script.js`)** – The main logic resides here:
  - `handleButtonClick(event)` processes button actions based on the `data-action` attribute.
  - `evaluateExpression(expr)` safely evaluates the arithmetic expression.
  - Helper functions such as `appendDigit`, `appendOperator`, `clearDisplay`, and `backspace` manage state.
  - Feel free to extend functionality (e.g., keyboard support, scientific operations) by adding new actions and handling them in the same switch‑case pattern.

## License
This project is licensed under the MIT License – see the `LICENSE` file for details.
