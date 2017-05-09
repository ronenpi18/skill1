/**
 * Created by ronen on 5/9/17.
 */
var request = require('sync-request');
var cors = require('cors');

const baseURL = "https://api.shieldox.com/api";
function Docu(AUTH,AccTYPE,AccID,objectID,domainOfCompany){
    this.AUTH = AUTH;
    this.AccTYPE = AccTYPE;
    this.AccID=AccID;
    this.objectID = "205.271.14";
    this.domainOfCompany = domainOfCompany;
}
var headers = {
    "Content-Type":     "application/json",
    "Authorization": "Basic c3Rhc0BzaGllbGRveC5jb206MTIzNDU2",//this.AUTH,//this.BASIC_AUTH,
    "sldx_accType":3,//this.AccTYPE,
    "sldx_accId":"stas@probot.ai"//this.AccID//this.ACCOUNT_HEADERS
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
        if(objid===body[i].objectid){
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
    var copies = JSON.parse(res.getBody('utf8'));
    return (copies)
}
function isOutCompany(companyDomain, copies){
    for(var i=0;i<copies.length;i++){
        if(copies[i].owner.email.replace(/.*@/, "")==companyDomain && copies[i].parentId!=null){
            return (true)
        }
    }
    return (false);
}
function main(objid){
    var json = getfromquery()
    var threadId = threadIDExtractor(json,objid)
    var copies = getfromTree(threadId)
    if(isOutCompany("gmail.com",copies)){
        return 'yes';
    }
    else
        return 'no'
}
//console.log(main("205.271.14"));
module.exports = Docu;
module.exports = main;

var express = require('express');
var app = express();
app.set('port', (process.env.PORT || 5000));
app.use(cors());
app.get('/isOutCompany', function(req, res){
    res.json({"text":main(req.query.objectId)})
});
app.get('/',function (req,res) {
    res.send('hello')

})

console.log("port 5000 is open, brace yourself!!1")
app.listen(app.get('port'), function() {
    console.log('Node app is running on port', app.get('port'));
});
