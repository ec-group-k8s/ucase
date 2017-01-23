module.exports = function (context, callback) {
    
    let q = context.request.query.q || "nil";
    console.log('passing ' + q + ' to process flow' );
    var http = require("http");

   
    let res = http.get('http://process?q=' + q, (res) => {
        const statusCode = res.statusCode;

        if(statusCode !== 200) {
            console.log(res);
            callback(500, "error in processing successor, code was "+statusCode);
            return;
        }

        res.setEncoding('utf8');
        let rawData = '';
        res.on('data', (chunk) => rawData += chunk);
        res.on('end', () => {
            callback(200, rawData);
        });
    }).on('error', (e) => {
        callback(500, 'u got an error with: ' + e.message);
    });
}
