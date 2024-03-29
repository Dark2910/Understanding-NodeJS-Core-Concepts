/**
 * 
 * @param {number} binaryNumber binary number
 * @returns {number} decimal number
 */
const convertToDecimal = (binaryNumber) => {
    let binary = binaryNumber;
    let binaryDigit = 0;
    let decimalNumber = 0;
    let exponent = 0;
    const numbers = new Array();

    while (binary > 0) {
        binaryDigit = binary % 10;
        decimalNumber = binaryDigit * Math.pow(2, exponent);
        numbers.unshift(decimalNumber);
        exponent++;
        binary = Math.floor(binary/10);
    }
    return numbers.reduce((a, b) => a + b);
}

const number = 1001110;
const decimal = convertToDecimal(number);

console.log(decimal);