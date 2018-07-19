
//Module Network Chart
//Creates a network chart for the provided data along with click events using Highcharts SVG Renderer.
//Dependency: Highcharts v5.0.0 or above
//Author: Samuel Lawrentz
//18-07-2918

function NetworkChart(userOptions) {
    this.data = userOptions.data;

    //Array to store selected points
    this.selectedPoints = [];

    //Create highchart canvas with minimal options
    this.init = function () {
        var self = this;
        Highcharts.chart('container', {
            chart: {
                events: {
                    load: function () {
                        //Private method to draw the chart
                        drawChart.call(this, self);
                    }
                }
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
        }

    }

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

        //Styling
        var bubbleStyle = {
            fill: '#9cc1e1',
            stroke: 'white',
            'stroke-width': 3,
            zIndex: 3
        };

        var lineStyle = {
            stroke: '#d1e4f1',
            'stroke-width': 20,
            zIndex: 0
        }

        //Common array that will contain point details
        var points = [];

        //Function to render points
        var renderPoints = function () {

            //Render the center bubble
            var circle = renderer.circle(centerX, centerY, 50).attr({
                fill: '#5ba2dc',
                stroke: 'white',
                'stroke-width': 2,
                zIndex: 3
            })
                .add();

            //Render bubble for each data point    
            data.forEach(element => {
                var length = networkChart.utils.getRandomArbitrary(100, 250);
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
                    .attr({
                        zIndex: 10
                    })
                    .css({
                        color: '#8babc7'
                    })
                    .add();
            });
        }


        //Render bubbles for the provided radius and distance from center
        var renderBubbles = function (length, radius, element) {
            var group = renderer.g('group').add();
            var x = centerX + length * Math.cos(angle);
            var y = centerY + length * Math.sin(angle);

            //Draw the circle
            var circle = renderer.circle(x, y, radius).attr(bubbleStyle)
                .css({cursor:'pointer'})
                .add(group);

            //Draw the connecting line
            var path = renderer.path(['M', centerX, centerY, 'L', x, y])
                .attr(lineStyle)
                .add(group);

            angle += angleDifference;

            //Populate the points array with point details.
            points.push({
                circle: circle,
                group: group,
                name: element,
                tick: '',
                selected: false
            });
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
                        point.circle.attr('fill', '#5ba2dc');
                        networkChart.selectedPoints.push(point.name);
                    }
                    else {
                        point.tick.hide();
                        point.circle.attr('fill', '#9cc1e1');
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

//Creating a new chart consuming the NetworkChart
var netChart = new NetworkChart({
    data: ['Software Developer', 'Java Developer', 'Data Scientist', 'Team lead', 'Senior Developer',
        'Software Engineer', 'Database Engineer', 'System Admin', 'Team lead', 'Senior Developer']
});