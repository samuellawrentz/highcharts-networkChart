function drawChart(options) {
    var chart = this;
    var renderer = chart.renderer;
    var centerX = chart.chartWidth / 2 + chart.plotLeft;
    var centerY = chart.chartHeight / 2;
    var angleDifference = (360 / options.length) * (Math.PI/180);
    var angle = 0;
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

    var points = [];


    var getRandomArbitrary = function (min, max) {
        return Math.random() * (max - min) + min;
    }

    var renderPoints = function () {
        var circle = renderer.circle(centerX, centerY, 50).attr({
            fill: '#5ba2dc',
            stroke: 'white',
            'stroke-width': 2,
            zIndex: 3
        })
            .add();

        options.forEach(element => {
            var length = getRandomArbitrary(100, 250);
            var radius = getRandomArbitrary(20, 40);
            renderBubbles(length, radius, element);
        });
    }

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
            .add(group);
        });
    }



    var renderBubbles = function (length, radius, element) {
        var group = renderer.g('group').add();
        var x = centerX + length * Math.cos(angle);
        var y = centerY + length * Math.sin(angle);
        var circle = renderer.circle(x, y, radius).attr(bubbleStyle)
            .add(group);

        var path = renderer.path(['M', centerX, centerY, 'L', x, y])
            .attr(lineStyle)
            .add(group);

        angle += angleDifference;

        points.push({
            circle: circle,
            path: path,
            group: group,
            name: element
        });
    }

    renderPoints();
    renderLabels();

}




function NetworkChart(settings) {
    this.data = settings.data;
}

NetworkChart.prototype.draw = function () {
    var self = this;
    Highcharts.chart('container', {
        chart: {
            backgroundColor: 'white',
            events: {
                load: function () {
                    drawChart.call(this, self.data);
                }
            }
        },
        title: false
    });
}

var netChart = new NetworkChart({
    data: ['Software Developer', 'Java Developer', 'Data Scientist', , 'Team lead', 'Senior Developer',
        'Software Engineer', 'Database Engineer', 'System Admin', 'Team lead', 'Senior Developer']
});

netChart.draw();
