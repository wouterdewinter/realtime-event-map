export default (dispatch, getState, {socket}) => {
    let mapId = getState().mapId;
    console.log('Joining ' + mapId);
    socket.emit('join', {mapId});
}