import io from 'socket.io-client';
import hash from 'modules/hash';
import theme from './theme-dark';

var map;

export function initMap () {
    map = new google.maps.Map(document.getElementById('map'), {
        zoom: Number(hash.getParam('zoom', 2)),
        center: {lat: Number(hash.getParam('lat', 0)), lng: Number(hash.getParam('lng', 0))},
        mapTypeControlOptions: {
            mapTypeIds: ['roadmap', 'satellite', 'hybrid', 'terrain', 'dark']
        },
        streetViewControl: false
    });

    //Associate the styled map with the MapTypeId and set it to display.
    map.mapTypes.set('dark', new google.maps.StyledMapType(theme, {name: 'Dark'}));
    map.setMapTypeId('dark');

    var myoverlay = new google.maps.OverlayView();
    myoverlay.draw = function () {
        console.log('draw');
        this.getPanes().markerLayer.id='markerLayer';
    };
    myoverlay.setMap(map);

    map.addListener('center_changed', () => updateMap(map));
    map.addListener('zoom_changed', () => updateMap(map));
}

export function addMarker (position) {
    var marker = new google.maps.Marker({
        position,
        map,
        icon: {
            size: new google.maps.Size(80, 80),
            anchor: new google.maps.Point(40, 40),
            url: 'images/icon.svg'
        },
        optimized: false
    });

    // Remove marker after a while
    setTimeout(() => {
        marker.setMap(null);
    }, 5000)
}

function updateMap (map) {

    let data = {
        zoom: map.getZoom(),
        lat: map.getCenter().lat(),
        lng: map.getCenter().lng()
    };
    hash.updateParams(data);
}