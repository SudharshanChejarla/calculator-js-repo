class Calculator {
    constructor(prevOperandText,currOperandText) {
        this.currOperandText = currOperandText ;
        this.prevOperandText = prevOperandText ;
        this.clear();
    }

    clear() {
        this.currOperand = '';  
        this.prevOperand = '';
        this.operation = undefined ;
    }

    chooseOperation(operation) {
        if(this.currOperand === '') return ;
        if(this.prevOperand !== '') {
            this.compute();
        } 
        
        this.prevOperand = this.currOperand ;
        this.currOperand = '';
        this.operation = operation ;
    }

    appendNumber(number) {
        if(number==='.' && this.currOperand.includes('.')) return ;
        this.currOperand = this.currOperand.toString() + number.toString();

    }

    updateDisplay() {
        
        this.currOperandText.innerText = this.currOperand ;
        if(this.operation != null) {
            this.prevOperandText.innerText = `${this.prevOperand} ${this.operation}` ;
        } else {
            this.prevOperandText.innerText = this.prevOperand ;
        }
    }

    delete() {
        this.currOperand = (this.currOperand.toString()).slice(0,-1);
    }

    compute() {
        if(this.operation ===undefined) return ;
        let result ;
        const prev = parseFloat(this.prevOperand);
        const curr = parseFloat(this.currOperand);

        if(isNaN(prev) || isNaN(curr)) return ;

        switch(this.operation) {
            case '+':
                result = prev + curr;
                break;
            case '*':
                result = prev * curr;
                break;
            case '-':
                result = prev - curr;
                break;
            case '/':
                result = prev / curr;
                break;
            default:
                return;
        }
        this.currOperand = result ;
        this.operation = undefined ;
        this.prevOperand = '';
    }
}





// Query selectors for buttons and display elements
const numberButtons = document.querySelectorAll('.data-number');
const operationButtons = document.querySelectorAll('.data-operator');
const equalsButton = document.querySelector('#data-equals-to');
const allClearButton = document.querySelector('#data-all-clear');
const deleteButton = document.querySelector('#data-delete');
const prevOperandText = document.querySelector('#prev-operand');
const currOperandText = document.querySelector('#curr-operand');

const calculator = new Calculator(prevOperandText,currOperandText);

numberButtons.forEach( (button)=> {
    button.addEventListener('click',()=> {
        calculator.appendNumber(button.innerText);
        calculator.updateDisplay();
    });
});

operationButtons.forEach( (operation)=> {
    operation.addEventListener('click',()=> {
        calculator.chooseOperation(operation.innerText);
        calculator.updateDisplay();
    });
});

equalsButton.addEventListener('click',()=>{
    calculator.compute();
    calculator.updateDisplay();
});

deleteButton.addEventListener('click',()=>{
    calculator.delete();
    calculator.updateDisplay();
});

allClearButton.addEventListener('click', () => {
    calculator.clear();
    calculator.updateDisplay();
});
