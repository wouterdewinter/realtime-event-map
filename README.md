# World Traffic Map
This application shows pageviews of your website on the map with virtually no delay (just a few ms). It does so by translating the visitor IP to a geographical coordinates. It's created with a minimalistic design for usage on dashboards.

## Demo
This is actually all you need, you can create a free map here and use it on your website. View it on:

https://rtm-92767.onmodulus.net/

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
* Nodejs installed

## Install
Clone the repository with:

    git clone https://github.com/wouterdewinter/world-traffic-map wtm

Install the NPM packages

    npm install
      
Run the application in development mode. This will build the application using Gulp and uses browsersync to send code updates to the browser. NodeJs is also automatically restarted when code has changed.

    npm run development
