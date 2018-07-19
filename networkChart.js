//Module Network Chart
//Creates a network chart for the provided data along with click events using Highcharts SVG Renderer.
//Dependency: Highcharts v5.0.0 or above
//Author: Samuel Lawrentz
//18-07-2918

window.customCharts = (function (H) {
    if (H === undefined || H === null) {
        console.log('Highcharts not defined');
        return false;
    }
    else {
        return {
            NetworkChart : function(chartOptions) {
                this.idSelector = chartOptions.selector || '';
                this.data = chartOptions.data || [];
    
                //Array to store selected points
                this.selectedPoints = [];
    
                this.themeColor = chartOptions.themeColor || '#5ba2dc';
    
                //Create highchart canvas with minimal options
                this.init = function () {
                    var self = this;
                    H.chart(self.idSelector, {
                        chart: {
                            events: {
                                load: function () {
                                    //Private method to draw the chart
                                    drawChart.call(this, self);
                                }
                            },
                            backgroundColor: self.backgroundColor
                        },
                        title: false
                    });
                }
    
                //Helper methods
                this.utils = {
                    //Remove value from array
                    remove: function (array, value) {
                        var index = array.indexOf(value);
                        if (index > -1) {
                            array.splice(index, 1);
                        }
                    },
    
                    //Util method to get random values between two values
                    getRandomArbitrary: function (min, max) {
                        return Math.random() * (max - min) + min;
                    },
    
                    //Lighten or darken given color
                    //Percent parameter range from -1.0 to 1.0
                    //https://stackoverflow.com/a/13542669/8252164
                    shadeColor: function (color, percent) {
                        var f = parseInt(color.slice(1), 16), t = percent < 0 ? 0 : 255, p = percent < 0 ? percent * -1 : percent, R = f >> 16, G = f >> 8 & 0x00FF, B = f & 0x0000FF;
                        return "#" + (0x1000000 + (Math.round((t - R) * p) + R) * 0x10000 + (Math.round((t - G) * p) + G) * 0x100 + (Math.round((t - B) * p) + B)).toString(16).slice(1);
                    },
    
                    isBetween: function (angle) {
                        var angle90 = 90 * (Math.PI / 180);
                        var angle270 = 270 * (Math.PI / 180);
                        return angle >= angle90 && angle <= angle270;
                    }
    
                }
    
                this.backgroundColor = this.utils.shadeColor(this.themeColor, 0.93);
    
                //Private method to draw the network chart.
                //Not accessible by instances of 'NetworkChart'
                var drawChart = function (networkChart) {
                    var data = networkChart.data;
    
                    //Highcharts chart canvas
                    var chart = this;
    
                    //Highcharts SVG renderer
                    var renderer = chart.renderer;
    
                    //Chart centers
                    var centerX = chart.chartWidth / 2 + chart.plotLeft;
                    var centerY = chart.chartHeight / 2;
    
                    //Start angle and angle difference based on number of points
                    var angleDifference = (360 / data.length) * (Math.PI / 180);
                    var angle = 90 * (Math.PI / 180);
    
                    var bubbleColor = networkChart.utils.shadeColor(networkChart.themeColor, 0.4);
    
                    //Styling
                    var bubbleStyle = {
                        fill: bubbleColor,
                        stroke: networkChart.backgroundColor,
                        'stroke-width': 3,
                        zIndex: 3
                    };
    
                    var lineStyle = {
                        stroke: networkChart.utils.shadeColor(networkChart.themeColor, 0.7),
                        'stroke-width': 20,
                        zIndex: 0
                    }
    
                    //Common array that will contain point details
                    var points = [];
    
                    //Function to render points
                    var renderPoints = function () {
    
                        //Render the center bubble
                        var circle = renderer.circle(centerX, centerY, 50).attr({
                            fill: networkChart.themeColor,
                            stroke: 'white',
                            'stroke-width': 2,
                            zIndex: 3
                        })
                            .add();
    
                        //Render bubble for each data point    
                        data.forEach(element => {
                            var length = networkChart.utils.getRandomArbitrary(100, chart.chartHeight/2 - 50);
                            var radius = networkChart.utils.getRandomArbitrary(20, 40);
                            renderBubbles(length, radius, element);
                        });
                    }
    
                    //Renders dataLabels
                    var renderLabels = function () {
                        points.forEach(point => {
                            var circle = point.circle;
                            var group = point.group;
                            var text = point.name;
                            var circleBBox = circle.getBBox();
                            var labelX = circleBBox.x + circleBBox.width + 10;
                            var labelY = circleBBox.y + circleBBox.height / 2;
    
                            var label = renderer.text(text, labelX, labelY)
                                .attr({ zIndex: 10 })
                                .css({ color: networkChart.themeColor })
                                .add();
    
                            if (networkChart.utils.isBetween(point.angle)) {
                                var labelBBox = label.getBBox();
                                labelX = circleBBox.x - labelBBox.width - 5;
                                label.attr({ x: labelX });
                            }
                        });
                    }
    
                    //Render bubbles for the provided radius and distance from center
                    var renderBubbles = function (length, radius, element) {
                        var group = renderer.g('group').add();
                        var x = centerX + length * Math.cos(angle);
                        var y = centerY + length * Math.sin(angle);
    
                        //Draw the circle
                        var circle = renderer.circle(x, y, radius).attr(bubbleStyle)
                            .css({ cursor: 'pointer' })
                            .add(group);
    
                        //Draw the connecting line
                        var path = renderer.path(['M', centerX, centerY, 'L', x, y])
                            .attr(lineStyle)
                            .add(group);
    
                        //Populate the points array with point details.
                        points.push({
                            circle: circle,
                            group: group,
                            name: element,
                            tick: '',
                            angle: angle,
                            selected: false
                        });
    
                        angle += angleDifference;
                    }
    
                    //Attach event handlers for the bubble
                    var attachEvents = function () {
                        points.forEach(point => {
                            point.circle.on('click', function () {
                                if (!point.tick) {
                                    var circleBBox = point.circle.getBBox();
                                    var x = circleBBox.x + circleBBox.width / 2.5;
                                    var y = circleBBox.y + circleBBox.height / 1.5;
                                    var shortTickLength = circleBBox.width / 4 - 6;
    
                                    //SVG checkmark
                                    var tick = renderer.path(['M', x, y, 'l', -shortTickLength, -shortTickLength, 'M', x, y, 'l', shortTickLength * 2, -shortTickLength * 2])
                                        .attr({
                                            stroke: 'white',
                                            'stroke-width': 2,
                                            zIndex: 14
                                        })
                                        .add().hide();
    
                                    point.tick = tick;
                                }
                                point.selected = !point.selected;
    
                                if (point.selected) {
                                    point.tick.show();
                                    point.circle.attr('fill', networkChart.themeColor);
                                    networkChart.selectedPoints.push(point.name);
                                }
                                else {
                                    point.tick.hide();
                                    point.circle.attr('fill', bubbleColor);
                                    networkChart.utils.remove(networkChart.selectedPoints, point.name);
                                }
    
                            });
                        });
                    }
    
                    //Fire up all the required events
                    renderPoints();
                    renderLabels();
                    attachEvents();
                }
    
                //Initialte rendereing
                this.init();
            }
        }
    }
})(Highcharts);
