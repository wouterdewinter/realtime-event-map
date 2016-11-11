import React from 'react';
import h from 'react-hyperscript';
import text from '../text';
import Close from './Close';
import CodeBlock from './CodeBlock';

export default class extends React.Component {
    render() {
        let imgUrl = location.protocol + '//' + location.host + '/img?id=' + this.props.mapId;
        let hitUrl = location.protocol + '//' + location.host + '/hit?id=' + this.props.mapId;
        let img = `<img src="${imgUrl}" alt="rtm" width="1" height="1" />`;
        let js = `function rem_hit() {
   var xhttp = new XMLHttpRequest();
   xhttp.open("GET", "${hitUrl}", true);
   xhttp.send();
}
rem_hit();`;

        console.log(js);
        return (
            h(
                'div', {
                    className: 'rem-panel'
                },
                [
                    h(Close, {onClick: this.props.onClose}),
                    h('h1', text.usageTitle),
                    h('p', text.usageBody),
                    h(CodeBlock, {title: "Image"}, img),
                    h('p', text.usageJs),
                    h(CodeBlock, {title: "Javascript XHR request"}, js)
                ]
            )
        );
    }
}