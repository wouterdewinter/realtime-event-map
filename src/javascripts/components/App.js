import { connect } from 'react-redux'
import Ui from './Ui';

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
        }
    }
};

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(Ui);