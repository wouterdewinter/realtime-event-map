export default (dispatch, getState, {socket}) => {
    let mapId = getState().mapId;
    let key = getState().key;
    console.log('Joining ' + mapId);
    socket.emit('join', {mapId, key});
}