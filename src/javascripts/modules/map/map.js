export function addMarker (map, lat, lng, tla = 'Hem', color = '#0a0') {

    var svg = `
        <svg width="80" height="80" xmlns="http://www.w3.org/2000/svg">
            <g>
                <ellipse ry="35" rx="35" id="svg_1" cy="40" cx="40" stroke-width="1" stroke="#fff " fill="${color}"/>
                <text text-anchor="middle" alignment-baseline="central" fill="#fff" x="40" y="40" font-size="20" font-weight="bold" font-family="Verdana">${tla}</text>
            </g>
        </svg>
    `;

    var marker = new google.maps.Marker({
        position: {lat, lng},
        map,
        icon: {
            size: new google.maps.Size(80, 80),
            anchor: new google.maps.Point(40, 40),
            url: 'data:image/svg+xml;charset=UTF-8,' + encodeURIComponent(svg)
        },
        optimized: false
    });

    // Remove marker after a while
    setTimeout(() => {
        marker.setMap(null);
    }, 5000)
}