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
            .css({
                color:'#8babc7'
            })
            .add();
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
            group: group,
            name: element,
            tick:'',
            selected: false
        });
    }

    var attachEvents = function() {        
        points.forEach(point => {
            point.circle.on('click', function(){
                if (!point.tick) {
                    var circleBBox = point.circle.getBBox();
                    var x = circleBBox.x + circleBBox.width/2.5;
                    var y = circleBBox.y + circleBBox.height/1.5;
                    var shortTickLength = circleBBox.width/4 - 6;
    
                    var tick = renderer.path(['M', x, y, 'l', -shortTickLength, -shortTickLength, 'M', x, y, 'l', shortTickLength*2, -shortTickLength*2])
                    .attr({
                        stroke: 'white',
                        'stroke-width': 2,
                        zIndex: 14
                    })
                    .add().hide();                    

                    point.tick = tick;
                }
                point.selected = !point.selected;

                if(point.selected){
                    point.tick.show();
                    point.circle.attr('fill','#5ba2dc');
                }
                else{                    
                point.tick.hide();
                point.circle.attr('fill','#9cc1e1');
                }

            });
        }); 
    }

    renderPoints();
    renderLabels();
    attachEvents();

}




function NetworkChart(settings) {
    this.data = settings.data;
    this.init = function(){
        var self = this;
        Highcharts.chart('container', {
            chart: {
                events: {
                    load: function () {
                        drawChart.call(this, self.data);
                    }
                }
            },
            title: false
        });
    }

    this.init();
}
var netChart = new NetworkChart({
    data: ['Software Developer', 'Java Developer', 'Data Scientist', 'Team lead', 'Senior Developer',
        'Software Engineer', 'Database Engineer', 'System Admin', 'Team lead', 'Senior Developer']
});