var express = require('express')
var app = express()
var request = require('request')

var options = {
  inflate: true,
  limit: '100kb',
  type: '*/*'
};

var bodyParser = require('body-parser');
app.use(bodyParser.raw(options));

app.all('/', function (req, res) {
    delete req.headers['host'];
    delete req.headers['Host'];

    let body = req.body.toString('utf8') || null;

    if (req.method.toUpperCase() == "GET"){
        body = null;
    }

    var reqOptions = {
    	url: req.query.url,
        method: req.method,
        headers: req.headers,
        body: body
    };

    request(reqOptions, function(error, response, body){
        let statusCodeResp = response && response.statusCode;
        if (error) {
            res.status(500).send(error);
            return;
        }
        res.status(statusCodeResp).send(body)
    });

});

app.listen(3000)