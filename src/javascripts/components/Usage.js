import React from 'react';
import h from 'react-hyperscript';
import text from '../text';
import Close from './Close';
import CodeBlock from './CodeBlock';

export default class extends React.Component {
    render() {
        let url = location.protocol + '//' + location.host + '/hit?id=' + this.props.mapId;
        let img = '<img src="'+url+'" alt="rtm" />';

        return (
            h(
                'div', {
                    className: 'rtm-panel'
                },
                [
                    h(Close, {onClick: this.props.onClose}),
                    h('h1', text.usageTitle),
                    h('p', text.usageBody),
                    h(CodeBlock, img)
                ]
            )
        );
    }
}