const url = "https://www.espncricinfo.com/series/ipl-2020-21-1210595/mumbai-indians-vs-chennai-super-kings-1st-match-1216492/full-scorecard";
// Venue date opponent result runs balls fours sixes sr
const request = require("request");
const cheerio = require("cheerio");
// home page 
function processScorecard(url) {

    request(url, cb);
}
function cb(err, response, html) {
    if (err) {
        console.log(err);
    } else {
        // console.log(html);
        extractMatchDetails(html);
    }
}

function extractMatchDetails(html){
    // Venue date opponent runs balls fours sixes sr
    // ipl
        // team
            // player
                // runs balls fours sixes sr opponent venue date
    // venue date result common between both teams
    // .event .status-text
    // .event .description
    let $ = cheerio.load(html);
    let descElem = $(".event .description");
    let result = $(".event .status-text");
    console.log(descElem.text());
    console.log(result.text());

}