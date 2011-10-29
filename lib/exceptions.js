

var mongo = require('mongoskin');
var db = mongo.db('localhost:27017/exceptional?auto_reconnect');
var events = db.collection('events');
/*
events.ensureIndex({stack : 1,      updated_at : 1},
                   {background : true});
events.ensureIndex({updated_at : 1, stack : 1},
                   {background : true});

*/
function record_error(err, context, cb) {
  var err_json = JSON.stringify(err);
  err_json.stack = err_json.stack.split('\n');
  
  record_event(err_json, context, cb);
}

function record_event(error, context, cb) {
  var now = new Date();
  events.insert({
                  error : error,
                  context : context,
                  created_at : now,
                  updated_at : now
                },
                cb
               );
}

exports.events = events;
exports.record_error = record_error;
exports.record_event = record_event;
