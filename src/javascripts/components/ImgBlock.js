import React from 'react';
import h from 'react-hyperscript';
import text from '../text';

export default class extends React.Component {
    render() {
        return (
            h('pre', {
                className: 'rtm-code'
            }, this.props.children)
        )
    }
}