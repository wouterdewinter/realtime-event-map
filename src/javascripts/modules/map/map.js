export function addMarker (map, position) {
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