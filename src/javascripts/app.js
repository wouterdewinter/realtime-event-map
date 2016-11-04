import io from 'socket.io-client';
import hash from 'modules/hash';
import React from 'react';
import ReactDOM from 'react-dom';
import App from './components/App';
import h from 'react-hyperscript';
import * as map from './modules/map/map'

import { Provider } from 'react-redux'
import { createStore } from 'redux'
import reducer from './reducers'

let store = createStore(reducer, window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__());

window.initMap = map.initMap;

var socket = io();

socket.on('hit', function (data) {
    map.addMarker(data);
});

const onMapIdChange = mapId => {
    console.log('Joining ' + mapId);
    socket.emit('join', {mapId});
    hash.setParam('mapId', mapId);
};

var initialState = {
    mapId: hash.getParam('mapId', 'demo'),
    showInfo: hash.getParam('showInfo', 'true') === 'true'
};

store.dispatch({type: 'INIT_STATE', state: initialState});

// Join initial mapId
onMapIdChange(initialState.mapId);

const onStateChange = state => {
    hash.updateParams(state);
    console.log("state changed: ", state);
};

ReactDOM.render(
    h(
        Provider,
        {store},
        [
            h(App, {
                onMapIdChange,
                onStateChange,
                initialState
            })
        ]
    ),
    document.getElementById('ui')
);