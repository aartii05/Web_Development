#!/usr/bin/env node
let fs=require("fs");


//input

// 1. Display the content of the file
// 2. wcat filepath1 filepath2 filepath3 ... -> displays content of all files in the terminal
// 3. wcat -s filepath-> convert big line break into singular line break
// 4. wcat -n filepath-> gives numbering to all lines
// 5. wcat -b filepath-> gives numbering to all non empty lines
// 6. wcat filepath-> filepath2-> Puts all content of filename into filename2 by overriding and also creates it if it does'nt exist



// identify options (starts with -)
// input
let inputArr = process.argv.slice(2);
// console.log(inputArr);
// options
let optionsArr = [];
let filesArr = [];
// identify -> options
for (let i = 0; i < inputArr.length; i++) {
    let firstChar = inputArr[i].charAt(0);
    if (firstChar == "-") {
        optionsArr.push(inputArr[i]);
    } else {
        filesArr.push(inputArr[i]);

    }


}
// options check
let isBothPresent=optionsArr.includes("-b") && optionsArr.includes("-n");
if(isBothPresent){
    console.log("Either enter -b or -n option:");
    
}
// existence
for(let i=0;i<filesArr.length;i++){
    let isPresent=fs.existsSync(filesArr[i]);
    if(isPresent==false){
        console.log(`file ${filesArr[i]} is not present`);

        


    }
}


// read files
let content="";
for(let i=0;i<filesArr.length;i++){
    // data comes in buffer
   let bufferContent= fs.readFileSync(filesArr[i]);
   content+=bufferContent+"\r\n";

}
console.log(content);
let contentArr=content.split("\r\n");
//console.log(contentArr);

// -s 
let isSPrenst=optionsArr.includes("-s");
if(isSPrenst==true){
    for(let i=1;i<contentArr.length;i++){
       if(contentArr[i]=="" && contentArr[i-1]==""){
           contentArr[i]=null;
           
       } else if(contentArr[i]=="" && contentArr[i-1]==""){
           contentArr[i]=null;
       }
    }
    let tempArr=[];
    for(let i=0;i<contentArr.length;i++){
        if(contentArr[i]!=null){
            tempArr.push(contentArr[i]);
        }
        contentArr=tempArr;
    }
}
console.log("''''''''''");
//console.log(contentArr.join("\n"));

let isNPresent=optionsArr.includes("-n");
if(isNPresent==true){
    for(let i=0;i<contentArr.length;i++){
        contentArr[i]=`${ i+1 } ${contentArr[i]} `;


    }
   
}
//console.log(contentArr.join("\n"));

let isBPresent=optionsArr.includes("-b");
if(isBPresent==true){
    let counter=1;
    for(let i=0;i<contentArr.length;i++){
        if(contentArr[i]!=""){
            contentArr[i]=`${counter} ${contentArr[i]}`;
            counter++;
        }
    }
}
console.log(contentArr.join("\n"));

