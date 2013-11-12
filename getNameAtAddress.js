// run: casperjs getNameAtAddress.js
// casperjs getNameAtAddress.js | tee stillthere.txt
//
// TODOS
//  1.DONE get submit to work
//  2.DONE pull last name from new page's dom
//  3.DONE compare to expected
//  4. write out all who match [ERROR in casper?]
//
//
// file to check address against last name
// https://phantomjs.googlecode.com/files/phantomjs-1.9.2-windows.zip
// https://github.com/ariya/phantomjs/wiki/Quick-Start
// http://stackoverflow.com/questions/9246438/how-to-submit-a-form-using-phantomjs
// http://stackoverflow.com/questions/10865849/phantomjs-javascript-read-a-local-file-line-by-line
//
// http://docs.casperjs.org/en/latest/modules/casper.html#fill

'use strict';

/* do stuff locally */

var system=require('system'), //not needed
    fs = require('fs');
var filedata = fs.read('namesAndAddress.txt'),     // read the file into a single string
    arrdata = filedata.split(/[\r\n]/); // split the string on newline and store in array

//var outfile = open('stillthere.txt','w');

var data=[];
//StudentLastName	StudentFirstName	retriveDate	DOB	AgeMonths	AgeYears	ZipCode	StreetName	StreetNumber	StreetNumberHalf	StreetDirection	StreetSuffix	Apt.Number	City	State	PrimaryHomeAddress
for(var idx=0; idx<arrdata.length;idx++){
  data[idx]=arrdata[idx].split(/\t/);
}


/* do stuff on the web for each name*/
// values at data[0][*] are titles
var  casper = require('casper').create();
var i=1;

casper.start();

casper.repeat(arrdata.length-2,function(){ this.wait(3000,function(){

  var name = data[i][0];
  var st   = data[i][7];
  var num  = data[i][8];
  var idxi = i;         // i is scoped outside of loop and increments before we want to call it
                        // maybe?? -- i and idxi are not the same when I expect them to be
  //console.log(i,name,st,num)
  
  /*queue: load the page*/
  casper.thenOpen('http://www2.county.allegheny.pa.us/RealEstate/Search.aspx', function() {
    //this.capture('open.png')
    //console.log('form exists?', casper.exists('form#Form10'))
    this.fill(
     'form#Form10',
     { 'txtStreetName': st,
       'txtStreetNum':  num },
      false);
    //this.capture('filled.png')
    this.click('#btnSearch');
    document.querySelector('input#btnSearch').submit();
  });
  
  /*queue: parse the results*/
  casper.then(function() {
    //this.capture('final.png');
    //console.log('label exists?', casper.exists('span#BasicInfo1_lblOwner'))
    //console.log('clicked ok, new loc ' + this.getCurrentUrl())
    var url=this.getCurrentUrl();
    var label=this.evaluate(function(){return document.querySelector('span#BasicInfo1_lblOwner').textContent.trim()})
    var regname=new RegExp(name,'i');
    var match=regname.test(label);
    //console.log(url)
    this.echo(i +': ' +name + ' match web ' + label + '? ' + match,'INFO')
    if(match){
     //TODO: write to file
     //outfile.writeLine( arrdata[i].concat([label,url]).join("\t")  )
     var content=arrdata[idxi] + "\t" + label + "\t" + url //+"\n" ;
     //console.log(i,idxi,label,name,data[idxi]) // i and idxi are not the same
     console.log(content)
     //write('stillthere.txt',content,'a')
    
    }
    else {
     //this.echo('not writting')
     //this.capture('error.png')
    }

  })
  
  i++;
})})
/*execute*/
casper.run()
//close(outfile)
