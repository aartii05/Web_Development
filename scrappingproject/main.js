const url="https://www.espncricinfo.com/series/ipl-2020-21-1210595";
const request=require("request");
const cheerio=require("cheerio");
//home page
request(url,cb);
function cb(err,response,html){
    if(err){
        console.log(err);
    }else{
        //console.log(html);
        extractLink(html);
    }
}

function extractLink(html){
    let $=cheerio.load(html);
    let anchorElem=$("a[data-hover='View All Results']");
    let link=anchorElem.attr("href");
    let fullLink="https://www.espncricinfo.com/"+link;
    //console.log(fullLink);

    getAllMatchesLink(fullLink);

}

function getAllMatchesLink(url){
    request(url,function(err,response,html){
        if(err){
            console.log(err);
        }else{
            //console.log(html);
            extractAllLinks(html);
        }
    })
}

function  extractAllLinks(html){
    let $=cheerio.load(html);
    let scorecardElem=$("a[data-hover='Scorecard']");
    for(let i=0;i<scorecardElem.length;i++){
        let link=$(scorecardElem[i]).attr("href");
        //console.log(link);
        let fullLink="https://www.espncricinfo.com"+link;
        console.log(fullLink);

    }
}