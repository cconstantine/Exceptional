var http = require('http');
var request = require('request');
var excepts = require('./lib/exceptions.js');

var err = new Error("hi");
var err_json = JSON.parse(JSON.stringify(err));
err_json.stack = err_json.stack.split('\n');

var options = {
  url: 'http://localhost:3000/register_event',
  json : {
    error : err_json,
    context : { test : 1 }
  },
  method: 'POST'
};

request(options,
       function(err, b, c) {
         if(err)
           console.log(err.stack);
         console.log( b.body);
       });
