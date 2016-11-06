export default (state = {mapUpdateNeeded: false}, action) => {
    switch (action.type) {
        case 'INIT_STATE':
            return {
                ...state,
                ...action.state
            };
        case 'UPDATE_STATE':
            return {
                ...state,
                ...action.state,
                mapUpdateNeeded: true // Map update needed if map state is not initiated by map itself
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
        case 'NEW_MAP':
            return {
                ...state,
                mapId: action.mapId,
                key: action.key,
                showInfo: true // Always show info screen so user can see new code and links
            };
        case 'UPDATE_MAP_DATA':
            return {
                ...state,
                zoom: action.zoom,
                lat: action.lat,
                lng: action.lng
            };
        case 'UPDATE_MAP_COMPLETE':
            return {
                ...state,
                mapUpdateNeeded: false
            };
        default:
            return state
    }
}