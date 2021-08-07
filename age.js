let request = require("request");
let cheerio = require("cheerio");
// url for this que
let url = "https://www.espncricinfo.com/series/ipl-2020-21-1210595/royal-challengers-bangalore-vs-sunrisers-hyderabad-eliminator-1237178/full-scorecard";
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
    let bowlers = searchTool(".table.bowler tbody tr");
    for(let i = 0 ; i < bowlers.length ; i++){
        let cols = searchTool(bowlers[i]).find("td");
        let aElem = searchTool(cols[0]).find("a");
        let link = aElem.attr("href");
        // console.log(link)
        //link
        let fullLink = `https://www.espncricinfo.com${link}`;
        request( fullLink, ncb);
    }
}
function ncb(error , response , html) {
    if(error){
        console.log(error);
    }
    else if(response.statusCode == 404){
        console.log("Page not found");
    }
    else{
        //console.log(html);
        console.log("...................");
        getAge(html);
    }
}
function getAge(html) {
    let searchTool = cheerio.load(html);
    let headingArr = searchTool(".player-card-description");
    let age = searchTool(headingArr[2]).text();
    let name = searchTool(headingArr[0]).text();
    console.log(name + " " + age);
}
console.log("after");