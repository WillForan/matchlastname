// file to check address against last name
// https://phantomjs.googlecode.com/files/phantomjs-1.9.2-windows.zip
// https://github.com/ariya/phantomjs/wiki/Quick-Start
// http://stackoverflow.com/questions/9246438/how-to-submit-a-form-using-phantomjs
// http://stackoverflow.com/questions/10865849/phantomjs-javascript-read-a-local-file-line-by-line
//

/* do stuff locally */
var fs = require('fs');
var filedata = fs.read('namesAndAddress.txt');     // read the file into a single string
var arrdata = filedata.split(/[\r\n]/); // split the string on newline and store in array

// for arrdata.lenght -> split by \t into 2d array (address and lastname)


/* do stuff on the web for each name*/
//TODO
// write + put in for loop
var page=require('webpage').create();
function submitValues(){
 //fill out form
 //submit
}
//TODO, how to read submited data

page.open('http://www2.county.allegheny.pa.us/RealEstate/Search.aspx',submitValues) // open the page




