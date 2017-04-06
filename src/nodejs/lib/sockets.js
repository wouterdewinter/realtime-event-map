'use strict';

var md5 = require('md5');
var ioServer = require('socket.io');
var random = require('./random.js');
var debug = require('debug')('rtm');

module.exports = function (webserver, config) {

    // Start listening
    var io = ioServer.listen(webserver);

    io.on('connection', function (socket) {

        // wouter: disabled event collection via sockets for now
        // socket.on('event', function (data) {
        //    var ip = socket.request.connection.remoteAddress;
        //    emitEvent(ip, data.mapId, data.tla, data.color);
        //});

        // Join an existing map
        socket.on('join', function (data) {
            // Check if key matches (always allow for demo id)
            if (data.key === md5(config.salt + data.mapId) || data.mapId === 'demo') {
                join(socket, data.mapId);
            } else {
                let error = 'Could not join room, key is invalid';
                debug(error);
                socket.emit({error});
            }
        });

        // Create a new map
        socket.on('new', function (data) {
            let mapId = random.randomStr(8);
            let key = md5(config.salt + mapId);

            // Join new room immediately
            join(socket, mapId);

            // Return new key and mapId to client
            socket.emit('map_created', {mapId, key});
        });
    });

    return io;
};

// Join an existing map (and leave all others)
function join (socket, mapId) {
    Object.keys(socket.rooms).map((room) => {
        debug('Leaving room ' + room);
        socket.leave(room);
    });
    debug('Joining room ' + mapId);
    socket.join(mapId);
}

