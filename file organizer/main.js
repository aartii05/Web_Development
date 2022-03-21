let inputArr=process.argv.slice(2);
let fs=require("fs");
let path=require("path")
console.log(inputArr);
// node main.js tree "directoryPath"
// node main.js organize "directoryPath"
// node main.js help

let types={
    media:['mp4','mkv'],
    archives:['zip','7z','rar','tar','gz','ar','iso','xz'],
    documents:['docx','doc','pdf','xlsx','xls','odt','ods','odp','odg','odf','txt','ps','tex'],
    app:['exe','dmg','pkg','deb']


}
let command=inputArr[0];
switch(command){
    case "tree":
        treeFn(inputArr[1]);
        break;
    case "organize":
        organizeFn(inputArr[1]);
        break;
    case "help":
        helpFn();
        break;
    default:
        console.log("Please input right command:");

}
function treeFn(dirPath){
    let destPath;
    if(dirPath==undefined){
        console.log("Kindly enter the path:");
    }else{
        let doesExist=fs.existsSync(dirPath);
        if(doesExist){
           treeHelper(dirPath,"");
           
        }else{
            console.log("Kindly enter the path:");
            

        }
    }


}

function treeHelper(dirPath,indent){
    // is file or folder
    let isFile= fs.lstatSync(dirPath).isFile();
    if(isFile==true){
        let fileName=path.basename(dirPath);
        console.log(indent+ "---"+fileName)

    }else{
        let dirName=path.basename(dirPath);

        console.log(indent+"---"+dirName);
        let childrens=fs.readdirSync(dirPath);
        for(let i=0;i<childrens.length;i++){
           let childPath= path.join(dirPath,childrens[i]);

            treeHelper(childPath,indent+"\t");

        }

    }

}
function organizeFn(dirPath){
    // 1. input-> directory path given
    let destPath;
    if(dirPath==undefined){
        console.log("Kindly enter the path:");
    }else{
        let doesExist=fs.existsSync(dirPath);
        if(doesExist){
            // 2. create-> organized_files-> directory
             destPath=path.join(dirPath,"organised_files");
            if(fs.existsSync(destPath)==false){
                fs.mkdirSync(destPath);
            }
           
        }else{
            //console.log("Kindly enter the path:");
            

        }
    }

    organizeHelper(dirPath,destPath);
  
   
    


}

function organizeHelper(src,dest){
     // 3. identify categories of all files present in that input directory
    let childrenNames=fs.readdirSync(src);
    //console.log(childrenNames);

    for(let i=0;i<childrenNames.length;i++){
        let childAddress=path.join(src,childrenNames[i]);
        let isFile=fs.lstatSync(childAddress).isFile();
        if(isFile){
            console.log(childrenNames[i]);
            let category=getCategory(childrenNames[i]);
            console.log(childrenNames[i],"belongs to --->",category);
            // 4. Copy/Cut files to that organized directory inside of any category folder
            sendFiles(childAddress,dest,category);

         }
    }
}

function sendFiles(srcFilePath,dest,category){
    let categoryPath=path.join(dest,category);
    if(fs.existsSync(categoryPath)==false){
        fs.mkdirSync(categoryPath);
    }
   let fileName= path.basename(srcFilePath);
   let destFilePath=path.join(categoryPath,fileName);
   fs.copyFileSync(srcFilePath,destFilePath);
   fs.unlinkSync(srcFilePath);
   console.log(fileName,"copied to-->",category);

}

function getCategory(name){
    let ext=path.extname(name);
    ext=ext.slice(1);
    //console.log(ext);

    for(let type in types){
        let cTypeArray=types[type];
        for(let i=0;i<cTypeArray.length;i++){
            if(ext==cTypeArray[i]){
                return type;
            }
           
        }
       
    }
    return "others" ;
}
function helpFn(){
    console.log(` List Of All Commands:
    node main.js tree "directoryPath"
    node main.js organize "directoryPath"
    node main.js help
    
    
    `);

}
