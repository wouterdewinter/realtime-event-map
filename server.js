var express = require('express');
var app = express();
var server = require('http').createServer(app);
var io = require('socket.io').listen(server);
var fs = require('fs');
var maxmind = require('maxmind');
var config = require('./config/config.js');
var cityLookup = maxmind.openSync(__dirname + '/data/GeoLite2-City.mmdb', {cache: {max: 100, maxAge: 60 * 1000}});
var md5 = require('md5');
var random = require('./src/javascripts/modules/random.js');
app.use(express.static('public'));

// Trust all ip's as proxy
app.set('trust proxy', function (ip) {
  return true;
});

server.listen(process.env.PORT || 8080);

// Test with random ip address
app.get('/test', function (req, res) {
  emitEvent(randomIp(), req.query.id);
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.writeHead(200, {'Content-Type': 'text/plain'});
  res.end('Ok');
});

app.get('/hit', function (req, res) {
  let ip = req.ip;
  emitEvent(ip, req.query.id);
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.writeHead(200, {'Content-Type': 'text/plain'});
  res.end('Ok');
});

app.get('/img', function (req, res) {
  let ip = req.ip;
  emitEvent(ip, req.query.id);
  var buf = new Buffer(43);
  buf.write("R0lGODlhAQABAIAAAAAAAAAAACH5BAEAAAAALAAAAAABAAEAAAICRAEAOw==", "base64");
  res.set('Content-Type', 'image/gif');
  res.set('Cache-Control', 'no-cache, no-store, must-revalidate');
  res.set('Pragma', 'no-cache');
  res.set('Expires', '0');
  res.send(buf);
});

io.on('connection', function (socket) {
  socket.on('hit', function (data) {
    var ip = socket.request.connection.remoteAddress;
    console.log('Socket IP is '+ip);
    emitEvent(data.ip);
  });

  socket.on('join', function (data) {
    // Check if key matches (always allow for demo id)
    if (data.key === md5(config.salt + data.mapId) || data.mapId === 'demo') {
      join(socket, data.mapId);
    } else {
      let error = 'Could not join room, key is invalid';
      console.log(error);
      socket.emit({error});
    }
  });

  socket.on('new', function (data) {
    let mapId = random(8);
    let key = md5(config.salt + mapId);

    // Join new room immediately
    join(socket, mapId);

    // Return new key and mapId to client
    socket.emit('map_created', {mapId, key});
  });
});

const join = (socket, mapId) => {
  Object.keys(socket.rooms).map((room) => {
    console.log('Leaving room ' + room);
    socket.leave(room);
  });
  console.log('Joining room ' + mapId);
  socket.join(mapId);
};

const emitEvent = (ip, mapId) => {
  //console.time("lookup");
  var city = cityLookup.get(ip);
  //console.timeEnd("lookup");
  if (city !== null && city.location !== undefined) {
    data = {
      lng: city.location.longitude,
      lat: city.location.latitude
    };
    io.to(mapId).emit('hit', data);
    //console.log('emitting event ', {data, ip});
  } else {
    //console.log("lookup failed for " + ip)
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

//setInterval(() => {
//  console.log("Mem used: "+process.memoryUsage().heapUsed)
//}, 1000);


