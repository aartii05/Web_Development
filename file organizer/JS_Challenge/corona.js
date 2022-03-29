const request = require('request');
const fs=require('request');
console.log("before");

request('https://www.worldometers.info/coronavirus/',cb);

console.log("After");

function cb(error,response,html){
    if(error){
        console.log('error:',error);
    }else{
        console.log('html:',html);
    }
}