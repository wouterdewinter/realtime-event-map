var app = require('http').createServer(handler)
var io = require('socket.io')(app);
var fs = require('fs');
var maxmind = require('maxmind');
var dispatcher = require('httpdispatcher');

var cityLookup = maxmind.openSync(__dirname + '/data/GeoLite2-City.mmdb');

app.listen(8080);

function handler (request, response) {
  try {
    console.log(request.url);
    dispatcher.dispatch(request, response);
  } catch(err) {
    console.log(err);
  }
}

// Set path to serve static resources
dispatcher.setStatic('static');
dispatcher.setStaticDirname('/public');

// A sample GET request
dispatcher.onPost("/hit", function(req, res) {
  let ip = req.connection.remoteAddress;
  console.log('Http ip is '+ip);
  emitEvent(ip);
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.writeHead(200, {'Content-Type': 'text/plain'});
  res.end('Ok');
});

io.on('connection', function (socket) {
  socket.on('event', function (data) {
    var ip = socket.request.connection.remoteAddress;
    console.log('Socket IP is '+ip);
    // emit ip from data now
    emitEvent(data.ip);
  });
});

const emitEvent = (ip) => {
  console.time("lookup");
  var city = cityLookup.get(ip);
  console.timeEnd("lookup");
  if (city !== null && city.location !== undefined) {
    data = {
      lng: city.location.longitude,
      lat: city.location.latitude
    };
    io.sockets.emit('hit', data);
    console.log('emitting event ', {data, ip});
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
  emitEvent(randomIp())
}, 1000);