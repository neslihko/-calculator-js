/**
 * @jest-environment jsdom
 */

// DOM-Setup
document.body.innerHTML = `
  <input type="text" id="display" value="0">
`;

const Calculator = require('./calculator.js');

describe('Taschenrechner Tests', () => {
    beforeEach(() => {
        Calculator.init();
    });

    test('Addition: 7 + 7 + 4 = 18', () => {
        Calculator.addNumber('7');
        Calculator.addNumber('+');
        Calculator.addNumber('7');
        Calculator.addNumber('+');
        Calculator.addNumber('4');
        Calculator.calculate();
        expect(Calculator.getDisplay()).toBe('18');
    });

    test('Division nach Addition: 18 / 2 = 9', () => {
        Calculator.addNumber('7');
        Calculator.addNumber('+');
        Calculator.addNumber('7');
        Calculator.addNumber('+');
        Calculator.addNumber('4');
        Calculator.calculate();
        Calculator.addNumber('/');
        Calculator.addNumber('2');
        Calculator.calculate();
        expect(Calculator.getDisplay()).toBe('9');
    });

    test('Multiplikation mit Dezimalzahl: 1,1 * 4 = 4,4', () => {
        Calculator.addNumber('1');
        Calculator.addNumber(',');
        Calculator.addNumber('1');
        Calculator.addNumber('*');
        Calculator.addNumber('4');
        Calculator.calculate();
        expect(Calculator.getDisplay()).toBe('4,4');
    });

    test('Division durch Null zeigt Fehlermeldung', () => {
        Calculator.addNumber('5');
        Calculator.addNumber('/');
        Calculator.addNumber('0');
        Calculator.calculate();
        expect(Calculator.getDisplay()).toBe('Division durch Null nicht möglich');
    });

    test('Mehrfache Kommas werden verhindert', () => {
        Calculator.addNumber('1');
        Calculator.addNumber(',');
        Calculator.addNumber('1');
        Calculator.addNumber(',');
        expect(Calculator.getDisplay()).toBe('1,1');
    });

    test('Backspace entfernt letzte Ziffer', () => {
        Calculator.addNumber('1');
        Calculator.addNumber('2');
        Calculator.addNumber('3');
        Calculator.backspace();
        expect(Calculator.getDisplay()).toBe('12');
    });

    test('Backspace bei einzelner Ziffer gibt 0', () => {
        Calculator.addNumber('5');
        Calculator.backspace();
        expect(Calculator.getDisplay()).toBe('0');
    });

    test('Clear setzt alles zurück', () => {
        Calculator.addNumber('1');
        Calculator.addNumber('2');
        Calculator.addNumber('+');
        Calculator.addNumber('3');
        Calculator.clearAll();
        expect(Calculator.getDisplay()).toBe('0');
        expect(Calculator.lastNumber).toBe('');
        expect(Calculator.operator).toBe('');
    });

    test('455/0 gibt Fehlermeldung', () => {
        Calculator.addNumber('4');
        Calculator.addNumber('5');
        Calculator.addNumber('5');
        Calculator.addNumber('/');
        Calculator.addNumber('0');
        Calculator.calculate();
        expect(Calculator.getDisplay()).toBe('Division durch Null nicht möglich');
    });

    test('Nach Fehlermeldung kann weitergerechnet werden', () => {
        // Erst Division durch Null
        Calculator.addNumber('5');
        Calculator.addNumber('/');
        Calculator.addNumber('0');
        Calculator.calculate();
        
        // Dann neue Berechnung
        Calculator.addNumber('2');
        Calculator.addNumber('+');
        Calculator.addNumber('3');
        Calculator.calculate();
        expect(Calculator.getDisplay()).toBe('5');
    });
});