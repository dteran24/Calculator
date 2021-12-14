
const calculator = {
    displayValue: '0',
    firstOperand: null,
    waitingForSecondOperand: false,
    operator: null,
}
const keys = document.querySelector('.calcKeys');

keys.addEventListener('click', keyPress);

function keyPress(event){
    const target = event.target;
    const value = target.value;
    if (!target.matches('button')) {   
        return;
    }
    switch(value){
        case '+':
        case '-':
        case '*':
        case '/':
        case '=':
            handleOperator(value);
            break;
        case '.':
            inputDecimal(value);
            break;
        case 'CLR':
            clear();
            break;
        default:
            if(Number.isInteger(parseFloat(value))){
                digitDisplay(value);
            }
    }
    updateDisplay();
}


function updateDisplay(){
    const display = document.querySelector(".calcInput");
    display.value = calculator.displayValue; 
}
function digitDisplay(digit){
    const { displayValue, waitingForSecondOperand } = calculator;
    if (waitingForSecondOperand === true) {
        calculator.displayValue = digit;
        calculator.waitingForSecondOperand = false;
    } else {
        calculator.displayValue = displayValue === '0' ? digit : displayValue + digit;
    }
    console.log(calculator);

}
function inputDecimal(dot){
    if (calculator.waitingForSecondOperand === true) {
        calculator.displayValue = '0.'
        calculator.waitingForSecondOperand = false;
        return
    }
    
    if(!calculator.displayValue.includes(dot)){
        calculator.displayValue += dot;
    }
}
function clear(){
    calculator.displayValue = '0';
    calculator.firstOperand = null;
    calculator.waitingForSecondOperand = false;
    calculator.operator = null;
    console.log(calculator);
}
function handleOperator(nextOperator) {
    const { firstOperand, displayValue, operator } = calculator;
    // `parseFloat` converts the string contents of `displayValue`
    // to a floating-point number
    const inputValue = parseFloat(displayValue);
    // verify that `firstOperand` is null and that the `inputValue`
    // is not a `NaN` value
    if (operator && calculator.waitingForSecondOperand)  {
        calculator.operator = nextOperator;
        console.log(calculator);
        return;
    }
    if (firstOperand === null && !isNaN(inputValue)) {
      // Update the firstOperand property
    calculator.firstOperand = inputValue;
    } else if (operator){
        const result = calculate(firstOperand, inputValue, operator);
        calculator.displayValue = parseFloat(result.toFixed(7));
        calculator.firstOperand = result;
    }

    calculator.waitingForSecondOperand = true;
    calculator.operator = nextOperator;
    console.log(calculator);
    updateDisplay();
}
function calculate(firstOperand,secondOperand, operator){
    if(operator ==='+'){
        return firstOperand + secondOperand;
    } else if(operator ==='-') {
        return firstOperand - secondOperand;
    } else if(operator ==='*'){
        return firstOperand * secondOperand;
    } else if( operator ==="/"){
        return firstOperand / secondOperand;
    }
    return secondOperand;
}
updateDisplay();