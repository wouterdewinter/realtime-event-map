//import './modules'

console.log(`app.js has loaded!`)

import io from 'socket.io-client';
import hash from 'modules/hash';

var map;

window.initMap = () => {

    map = new google.maps.Map(document.getElementById('map'), {
        zoom: Number(hash.getParam('zoom', 2)),
        center: {lat: Number(hash.getParam('lat', 0)), lng: Number(hash.getParam('lng', 0))},
        mapTypeId: 'roadmap'
    });

    var myoverlay = new google.maps.OverlayView();
    myoverlay.draw = function () {
        console.log('draw');
        this.getPanes().markerLayer.id='markerLayer';
    };
    myoverlay.setMap(map);

    var socket = io();

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

    map.addListener('center_changed', () => updateMap(map));
    map.addListener('zoom_changed', () => updateMap(map));

    //setInterval(hit, 100);

}

function updateMap (map) {

    let data = {
        zoom: map.getZoom(),
        lat: map.getCenter().lat(),
        lng: map.getCenter().lng()
    };
    console.log(data);
    hash.setParams(data);
}

function getCircle(magnitude) {
    return {
        size: new google.maps.Size(100, 60),
        scaledSize: new google.maps.Size(70, 60),
        url: 'images/icon.svg'
    };
}