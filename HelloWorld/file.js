const fs = require("fs");
//write file or create file
fs.writeFileSync("./test.txt","Hey!! I am Sibangi");
const os = require("os");
console.log(os.cpus().length); //8 is the number of cpus so my thread pool can be of size 8 for blocking operations