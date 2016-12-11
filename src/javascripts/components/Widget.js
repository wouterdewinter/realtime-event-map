import React from 'react';
import h from 'react-hyperscript';

export default class extends React.Component {
    render() {
        return (
            h('div', {className: 'rem-total'}, this.props.total)
        )
    }
}