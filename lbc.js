let request = require("request");
let cheerio = require("cheerio");
// url for this que
let url = "https://www.espncricinfo.com/series/ipl-2020-21-1210595/royal-challengers-bangalore-vs-sunrisers-hyderabad-eliminator-1237178/ball-by-ball-commentary";
console.log("Before");
request(url, cb);
function cb(error , response , html) {
    // console.error("error" , error); //print the error if occured
    // console.log("body :" , html); // print the html for the google homepage
    if(error){
        console.log(error) ; //print the error if occured
    }
    else if(response.statuscode == 404){
        console.log("Page not Found");
    }
    else{
        // console.log(html); // Print the html for the request made
        // console.log("html :");
        dataExtractor(html);
    }
}
function dataExtractor(html) {
    // search tool
    let searchTool = cheerio.load(html);
    let elemRepArr = searchTool(".match-comment-wrapper .match-comment-long-text");
    console.log(elemRepArr.length);
    let lbc = searchTool(elemRepArr[0]).text();
    console.log("LAST BALL COMMENTARY IS : " , lbc);
}
console.log("after");