import React from 'react';
import h from 'react-hyperscript';
import text from '../text';
import Close from './Close';

export default class extends React.Component {
    render() {
        return (
            h(
                'div', {
                    className: 'rtm-panel'
                },
                [
                    h(Close, {onClick: this.props.onClose}),
                    h('h1', text.title),
                    h('p', text.intro),
                    h('button', {
                        className: 'rtm-button',
                        onclick: () => {
                            alert('lala')
                        }}, text.createBtn)
                ]
            )
        );
    }
}