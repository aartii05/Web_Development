let fs=require("fs");
//async code
console.log("Before");
fs.readFile("f1.txt",function (err,data){
    console.log(data);
});

let promise=fs.promises.readFile("f1.txt");
console.log(promise);

promise.then(function (data){
    // fullfill state
    console.log(""+ data);
})

// rejected
promise.catch(function(err){
    console.log(err);

})
console.log("After");


