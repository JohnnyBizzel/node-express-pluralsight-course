// Not part of this course

var express = require('express');
var fs = require("fs");
var app = express();

app.get('/books', function(req, res){
    var filename = process.argv[3];
    var x = '';
    fs.readFile(filename, function(err ,data) {
        if (err) return res.sendStatus(500);
      try {
      x = JSON.parse(data);
    } catch (err) {
      res.sendStatus(500);
    }
        res.json((x));      
    });
  
});

app.listen(process.argv[2]);