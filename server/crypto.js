const CryptoJS = require('crypto-js');

const encrypt = CryptoJS.AES.encrypt('raj rabari','dhainik').toString();

console.log(encrypt);

const decrypt = CryptoJS.AES.decrypt(encrypt,'dhainik');
const plaintext = decrypt.toString(CryptoJS.enc.Utf8);
console.log(plaintext);