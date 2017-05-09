var request = require('request');
var baseURL = 'https://api.sjieldox.com/';
function Protect (ACCOUNT_HEADERS, BASIC_AUTH) {
    // always initialize all instance properties

    this.ACCOUNT_HEADERS = ACCOUNT_HEADERS;
    this.BASIC_AUTH = 'Basic '+BASIC_AUTH;
} // api document tree
// class methods
function setProtectionLevel(isFolder, color,entityId){ // ACCOUNT_HEADERS = json of user
    // Set the headers
    // var headers = {
    //     'Content-Type':     'application/json',
    //
    // }
    //var headers = ACCOUNT_HEADERS;
    var folderorfile = null;
    if(isFolder)
        folderorfile = 'folder'
    else folderorfile = 'file'
// Configure the request
    var options = {
        url: baseURL+ '/cloud/'+ folderorfile + '/'+entityId+'/protect/'+color,
        method: 'GET',
        headers: [this.ACCOUNT_HEADERS, {Authorization:this.BASIC_AUTH}]

        // qs: {'key1': 'xxx', 'key2': 'yyy'}
    }


    /*
    Protect = new Prote`ct('ACCOUNT HEADERS','Basic_AUTH')
     */
// Start the request
    request(options, function (error, response, body) {
        if (!error && response.statusCode === 200) {
            // Print out the response body
            console.log(body)
        }
    })
}

// export the class
module.exports = setProtectionLevel;


// {
//     "name": "GET /cloud/metadata/id:",
//     "request": {
//     "url": "{{apiUrl}}/cloud/metadata/id:",
//         "method": "GET",
//         "header": [
//         {
//             "key": "sldx_accId",
//             "value": "erezbkdev.test@gmail.com",
//             "description": ""
//         },
//         {
//             "key": "Authorization",
//             "value": "Basic ZXJlekBzdGFydHguYWk6N2NiM2VmYmUtNGQ2YS00NWY3LTliYjItMTY5MzE3ZDQ4NTUz",
//             "description": ""
//         }
//     ],
//         "body": {
//         "mode": "raw",
//             "raw": "{\n\t\"email\":\"stas@startx.ai\",\n\t\"password\":\"123456\"\n}"
//     },
//     "description": "Test drive files"
// },
//     "response": []
// },