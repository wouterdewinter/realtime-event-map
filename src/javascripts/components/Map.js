import React from 'react';
import h from 'react-hyperscript';
import theme from 'modules/map/theme-dark';

export default class extends React.Component {
    componentDidMount() {
        this.initMap();
    }

    render() {
        let style = {
            height: "100%",
            width: "100%",
            position: "absolute"
        };

        return (
            h('div', {ref: c => this.mapNode = c, style})
        );
    }

    initMap () {
        this.map = new google.maps.Map(this.mapNode, {
            zoom: this.props.zoom,
            center: {lat: this.props.lat, lng: this.props.lng},
            mapTypeControlOptions: {
                mapTypeIds: ['roadmap', 'satellite', 'hybrid', 'terrain', 'dark']
            },
            streetViewControl: false
        });

        //Associate the styled map with the MapTypeId and set it to display.
        this.map.mapTypes.set('dark', new google.maps.StyledMapType(theme, {name: 'Dark'}));
        this.map.setMapTypeId('dark');

        var myoverlay = new google.maps.OverlayView();
        myoverlay.draw = function () {
            this.getPanes().markerLayer.id='markerLayer';
        };
        myoverlay.setMap(this.map);

        this.map.addListener('center_changed', () => this.updateMap());
        this.map.addListener('zoom_changed', () => this.updateMap());

        this.props.onMapReady(this.map);
    }

    updateMap () {
        let data = {
            zoom: this.map.getZoom(),
            lat: this.map.getCenter().lat(),
            lng: this.map.getCenter().lng()
        };
        this.props.onMapChange(data);
    }
}