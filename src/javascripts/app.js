import io from 'socket.io-client';
import hash from 'modules/hash';
import React from 'react';
import ReactDOM from 'react-dom';
import h from 'react-hyperscript';
import { Provider } from 'react-redux'
import { createStore, applyMiddleware } from 'redux'
import thunkMiddleware from 'redux-thunk'
import { addMarker } from './modules/map/map'
import reducer from './reducers/index'
import App from './components/App';
import joinMapIdThunk from './thunks/joinMapIdThunk';

// Create socket (defaults to current hostname and port)
var socket = io();

// Create redux store with thunks and redux dev tools enabled
let store = createStore(
    reducer,
    window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__(),
    applyMiddleware(thunkMiddleware.withExtraArgument({socket}))
);

// Push state changes to url hash
store.subscribe((state) => {
    hash.updateParams(store.getState());
});

// Initialise redux state from hash
const initStateFromHash = () => {
    let state = {
        mapId: hash.getParam('mapId', 'demo'),
        showInfo: hash.getParam('showInfo', 'true') === 'true',
        zoom: Number(hash.getParam('zoom', 2)),
        lat: Number(hash.getParam('lat', 0)),
        lng: Number(hash.getParam('lng', 0))
    };
    store.dispatch({type: 'INIT_STATE', state});
};

initStateFromHash();

// Update state also on hash changes
window.onhashchange = initStateFromHash;

// Join current map id
store.dispatch(joinMapIdThunk);

// Callback for when google map is available
const onMapReady = (map) => {
    // Add a marker on the hit event
    socket.on('hit', function (data) {
        addMarker(map, data);
    });
};

// Render the UI
ReactDOM.render(
    h(Provider, {store}, [h(App, {onMapReady})]),
    document.getElementById('ui')
);