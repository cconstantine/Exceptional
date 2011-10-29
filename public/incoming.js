
$(document).ready(
  function() {
    
    var socket = io.connect();

/*    
    socket.on('event', function (data) {
                $(".events").after(JSON.stringify(data) + '<br/><br/>');
              });
*/

    this.model = new models.Event();
    this.view = new NodeEventView({model: this.model,
                                   socket: this.socket,
                                   el: $('#content')});
    var view = this.view;

    socket.on('event',
                   function(msg) {
                     view.addEvent(msg);
                   });
    this.view.render();
  });