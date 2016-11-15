var positions = []; // Buffer for positions
const bufferSize = 100; // Number of positions to keep in buffer
const centerInterval = 60000; // Update every number of ms

// Init with the map and set interval for recentering the map
export function init (map) {
    setInterval(() => {
        if (positions.length === bufferSize) {
            let bounds = positions.reduce((bounds, pos) => {
                return bounds.extend(pos);
            }, new google.maps.LatLngBounds());

            map.fitBounds(bounds);
            map.panToBounds(bounds);
        }
    }, centerInterval);
}

// Add a new position to the buffer
export function addPosition (lat, lng) {
    let loc = new google.maps.LatLng(lat, lng);
    positions.push(loc);
    if (positions.length > bufferSize) {
        positions.shift();
    }
}