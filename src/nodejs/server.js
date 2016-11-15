'use strict';

var http = require('http');
var express = require('express');
var maxmind = require('maxmind');
var sockets = require('./lib/sockets.js');
var routes = require('./lib/routes.js');

// Create the webserver
var app = express();
var server = http.createServer(app);

// Configure statis hosting
app.use(express.static('public'));

// Trust all ip's as proxy
app.set('trust proxy', function (ip) {
    return true;
});

// Create socket handler
var io = sockets(server);

// Create maxmind IP lookup
let maxmindOptions = {cache: {max: 100, maxAge: 60 * 1000}};
var cityLookup = maxmind.openSync(__dirname + '/../../data/GeoLite2-City.mmdb', maxmindOptions);

// Apply routes
routes(app, io, cityLookup);

// Start listening for connections
server.listen(process.env.PORT || 8080);