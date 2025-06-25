const {format, addDays, subDays} = require("date-fns")

const now = new Date();
console.log("Today date is: ", format(now, "yyyy-MM-dd"));

const nextWeek = addDays(now,7);
console.log("Next week date is: ", format(nextWeek, "yyyy-MM-dd"));

const previousWeek = subDays(now,7);
console.log("Previous week date was: ", format(previousWeek, "yyyy-MM-dd"));

const fs = require("fs");

//read a file
fs.readFile("./example.txt","utf-8",(err,data)=>{
  if(err){
    console.log("Error reading the file: ",err);
    return;
  }
  console.log("File contains: ", data);
});

//write to a file
const content = "Hello Sibangi!!!";
fs.writeFile("./example.txt",content,(err)=>{
  if(err){
    console.log("Error writing to the file: ",err);
    return;
  }
  console.log("File written Successfully");
});

//rename a file
fs.rename("./example.txt","new_example.txt",(err)=>{
  if(err){
    console.log("Error occured while renaming a file", err);
    return;
  }
  console.log("File renamed Successfully");
});

