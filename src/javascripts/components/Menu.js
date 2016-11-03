import React from 'react';
import h from 'react-hyperscript';
import text from '../text';

export default class extends React.Component {
    render() {
        return (
            h('i', {
                className: 'rtm-menu fa fa-bars'
            })
        )
    }
}