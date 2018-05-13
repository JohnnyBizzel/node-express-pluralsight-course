var https = require('https');
var xml2js = require('xml2js'); // XML to JSON
var parser = xml2js.Parser({explicitArray: false});

var goodReadsService = function () {

    var getBookById = function (id, cb) {
        console.log('getting GR id:', id)
        var options = {
            host: 'www.goodreads.com',
            path: '/book/show/' + id + '?format=xml&amp;key=' + process.env.BOOK_API_KEY
        };
        console.log(options.path);
        var callback = function(response) {
            var str = '';

            response.on('data', function(chunk) {
                str += chunk;                
            });
            response.on('end', function() {
                parser.parseString(str,
                    function(err, result) {
                        if (err) console.log(err);
                        console.log(result);
                        cb(null, result.GoodreadsResponse.book);
                    });
            });
        };

        https.request(options, callback).end();
    };

    return {
        getBookById: getBookById
    };
};

module.exports = goodReadsService;