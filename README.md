# Realtime Event Map (REM)
This application shows a visually attactive and minimalistic realtime map of events with virtually no delay (just a few ms). This is ideal to display location based events, such as pageviews, on a dashboard. It helps user to get a quick feeling of the scale of what is happing and where. This is much more difficult to grasp just looking at raw numbers.

The location is obtained by translating the visitor IP to a geographical coordinates. You can customize the color and the two or three letters (TLA) in the event circles.

The application is set-up for multi-tenancy. By clicking on the "Create map" button a unique map ID is created. You can then connect your own application or website to it and view the events using the customized link. The link is secured with a key/hash so the map url cannot be guessed based on the map id.

## Website / demo
Because the application is so efficient it doesn't need a lot of server resources. Therefore of this I can offer you a hosted version for free.
This is actually all you need, you can create your own map here and connect it on your website without any costs. View the demo on:

https://rtm-92767.onmodulus.net/

## Sending in events
There are a few ways to send in events:

### Tracking pixel
The easiest way is to use a tracking pixel, the format is:

    <img src="https://rtm-92767.onmodulus.net/img?id=[map_id]" alt="rtm" width="1" height="1" />

### Javascript
Alternatively you can use javascript to send in an event directly:

    function rem_hit() {
       var xhttp = new XMLHttpRequest();
       xhttp.open("GET", "https://rtm-92767.onmodulus.net/hit?id=[map_id]", true);
       xhttp.send();
    }
    rem_hit();
    
With all methods you will need to replace [map_id] with your own map id and if you host the application yourself the url of the application. (Use http://localhost:3000/ for development). There are also a few extra get options that you can append to the url.

parameter | description | default | example
--- | --- | --- | ---
color | The color of the circle, hexadecimal without # | f00 | ffaa00
tla | The two (or three) letter acronym to show inside the circle. The tla will limited to three characters and uppercased. Use the special value `_referer` to automatically use the HTTP referer as tla | `empty` | xx

An example with all parameters set:
    
    https://rtm-92767.onmodulus.net/img?id=[map_id]&color=ffaa00&tla=xx
    
## Technologies
The project uses the following technologies:

* Websockets (trough socket.io)
* NodeJs (as webserver)
* Maxmind GeoLite city
* React
* Redux
* Gulp
* Google Maps

## Prerequisites
To get started you need the following:

* Git installed
* Nodejs / npm installed

## Install
1. Clone the repository

        git clone https://github.com/wouterdewinter/realtime-event-map rem

2. Go the application path
        
        cd rem

2. Install the NPM packages

        npm install

2. Copy the config file in `config/config.default.js` to `config/config.js` and follow the instructions in the file to setup your own google maps id and a security salt

4. Run the application in development mode. This command will build the application using Gulp, opens the browser and uses browsersync to send code updates to the browser. NodeJs is also automatically restarted when code has changed.

        npm run dev