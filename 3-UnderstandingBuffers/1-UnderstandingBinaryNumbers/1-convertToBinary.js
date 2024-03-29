/**
 * 1-Create an empty array 'binary'
 * 2-Assign my param value to x variable
 * 3-while x is greater than 0
 *      1-Calculate the modulus of x divided by 2
 *      2-Push modulus to binary
 *      3-Update x by dividing its value by 2
 * 4-Invert the order of binary elements
 * 5-Return binary
 * 
 *  https://byjus.com/maths/binary-number-system/#how-to-calculate-binary-number
 *  https://app.code2flow.com/
 */

/**
 * 
 * @param {number} decimalNumber decimal number
 * @returns {number} binary number
 */
const convertToBinary = (decimalNumber) => {
    const binary = new Array();
    let decimal = decimalNumber;

    while (decimal > 0) {
        const modulus = decimal % 2;
        binary.unshift(modulus);
        decimal = Math.floor(decimal/2);
    }
    return binary.join('');
}

const number = 78;
const binary = convertToBinary(number);

console.log(binary);


