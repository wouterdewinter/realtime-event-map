export default (state = {}, action) => {
    switch (action.type) {
        case 'INIT_STATE':
            return {
                ...state,
                ...action.state
            };
        case 'INFO_CLOSE':
            return {
                ...state,
                showInfo: false
            };
        case 'TOGGLE_MENU':
            return {
                ...state,
                showInfo: !state.showInfo
            };
        case 'UPDATE_MAP_ID':
            return {
                ...state,
                mapId: action.mapId,
                showInfo: true // Always show info screen so user can see new code and links
            };
        default:
            return state
    }
}