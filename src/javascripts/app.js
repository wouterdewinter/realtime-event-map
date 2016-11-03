import io from 'socket.io-client';
import hash from 'modules/hash';
import React from 'react';
import ReactDOM from 'react-dom';
import Ui from './components/Ui';
import h from 'react-hyperscript';
import * as map from './modules/map/map'

window.initMap = map.initMap;

var mapId = hash.getParam('mapId', 'demo');

var socket = io();

socket.on('hit', function (data) {
    map.addMarker(data);
});

const onMapIdChange = (mapId) => {
    console.log('Joining ' + mapId);
    socket.emit('join', {mapId});
    hash.setParam('mapId', mapId)
};

// Join initial mapId
onMapIdChange(mapId);

ReactDOM.render(h(Ui, {
    mapId,
    onMapIdChange
}), document.getElementById('ui'));
