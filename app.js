
/**
 * Module dependencies.
 */

var express = require('express');
var io      = require('socket.io');
var exceptions = require('./lib/exceptions.js');
var _ = require('underscore')._;
var backbone = require('backbone');

var app = module.exports = express.createServer();

// Configuration

app.configure(
  function(){
    app.set('views', __dirname + '/views');
    app.set('view engine', 'ejs');
    app.use(express.bodyParser());
    app.use(express.methodOverride());
    app.use(express.cookieParser());
    app.use(express.session({ secret: 'your secret here' }));
    app.use(app.router);
    app.use(express.static(__dirname + '/public'));
  });

app.configure('development', function(){
  app.use(express.errorHandler({ dumpExceptions: true, showStack: true })); 
});

app.configure('production', function(){
  app.use(express.errorHandler()); 
});


sio = io.listen(app);
sio.set('log level', 1); 

sio.sockets.on(
  'connection',
  function(socket) {
    exceptions.events.find({},
                           {sort : [['updated_at', 1]], 
                            limit : 50}).each(
                              function(err, item) {
                                if(!item)
                                  return;
                                socket.emit('event', item);
                                
                              });
  });
 

// Routes

app.post(
  '/register_event',
  function(req, res) {
    exceptions.record_event(
      req.body.error,
      req.body.context,
      function(err, item) {
        item = item[0];
        console.log(item);
        if(err)
          console.log(err.stack);
        if(!item)
          return;
        sio.sockets.emit('event', item);
      });
    res.json({OK : true, body : req.body || ''});
  });

app.listen(3000);

console.log("Express server listening on port %d in %s mode", app.address().port, app.settings.env);
