import io from 'socket.io-client';
import hash from 'modules/hash';
import React from 'react';
import ReactDOM from 'react-dom';
import h from 'react-hyperscript';
import { Provider } from 'react-redux'
import { createStore, applyMiddleware } from 'redux'
import thunkMiddleware from 'redux-thunk'
import * as map from './modules/map/map'
import reducer from './reducers'
import App from './components/App';
import joinMapIdThunk from './thunks/joinMapIdThunk';

var socket = io();

// Add a marker on the hit event
socket.on('hit', function (data) {
    map.addMarker(data);
});

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

// Determine initial state based on url hash
var initialState = {
    mapId: hash.getParam('mapId', 'demo'),
    showInfo: hash.getParam('showInfo', 'true') === 'true'
};
store.dispatch({type: 'INIT_STATE', state: initialState});

// Join current map id
store.dispatch(joinMapIdThunk);

// Render the UI
ReactDOM.render(
    h(Provider, {store}, [h(App)]),
    document.getElementById('ui')
);

// Expose google maps callback as global
window.initMap = map.initMap;