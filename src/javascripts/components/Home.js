import React from 'react';
import h from 'react-hyperscript';
import text from '../text';
import Close from './Close';
import ReactMarkdown from 'react-markdown';

export default class extends React.Component {
    render() {
        return (
            h(
                'div', {
                    className: 'rem-panel'
                },
                [
                    h(Close, {onClick: this.props.onClose}),
                    h('h1', text.homeTitle),
                    h(ReactMarkdown, {source: text.homeIntro, escapeHtml: true}),
                    h('button', {
                        className: 'rem-button',
                        onClick: this.props.onCreateMap
                    }, text.createBtn),
                    h(ReactMarkdown, {source: text.homeFooter, escapeHtml: true})
                ]
            )
        );
    }
}