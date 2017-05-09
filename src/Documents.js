/**
 * Created by ronen on 5/8/17.
 */
var request = require('request');
var rp = require('request-promise');
var threadIDPARAM = ''

const baseURL = "https://api.shieldox.com/";
function Documents (ACCOUNT_HEADERS, BASIC_AUTH,fileID) {
    // always initialize all instance properties
    this.ACCOUNT_HEADERS = ACCOUNT_HEADERS;
    this.BASIC_AUTH = BASIC_AUTH;
    this.fileID = fileID;
}
function getAsFile(){
    var headers = {
        "Content-Type":     "application/json",
        "Authorization": "Basic c3Rhc0BzaGllbGRveC5jb206MTIzNDU2",//this.BASIC_AUTH,
        "sldx_accType":3,
        "sldx_accId":"stas@probot.ai"//this.ACCOUNT_HEADERS
    }
    var body= {
        'pageSize':50
    };

// Configure the request
    var options = {
        url: baseURL+"/api/documents/query",
        method: "POST",
        headers: headers,
        json:true,
        body:body
    };
// Start the request
    rp(options)
        .then(function(body) {
            request(options, function (error, response, body) {
                if (!error && response.statusCode == 200) {
                   threadIDPARAM =  filter_by_objId(body,'205.271.14')//'205.237.6') //todo input as param
                    console.log(threadIDPARAM);
                    if(getAllCopies(threadIDPARAM)!==undefined){
                        if(a!==undefined)
                            return a;
                    }
                }
            })
        })


}
/*
 */

function filter_by_objId(fileArr,objId){
    for(var i=0;i<fileArr.length;i++){
        if(objId==fileArr[i].objectId){
            return (fileArr[i].threadId);
        }
    }
    return "The file you are looking for cannot be found";
}

let a;

function equal_email_of_owner_by_domain(companyDomain, copyOfFileArr){
    for(var i=0;i<copyOfFileArr.length;i++){
        if(copyOfFileArr[i].owner.email.replace(/.*@/, "")===companyDomain){
            a= (true)
        }
    }
    a= (false);
}
function end(bool){
    return bool
}
function getAllCopies(threadID) {
    var headers = {
        "Content-Type": "application/json",
        "Authorization": "Basic c3Rhc0BzaGllbGRveC5jb206MTIzNDU2",//this.BASIC_AUTH,
        "sldx_accType": 3,
        "sldx_accId": "stas@probot.ai"//this.ACCOUNT_HEADERS
    }
    var body = {
        'threadId': threadID //check
    };

// Configure the request
    var options = {
        url: baseURL + "api/documents/tree",
        method: "POST",
        headers: headers,
        json: true,
        body: body
    };
// Start the request
    rp(options)
        .then( function (body) {
            request(options, function (error, response, body) {
                if (!error && response.statusCode === 200 ) {
                    return equal_email_of_owner_by_domain("gmail.com", body); //todo input as param
                }
            })
        })
}

module.exports = getAsFile;

