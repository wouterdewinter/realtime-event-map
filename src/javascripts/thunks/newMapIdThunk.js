export default (dispatch, getState, {socket}) => {
    console.log('Requesting new map id');
    socket.emit('new');
}