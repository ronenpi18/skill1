// var request = require('request');
// var baseURL = '';
// function Get () {
//     // always initialize all instance properties
//
// }
// // class methods
// function getAllAcounts(BASIC_AUTH, ACCOUNT_HEADERS){ // ACCOUNT_HEADERS = json of user
//     // Set the headers
//     // var headers = {
//     //     'Content-Type':     'application/json',
//     //
//     // }
//     //var headers = ACCOUNT_HEADERS;
//
// // Configure the request
//     var options = {
//         url: baseURL+ '/api/account/getAccounts',
//         method: 'GET',
//         headers: [ACCOUNT_HEADERS, {Authorization:BASIC_AUTH}]
//
//        // qs: {'key1': 'xxx', 'key2': 'yyy'}
//     }
//
// // Start the request
//     request(options, function (error, response, body) {
//         if (!error && response.statusCode === 200) {
//             // Print out the response body
//             console.log(body)
//         }
//     })
// }
//
// // export the class
// module.exports = getAllAcounts;
//
//
// // {
// //     "name": "GET /cloud/metadata/id:",
// //     "request": {
// //     "url": "{{apiUrl}}/cloud/metadata/id:",
// //         "method": "GET",
// //         "header": [
// //         {
// //             "key": "sldx_accId",
// //             "value": "erezbkdev.test@gmail.com",
// //             "description": ""
// //         },
// //         {
// //             "key": "Authorization",
// //             "value": "Basic ZXJlekBzdGFydHguYWk6N2NiM2VmYmUtNGQ2YS00NWY3LTliYjItMTY5MzE3ZDQ4NTUz",
// //             "description": ""
// //         }
// //     ],
// //         "body": {
// //         "mode": "raw",
// //             "raw": "{\n\t\"email\":\"stas@startx.ai\",\n\t\"password\":\"123456\"\n}"
// //     },
// //     "description": "Test drive files"
// // },
// //     "response": []
// // },

var request = require('request');
var rp = require('request-promise');
var threadIDPARAM = '';

const baseURL = "https://api.shieldox.com/";
function Documents (ACCOUNT_HEADERS, BASIC_AUTH) {
    // always initialize all instance properties

    this.ACCOUNT_HEADERS = ACCOUNT_HEADERS;
    this.BASIC_AUTH = BASIC_AUTH;
} // api document tree
// class methods
function getAlldocs(){
    var headers = {
        "Content-Type":  "application/json",
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
                    threadIDPARAM =  filter_by_objId(body,'205.237.6') //todo input as param
                    // console.log(JSON.stringify(getAllCopies()));
                    getAllCopies();

                }
            })


        })
    return AllFileCopies;
}

function filter_by_objId(fileArr,objId){
    for(var i=0;i<fileArr.length;i++){
        if(objId==fileArr[i].objectId){
            return (fileArr[i].threadId);
        }
    }
    return "The file you are looking for cannot be found";
}

function getAllCopies(){
    var headers = {
        "Content-Type":     "application/json",
        "Authorization": "Basic c3Rhc0BzaGllbGRveC5jb206MTIzNDU2",//this.BASIC_AUTH,
        "sldx_accType":3,
        "sldx_accId":"stas@probot.ai"//this.ACCOUNT_HEADERS
    }
    var body= {
        'threadId':threadIDPARAM
    };

// Configure the request
    var options = {
        url: baseURL+"api/documents/tree",
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

                    console.log(body);
                }

            })
        })
}



module.exports = new Documents();
// export the class
module.exports = getAlldocs();