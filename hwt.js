let request = require("request");
let cheerio = require("cheerio");
let fs = require("fs");
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
    let searchTool = cheerio.load(html); // search tool is a global tool
    // page -> tables -> row get
    let bowler = searchTool(".table.bowler tbody tr ");
    let htmlData = "";
    for(let i = 0 ; i <bowler.length ; i++){
        // html function
        htmlData += searchTool(bowler[i]).html();
    }
    fs.writeFileSync("table.html" , htmlData);
    //loop
    //name
    //compare -> hwt find
    for(let i = 0 ; i <bowler.length ; i++){
        // row -> col
        let cols = searchTool(bowler[i]).find("td");
        let name = searchTool(cols[0]).text();
        let wickets = searchTool(cols[4]).text();
        console.log(name + " " + wickets);
    }
}
console.log("after");