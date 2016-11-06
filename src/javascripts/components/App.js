import { connect } from 'react-redux'
import Ui from './Ui';
import newMapIdThunk from '../thunks/newMapIdThunk';

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
        newMapId: () => {
            dispatch(newMapIdThunk);
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