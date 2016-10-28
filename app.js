var app = require('http').createServer(handler)
var io = require('socket.io')(app);
var fs = require('fs');
var maxmind = require('maxmind');

// maxmind.open(__dirname + '/data/GeoLite2-City.mmdb', (err, cityLookup) => {
//   var city = cityLookup.get('66.6.44.4');
//   console.log(city.location.latitude, city.location.longitude);
// });
var cityLookup = maxmind.openSync(__dirname + '/data/GeoLite2-City.mmdb');

app.listen(8080);

function handler (req, res) {
  fs.readFile(__dirname + '/index.html',
  function (err, data) {
    if (err) {
      res.writeHead(500);
      return res.end('Error loading index.html');
    }

    res.writeHead(200);
    res.end(data);
  });
}

io.on('connection', function (socket) {
  socket.on('event', function (data) {
    var city = cityLookup.get(data.ip);
    if (city !== null) {
      data = {
        x: city.location.longitude,
        y: city.location.latitude
      }
      socket.broadcast.emit('hit', data);
      console.log(data);
    }
  });
});

io.on('connection', function (socket) {
  var ip = socket.request.connection.remoteAddress;
  console.log('IP is '+ip);
});
