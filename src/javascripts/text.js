export default {
    homeTitle: 'Realtime Event Map (REM)',
    homeIntro: `
This application shows a visually attactive and minimalistic realtime map of events with virtually no delay (just a few ms). This is ideal to display location based events, such as pageviews, on a dashboard. It helps user to get a quick feeling of the scale of what is happing and where. This is much more difficult to grasp just looking at raw numbers.

The location is obtained by translating the visitor IP to a geographical coordinates. You can customize the color and the two or three letters (TLA) in the event animations.

Your watching a demo simulation right now but this application is set-up for multi-tenancy. By clicking on the "Create map" button below a unique map ID is created. You can then connect your own application or website to it and view the events using the customized link. The link is secured with a key/hash so the map url cannot be guessed based on the map id.
    `,
    homeFooter: `This project is open source, view it on [GitHub](https://github.com/wouterdewinter/realtime-event-map)`,
    createBtn: 'Create map',
    usageTitle: 'Congratulations',
    usageBody: 'Your Realtime Event Map is ready! Now connect it to your website. You can either do this using a tracking image or a direct javascript call. The image method is the easiest to implement. See the [GitHub documentation](https://github.com/wouterdewinter/realtime-event-map) for more details on customizing colors and text in the event animations.',
    usageJs: 'When you want to measure dynamic events, such as async loading of pages, use the js code below:'
}