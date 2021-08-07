// npm i request
let request = require("request");
// npm i cheerio
let cheerio = require("cheerio");
//data extract -> cheerio
console.log("Before");
request("https://www.npmjs.com/package/cheerio" , cb);
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
    // css selector -> element
    let elemRep = searchTool("#readme>h1");
    // text
    let moduleName = elemRep.text().trim();
    console.log("module name :" , moduleName);
}
console.log("after");