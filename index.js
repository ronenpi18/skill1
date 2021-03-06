/**
 * Created by ronen on 5/9/17.
 */
var request = require('sync-request');
var cors = require('cors');
var bodyparser = require('body-parser')
const baseURL = "https://api.shieldox.com/api";
function Docu(AUTH,AccTYPE,AccID,objectID,domainOfCompany){
    this.AUTH = AUTH;
    this.AccTYPE = AccTYPE;
    this.AccID=AccID;
    this.domainOfCompany = domainOfCompany;
}
var headers = {
    "Content-Type":     "application/json",
    "Authorization": "Basic Z3V5QHByb2JvdC5haTpBdmFpbG8xMzQx",//this.AUTH,//this.BASIC_AUTH,
    "sldx_accType":3,//this.AccTYPE,
    "sldx_accId":"guy@probot.ai"//this.AccID//this.ACCOUNT_HEADERS
}
function getfromquery(){
    var body= {
        'pageSize':50
    };

    var res = request('POST', baseURL+'/documents/query', { headers:headers, json:body
    });
    var user = JSON.parse(res.getBody('utf8'));
    return (user)
}
function threadIDExtractor(body,objid){
    for(var i=0;i<body.length;i++){
        if(objid===body[i].objectId){
            return (body[i].threadId);
        }
    }
    return "The file you are looking for cannot be found";
}
function getfromTree(threadID){
    var body= {
        'threadId':threadID
    };

    var res = request('POST', baseURL+'/documents/tree', { headers:headers, json:body
    });
    var copies = JSON.parse(res.body);
    return (copies)
}
function isOutCompany(companyDomain, copies){
    for(var i=0;i<copies.length;i++){

        if(copies[i].owner.email.replace(/.*@/, "")===companyDomain && copies[i].parentId!==null){
            return (true)
        }
    }
    return (false);
}
function filter(companyDomain, copies){
    var arr = []
    for(var i=0;i<copies.length;i++){
console.log(copies[i]);
        if(copies[i].owner.email.replace(/.*@/, "")!=companyDomain ){
            arr.push(copies[i])
        }
    }
    if(arr.length != 0){
        return {"text":"yes","num": arr.length, "copies":arr};
    }
    else{
        return {"text":"no"};
    }
}
//filter
function main_filter(objid){
    var json = getfromquery()
    var threadId = threadIDExtractor(json,objid)
    var copies = getfromTree(threadId)
    return filter("probot.ai",copies)
}
function copies(objid){
    var json = getfromquery()
    var threadId = threadIDExtractor(json,objid)
    var copies = getfromTree(threadId)
    if(copies.length != 0){
        return {"text":"yes","num": copies.length, "copies":copies};
    }
    else{
        return {"text":"no"};
    }
}
function main(objid){
    var json = getfromquery()
    var threadId = threadIDExtractor(json,objid)
    var copies = getfromTree(threadId)
    if(isOutCompany("probot.ai",copies)){
        return 'yes';
    }
    else
        return 'no'
}
//console.log(main("205.237.6"));
module.exports = Docu;
module.exports = main;

var express = require('express');
var app = express();
app.use(bodyparser.json())
app.set('port', (process.env.PORT || 5000));
app.use(cors());
app.get('/isOutCompany', function(req, res){
    res.json({"text":main(req.query.objectId)})
});
app.get('/copy',function (req, res) {
    res.json(copies(req.query.objectId))
})
app.get('/copyOutside',function (req,res) {
    res.json(main_filter(req.query.objectId))

})
app.get('/',function (req,res) {
    res.send('hello')

})

console.log("port 5000 is open, brace yourself!!1")
app.listen(app.get('port'), function() {
    console.log('Node app is running on port', app.get('port'));
});
