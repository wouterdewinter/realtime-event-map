import React from 'react';
import h from 'react-hyperscript';
import text from '../text';
import Menu from './Menu';
import Home from './Home';
import Usage from './Usage';

class Ui extends React.Component {

    constructor(props) {
        super(props);
        this.state = props.initialState;
    }

    componentWillUpdate(nextProps, nextState) {
        this.props.onStateChange(nextState);
    }

    render() {
        let infoPanel = null;

        if (this.state.showInfo && this.state.mapId === 'demo') {
            infoPanel = h(Home, {onClose: this.onClose.bind(this), onCreateMap: this.createMap.bind(this)});
        } else if (this.state.showInfo) {
            infoPanel = h(Usage, {
                onClose: this.onClose.bind(this),
                onCreateMap: this.createMap.bind(this),
                mapId: this.state.mapId
            });
        }

        return (
            h('div', [
                h(Menu, {onClick: this.onMenuClick.bind(this)}),
                infoPanel
            ])
        );
    }

    createMap() {
        let mapId = Math.random().toString(36).substring(7);
        this.setState({mapId})
        this.props.onMapIdChange(mapId);
    }

    onClose() {
        console.log('closing');
        this.setState({showInfo: false})
    }

    onMenuClick() {
        this.setState({showInfo: true})
    }
}

export default Ui;