var express = require('express');
var app = express();
var server = require('http').createServer(app);
var io = require('socket.io').listen(server);
var fs = require('fs');
var maxmind = require('maxmind');

var cityLookup = maxmind.openSync(__dirname + '/data/GeoLite2-City.mmdb');

app.use(express.static('public'));

server.listen(8080);

// A sample GET request
app.get('/hit', function (req, res) {
  let ip = req.connection.remoteAddress;
  console.log('Http ip is '+ip);
  //emitEvent(data.ip);
  emitEvent(randomIp(), req.query.id);
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.writeHead(200, {'Content-Type': 'text/plain'});
  res.end('Ok');
});

io.on('connection', function (socket) {
  socket.on('event', function (data) {
    var ip = socket.request.connection.remoteAddress;
    console.log('Socket IP is '+ip);
    // emit ip from data now
    //emitEvent(data.ip);
    emitEvent(randomIp());
  });

  socket.on('join', function (data) {
    console.log('current rooms: ', socket.rooms);
    Object.keys(socket.rooms).map((key) => {
      console.log('Leaving room '+key);
      socket.leave(key);
    });
    console.log('Joining room ' + data.id);
    socket.join(data.id);
  });
});

const emitEvent = (ip, id) => {
  //console.time("lookup");
  var city = cityLookup.get(ip);
  //console.timeEnd("lookup");
  if (city !== null && city.location !== undefined) {
    data = {
      lng: city.location.longitude,
      lat: city.location.latitude
    };
    io.to(id).emit('hit', data);
    //console.log('emitting event ', {data, ip});
  } else {
    console.log("lookup failed for " + ip)
  }
};

const randomIp = () => {
  return Math.floor((Math.random() * 255) + 1)
      + "." + Math.floor((Math.random() * 255) + 1)
      + "." + Math.floor((Math.random() * 255) + 1)
      + "." + Math.floor((Math.random() * 255) + 1);
};

// Simulate events
setInterval(() => {
  emitEvent(randomIp(), 'demo')
}, 1000);