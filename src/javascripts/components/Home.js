import React from 'react';
import h from 'react-hyperscript';
import text from '../text';
import Close from './Close';

export default class extends React.Component {
    render() {
        return (
            h(
                'div', {
                    className: 'rem-panel'
                },
                [
                    h(Close, {onClick: this.props.onClose}),
                    h('h1', text.title),
                    h('p', text.intro),
                    h('button', {
                        className: 'rem-button',
                        onClick: this.props.onCreateMap
                    }, text.createBtn)
                ]
            )
        );
    }
}