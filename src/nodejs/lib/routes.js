var express = require('express');
var random = require('./random.js');
var url = require('url');

module.exports = (app, io, cityLookup) => {

    // Test with random ip address
    app.get('/test', function (req, res) {
        emitEvent(random.randomIp(), req.query.id, getTla(req), req.query.color);
        res.setHeader('Access-Control-Allow-Origin', '*');
        res.writeHead(200, {'Content-Type': 'text/plain'});
        res.end('Ok');
    });

    app.get('/hit', function (req, res) {
        emitEvent(ip, req.query.id, getTla(req), req.query.color);
        res.setHeader('Access-Control-Allow-Origin', '*');
        res.writeHead(200, {'Content-Type': 'text/plain'});
        res.end('Ok');
    });

    app.get('/img', function (req, res) {
        let ip = req.ip;
        emitEvent(ip, req.query.id, getTla(req), req.query.color);
        var buf = new Buffer(43);
        buf.write("R0lGODlhAQABAIAAAAAAAAAAACH5BAEAAAAALAAAAAABAAEAAAICRAEAOw==", "base64");
        res.set('Content-Type', 'image/gif');
        res.set('Cache-Control', 'no-cache, no-store, must-revalidate');
        res.set('Pragma', 'no-cache');
        res.set('Expires', '0');
        res.send(buf);
    });

    function emitEvent (ip, mapId, tla = null, color = null) {
        // Defaults
        tla = tla || '';
        color = color || 'f00';

        var city = cityLookup.get(ip);
        if (city !== null && city.location !== undefined) {
            data = {
                lng: city.location.longitude,
                lat: city.location.latitude,
                tla,
                color: '#'+color
            };
            io.to(mapId).emit('hit', data);
        } else {
            console.log("lookup failed for " + ip);
        }
    }

    // Simulate events
    setInterval(() => {
        emitEvent(random.randomIp(), 'demo', 'DM', '0a0');
    }, 1000);
};

function getTla (req) {
    let tla = req.query.tla || '';

    // Use HTTP referer if tla is set to special value
    if (tla === '_referer') {
        let referer = req.headers.referer || '';
        let parsed = url.parse(referer);
        tla = parsed.hostname || '';
    }

    // Make uppercase and use only first two characters for display
    return tla.substr(0, 2).toUpperCase();
}