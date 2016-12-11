import d3Chart from '../modules/d3Chart';
import h from 'react-hyperscript';
import React from 'react';

export default React.createClass({
    propTypes: {
        data: React.PropTypes.array,
        domain: React.PropTypes.object
    },

    componentDidMount: function() {
        var el = this.refs.domNode;
        d3Chart.create(el, {
            width: '100%',
            height: '300px'
        }, this.getChartState());
    },

    componentDidUpdate: function() {
        var el = this.refs.domNode;
        d3Chart.update(el, this.getChartState());
    },

    getChartState: function() {
        return {
            data: this.props.data,
            domain: this.props.domain
        };
    },

    componentWillUnmount: function() {
        var el = this.refs.domNode;
        d3Chart.destroy(el);
    },

    render: function() {
        return (
            h('div', {className: 'rem-chart', ref: 'domNode'})
        );
    }
});