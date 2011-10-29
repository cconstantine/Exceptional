(function () {
   var server = false, models;
   if (typeof exports !== 'undefined') {
     _ = require('underscore')._;
     Backbone = require('backbone');

     models = exports;
     server = true;
   } else {
     models = this.models = {};
   }

   //
   //models
   //
   
   models.Event = Backbone.Model.extend(
     {
       initialize: function() {
         this.events = new models.EventCollection(); 
       }
     }
   );

   models.EventCollection = Backbone.Collection.extend(
     {
       model: models.Event
     });
 })();