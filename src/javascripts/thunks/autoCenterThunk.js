export default (markerLat, markerLng) => (dispatch, getState) => {
    let state = getState();
    let lat = state.lat + ((markerLat - state.lat) / 1000);
    let lng = state.lng + ((markerLng - state.lng) / 1000);
    let zoom = state.zoom;
    dispatch({type: 'UPDATE_MAP_DATA', lat, lng, zoom});
}