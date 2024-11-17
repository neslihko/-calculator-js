// Calculator Funktionen
const Calculator = {
    display: null,
    lastNumber: '',
    operator: '',
    currentNumber: '0',
    newNumber: true,
    error: false,

    init() {
        this.display = document.getElementById('display');
        this.clearAll();
    },

    addNumber(num) {
        // Wenn ein Fehler vorliegt, erst zurücksetzen
        if (this.error) {
            this.clearAll();
        }

        // Ersetze Punkt durch Komma für die Anzeige
        if (num === '.') {
            num = ',';
        }

        // Wenn Komma gedrückt wird und bereits ein Komma existiert
        if (num === ',' && this.currentNumber.includes(',')) {
            return;
        }

        // Wenn ein Operator gedrückt wird
        if (['+', '-', '*', '/'].includes(num)) {
            this.calculate();  // Berechne vorherige Operation
            this.operator = num;
            this.lastNumber = this.currentNumber;
            this.newNumber = true;
            return;
        }

        // Füge Zahl hinzu
        if (this.newNumber) {
            this.currentNumber = num;
            this.newNumber = false;
        } else {
            this.currentNumber += num;
        }
        this.display.value = this.currentNumber;
    },

    calculate() {
        if (!this.operator || this.newNumber) return;

        try {
            // Konvertiere Komma zu Punkt für Berechnungen
            let num1 = parseFloat(this.lastNumber.replace(',', '.'));
            let num2 = parseFloat(this.currentNumber.replace(',', '.'));
            let result = 0;

            switch (this.operator) {
                case '+': result = num1 + num2; break;
                case '-': result = num1 - num2; break;
                case '*': result = num1 * num2; break;
                case '/': 
                    if (num2 === 0) {
                        this.handleError('Division durch Null nicht möglich');
                        return;
                    }
                    result = num1 / num2; 
                    break;
            }

            // Runde das Ergebnis und konvertiere Punkt zu Komma für die Anzeige
            result = Math.round(result * 10000) / 10000;
            this.currentNumber = result.toString().replace('.', ',');
            this.display.value = this.currentNumber;
            this.operator = '';
            this.error = false;
        } catch (e) {
            this.handleError('Ungültige Operation');
        }
    },

    handleError(message = 'Fehler') {
        this.display.value = message;
        this.currentNumber = '0';
        this.lastNumber = '';
        this.operator = '';
        this.error = true;
        this.newNumber = true;
    },

    clearDisplay() {
        this.currentNumber = '0';
        this.newNumber = true;
        this.error = false;
        this.display.value = this.currentNumber;
    },

    clearAll() {
        this.lastNumber = '';
        this.operator = '';
        this.error = false;
        this.clearDisplay();
    },

    backspace() {
        if (this.error) {
            this.clearAll();
            return;
        }

        if (this.newNumber || this.currentNumber.length === 1) {
            this.currentNumber = '0';
            this.newNumber = true;
        } else {
            this.currentNumber = this.currentNumber.slice(0, -1);
            if (this.currentNumber === '') {
                this.currentNumber = '0';
                this.newNumber = true;
            }
        }
        this.display.value = this.currentNumber;
    },

    getDisplay() {
        return this.display.value;
    }
};

// Wenn wir im Browser sind, initialisiere den Calculator
if (typeof window !== 'undefined') {
    document.addEventListener('DOMContentLoaded', () => {
        Calculator.init();

        // Tastatur-Support
        document.addEventListener('keydown', (event) => {
            const key = event.key;
            
            if (key >= '0' && key <= '9' || ['+', '-', '*', '/', '.', ','].includes(key)) {
                Calculator.addNumber(key);
            } else if (key === 'Enter') {
                Calculator.calculate();
            } else if (key === 'Escape') {
                Calculator.clearAll();
            } else if (key === 'Backspace') {
                Calculator.backspace();
            }
        });
    });
}

// Export für Tests
if (typeof module !== 'undefined') {
    module.exports = Calculator;
}