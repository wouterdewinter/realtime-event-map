import React from 'react';
import h from 'react-hyperscript';
import text from '../text';
import Menu from './Menu';
import Home from './Home';
import Usage from './Usage';

class Ui extends React.Component {

    //componentWillUpdate(nextProps, nextState) {
    //    this.props.onStateChange(nextState);
    //}

    render() {
        let infoPanel = null;

        if (this.props.showInfo && this.props.mapId === 'demo') {
            infoPanel = h(Home, {onClose: this.props.infoClose, onCreateMap: this.createMap.bind(this)});
        } else if (this.props.showInfo) {
            infoPanel = h(Usage, {
                onClose: this.props.infoClose,
                onCreateMap: this.createMap.bind(this),
                mapId: this.props.mapId
            });
        }

        return (
            h('div', [
                h(Menu, {onClick: this.props.toggleMenu}),
                infoPanel
            ])
        );
    }

    createMap() {
        let mapId = Math.random().toString(36).substring(7);
        this.props.updateMapId(mapId);
        //this.props.onMapIdChange(mapId);
    }
}

export default Ui;