import React from 'react';
import h from 'react-hyperscript';
import text from '../text';
import Menu from './Menu';
import Home from './Home';

class Ui extends React.Component {

    constructor(props) {
        super(props);
        this.state = {showMenu: true};
    }

    render() {
        return (
            h('div', [
                h(Menu, {onClick: this.onMenuClick.bind(this)}),
                this.state.showMenu ? h(Home, {onClose: this.onClose.bind(this)}) : null
            ])
        );
    }

    onClose() {
        console.log('closing');
        this.setState({showMenu: false})
    }

    onMenuClick() {
        this.setState({showMenu: true})
    }
}

export default Ui;