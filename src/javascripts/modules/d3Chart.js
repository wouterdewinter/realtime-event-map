// d3Chart.js
import * as d3 from 'd3';

var d3Chart = {};

d3Chart.create = function(el, props, state) {
    var svg = d3.select(el).append('svg')
        .attr('class', 'd3')
        .attr('width', props.width)
        .attr('height', props.height);

    svg.append('g')
        .attr('class', 'd3-points');

    var gradient = svg.append("defs")
        .append("linearGradient")
        .attr("id", "gradient")
        .attr("x1", "0%")
        .attr("y1", "50%")
        .attr("x2", "100%")
        .attr("y2", "50%")
        .attr("spreadMethod", "pad");

    gradient.append("stop")
        .attr("offset", "0%")
        .attr("stop-color", "#fff")
        .attr("stop-opacity", 0);

    gradient.append("stop")
        .attr("offset", "100%")
        .attr("stop-color", "#fff")
        .attr("stop-opacity", 1);

    svg.append("svg:path")
        .attr("stroke", "url(#gradient)")
        .attr("stroke-width", 2)
        .attr('class', 'd3-line')

    svg.append("svg:path")
        .attr("fill", "#fff")
        .attr('class', 'd3-area')
        .attr('fill-opacity', '0.1');

    this.update(el, state);
};

d3Chart.update = function(el, state) {
    // Re-compute the scales, and render the data points
    var scales = this._scales(el, state.domain);
    this._drawPoints(el, scales, state.data);
};

d3Chart.destroy = function(el) {
    // Any clean-up would go here
    // in this example there is nothing to do
};

d3Chart.lineFunc = (scales) => {
    return d3.area()
        .x(function (d, i) {
            return scales.x(i);
        })
        .y(function (d) {
            return scales.y(d);
        })
        .curve(d3.curveBasis);
};


d3Chart.areaFunc = (scales) => {
    return d3.area()
        .x(function (d, i) {
            return scales.x(i);
        })
        .y1(function (d) {
            return scales.y(d);
        })
        .y0(200)
        .curve(d3.curveBasis);
};

d3Chart._drawPoints = function(el, scales, data) {
    var g = d3.select(el).selectAll('.d3-line');
    g.attr("d", d3Chart.lineFunc(scales)(data));

    var g = d3.select(el).selectAll('.d3-area');
    g.attr("d", d3Chart.areaFunc(scales)(data));
};


d3Chart._scales = function(el, domain) {
    if (!domain) {
        return null;
    }

    var width = el.offsetWidth;
    var height = el.offsetHeight;

    var x = d3.scaleLinear()
        .range([0, width])
        .domain(domain.x);

    var y = d3.scaleLinear()
        .range([height, 0])
        .domain(domain.y);

    return {x: x, y: y};
};

export default d3Chart;