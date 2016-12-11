import React from 'react';
import h from 'react-hyperscript';
import text from '../text';
import Menu from './Menu';
import Map from './Map';
import Home from './Home';
import Usage from './Usage';
import Widget from './Widget';
import Chart from './Chart';

class Ui extends React.Component {
    render() {
        let infoPanel = null;

        var sampleData = [
            {id: '5fbmzmtc', x: 7, y: 41, z: 6},
            {id: 's4f8phwm', x: 11, y: 65, z: 9},
            {id: 'dsada', x: 22, y: 12, z: 4},
            {id: 'dads', x: 5, y: 74, z: 9},
            {id: 'adasda', x: 2, y: 12, z: 9}
        ];

        var domain = {x: [0, 30], y: [0, 100]};

        if (this.props.showInfo && this.props.mapId === 'demo') {
            infoPanel = h(Home, {
                onClose: this.props.infoClose,
                onCreateMap: this.props.newMapId
            });
        } else if (this.props.showInfo) {
            infoPanel = h(Usage, {
                onClose: this.props.infoClose,
                mapId: this.props.mapId
            });
        }

        return (
            h('div', [
                h(Map, {
                    onMapReady: this.props.onMapReady,
                    onMapChange: this.props.onMapChange,
                    mapUpdateNeeded: this.props.mapUpdateNeeded,
                    onUpdateMapComplete: this.props.onUpdateMapComplete,
                    lng: this.props.lng,
                    lat: this.props.lat,
                    zoom: this.props.zoom
                }),
                h(Menu, {onClick: this.props.toggleMenu}),
                h(Widget, {total: this.props.total}),
                h(Chart, {data: sampleData, domain: domain}),
                infoPanel
            ])
        );
    }
}

export default Ui;