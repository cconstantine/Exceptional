//
//Views
//

var EventView = Backbone.View.extend(
  {
    tagName: 'li',
    
    initialize: function(options) {
      _.bindAll(this, 'render');
      this.model.bind('all', this.render);
    },

    template: function() {return _.template($('#event_t').html());},

    render: function() {
      $(this.el).html(
        this.template()(
          {
            error : this.model.get("error")
          }));
      return this;
    }
  });

var NodeEventView = Backbone.View.extend(
  {
    initialize: function(options) {
      this.model.events.bind('add', this.addEvent);
      this.socket = options.socket;
    }
    , addEvent: function(event) {
      console.log(event);
      var view = new EventView({model: new models.Event(event)});
      var r = view.render().el;
      $('#events').append(r);
    }
  });