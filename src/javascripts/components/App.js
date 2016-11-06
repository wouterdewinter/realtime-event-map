import { connect } from 'react-redux'
import Ui from './Ui';
import joinMapIdThunk from '../thunks/joinMapIdThunk';

const mapStateToProps = (state) => {
    return state
};

const mapDispatchToProps = (dispatch) => {
    return {
        toggleMenu: () => {
            dispatch({type: 'TOGGLE_MENU'});
        },
        infoClose: () => {
            dispatch({type: 'INFO_CLOSE'});
        },
        updateMapId: (mapId) => {
            dispatch({type: 'UPDATE_MAP_ID', mapId});
            dispatch(joinMapIdThunk);
        },
        onMapChange: (data) => {
            dispatch({type: 'UPDATE_MAP_DATA', ...data})
        },
        onUpdateMapComplete: () => {
            dispatch({type: 'UPDATE_MAP_COMPLETE'})
        }
    }
};

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(Ui);