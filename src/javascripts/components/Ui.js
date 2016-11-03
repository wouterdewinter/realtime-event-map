import React from 'react';
import h from 'react-hyperscript';
import text from '../text';
import Menu from './Menu';
import Home from './Home';

class Ui extends React.Component {
    render() {
        return (
            h('div', [
                h(Menu),
                h(Home)
            ])
        );
    }
}

export default Ui;