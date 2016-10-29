//import './modules'

console.log(`app.js has loaded!`)

import io from 'socket.io-client';

var map;

window.initMap = () => {
    map = new google.maps.Map(document.getElementById('map'), {
        zoom: 2,
        center: {lat: 0, lng: 0},
        mapTypeId: 'roadmap'
    });

    var socket = io('http://localhost:8080');

    socket.on('hit', function (data) {
        console.log(data);
        var marker = new google.maps.Marker({
            position: data,
            map: map,
            title: 'Hello World!',
            icon: getCircle(5)
        });
    });

    var marker = new google.maps.Marker({
        position: {lat: -25.363, lng: 131.044},
        map: map,
        title: 'Hello World!',
        icon: getCircle(5)
    });

    function hit () {
        var ip = Math.floor((Math.random() * 255) + 1)
            + "." + Math.floor((Math.random() * 255) + 1)
            + "." + Math.floor((Math.random() * 255) + 1)
            + "." + Math.floor((Math.random() * 255) + 1);
        console.log(ip);
        socket.emit('event', { type: 'hit', ip:ip });
    };

    setInterval(hit, 1000);

}

function getCircle(magnitude) {
    return {
        path: google.maps.SymbolPath.CIRCLE,
        fillColor: 'red',
        fillOpacity: .2,
        scale: Math.pow(2, magnitude) / 2,
        strokeColor: 'white',
        strokeWeight: .5
    };
}