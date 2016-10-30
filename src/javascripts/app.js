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

    var myoverlay = new google.maps.OverlayView();
    myoverlay.draw = function () {
        console.log('draw');
        this.getPanes().markerLayer.id='markerLayer';
    };
    myoverlay.setMap(map);

    var socket = io('http://localhost:8080');

    socket.on('hit', function (data) {
        console.log(data);
        var marker = new google.maps.Marker({
            position: data,
            map: map,
            //title: 'Hello World!',
            icon: getCircle(5),
            optimized: false
        });

        // Remove marker after a while
        setTimeout(() => {
            marker.setMap(null);
        }, 5000)
    });

    function hit () {
        var ip = Math.floor((Math.random() * 255) + 1)
            + "." + Math.floor((Math.random() * 255) + 1)
            + "." + Math.floor((Math.random() * 255) + 1)
            + "." + Math.floor((Math.random() * 255) + 1);
        console.log(ip);
        socket.emit('event', { type: 'hit', ip:ip });
    };

    //setInterval(hit, 100);

}

function getCircle(magnitude) {
    return {
        //path: google.maps.SymbolPath.CIRCLE,
        //path: "M-20,0a20,20 0 1,0 40,0a20,20 0 1,0 -40,0",
        fillColor: 'red',
        fillOpacity: .2,
        //scale: Math.pow(2, magnitude) / 2,
        strokeColor: 'white',
        strokeWeight: .5,
        size: new google.maps.Size(100, 60),
        scaledSize: new google.maps.Size(70, 60),
        //url: 'https://s3-us-west-2.amazonaws.com/s.cdpn.io/123941/cheshire1-icon.png'
        url: 'images/icon.svg'
    };
}