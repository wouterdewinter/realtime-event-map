import io from 'socket.io-client';
import hash from 'modules/hash';
import React from 'react';
import ReactDOM from 'react-dom';
import Ui from './components/Ui.js';
import h from 'react-hyperscript';
import theme from './modules/map/theme-dark';

var map;

window.initMap = () => {

    map = new google.maps.Map(document.getElementById('map'), {
        zoom: Number(hash.getParam('zoom', 2)),
        center: {lat: Number(hash.getParam('lat', 0)), lng: Number(hash.getParam('lng', 0))},
        mapTypeControlOptions: {
            mapTypeIds: ['roadmap', 'satellite', 'hybrid', 'terrain', 'dark']
        },
        streetViewControl: false
    });

    //Associate the styled map with the MapTypeId and set it to display.
    map.mapTypes.set('dark', new google.maps.StyledMapType(theme, {name: 'Dark'}));
    map.setMapTypeId('dark');

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
            icon: getCircle(5),
            optimized: false
        });

        // Remove marker after a while
        setTimeout(() => {
            marker.setMap(null);
        }, 5000)
    });

    socket.emit('join', { id: hash.getParam('id', 0)});

    map.addListener('center_changed', () => updateMap(map));
    map.addListener('zoom_changed', () => updateMap(map));

};

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


ReactDOM.render(h(Ui), document.getElementById('ui'));