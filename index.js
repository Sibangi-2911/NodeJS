//any one of the method can be implemented
const {add} = require("./modules.js");
const operation = require("./modules.js");

function printMessage(message){
  console.log(message);
}
printMessage("Hello Sibangi!!! Start learning Nodejs...");

console.log(add(5,5));
console.log(operation.multiply(5,5));