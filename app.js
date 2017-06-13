var app = require('express')();
var request = require('request');
var http = require('http').Server(app);
var io = require('socket.io')(http);
var TIME = 4000;

const options = {  
  method: 'GET',
  uri: 'http://localhost:8086/query',
  qs: {
    pretty: true,
    db: "supply_data",
    q: "Select * from supply_data where vehicle_type='BLUE_BIRD'"
  }
}
app.get('/', function(req, res){
  res.sendFile('index.html', { root: __dirname });
});

var users = 0;
io.on('connection', function(socket){
  users++;
  console.log('A user connected '+users);

  //io.sockets.emit('broadcast',users);
  var val;
  socket.on('clientData',function(data){ val=data; });
  request(options,function(err,response){
    socket.emit('dbData',response.body);
      // console.log(response);
      // console.log('here!!');
  });

 //  setInterval(function(){
	//   //Sending an object when emmiting an event
 //  	socket.emit('dbData',val);
	// }, TIME);


  //Whenever someone disconnects this piece of code executed
  socket.on('disconnect', function () {
    console.log('A user disconnected');
    users--;
  });

});

http.listen(3000, function(){
  console.log('listening on *:3000');
});
//var app = require('express')();
//var http = require('http').Server(app);
//var io = require('socket.io')(http);

//app.get('/', function(req, res){
  //res.sendFile('index.html', { root: __dirname });
//});

//var nsp = io.of('/my-namespace');
//nsp.on('connection', function(socket){
  //console.log('someone connected');
  //nsp.emit('hi', 'Hello everyone!');
//});
//http.listen(3000, function(){
  //console.log('listening on localhost:3000');
//});
