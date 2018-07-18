function drawChart(options){
    var chart = this;
    var renderer = chart.renderer;
    var centerX = chart.chartWidth/2 + chart.plotLeft;
    var centerY = chart.chartHeight/2;
    var angleDifference = 360/options.length;
    var angle = 0;
    var bubbleStyle = {
        fill: '#9cc1e1',
        stroke: 'white',
        'stroke-width': 3,            
        zIndex:3
    };

    var lineStyle = {
        stroke: '#d1e4f1',
        'stroke-width': 20,        
        zIndex:0
    }
    

    var getRandomArbitrary = function(min, max) {
        return Math.random() * (max - min) + min;
      }

    var renderPoints = function(){
        var circle = renderer.circle(centerX, centerY, 50).attr({
            fill: '#5ba2dc',
            stroke: 'white',
            'stroke-width': 2,            
            zIndex:3
        })
        .add();   

        options.forEach((element) => {
            var length = getRandomArbitrary(100, 250);
            var radius = getRandomArbitrary(20, 40);
            renderBubbles(length, radius, element);
        });
    }

    var renderLabels = function(){
        
    }

    

    var renderBubbles = function(length, radius, element){    
        var group =  renderer.g('group').add();
        var circle = renderer.circle(centerX, centerY + length, radius).attr(bubbleStyle)
        .add(group);

        var circleBBox = circle.getBBox();
        var labelX = circleBBox.x + circleBBox.width + 10;
        var labelY = circleBBox.y + circleBBox.height/2; 
    
    
        var path = renderer.path(['M', centerX, centerY, 'l', 0, length])
        .attr(lineStyle)
        .add(group);

        var label = renderer.text(element, labelX, labelY).add(group)
        .attr({
            rotation:-angle,
            zIndex:10
        });
    
        group.attr({
            x:centerX,
            y:centerY,
            rotation:angle
        });

        angle+=angleDifference;
    }

    renderPoints();

}




function NetworkChart(settings){
    this.data = settings.data;
}

NetworkChart.prototype.draw = function(){
    var self = this;
    Highcharts.chart('container', {
        chart: {
          backgroundColor: 'white',
          events: {
            load: function(){
                drawChart.call(this, self.data);
            }
          }
        },
        title: false      
      });
}

var netChart = new NetworkChart({
    data:['Software Developer', 'Java Developer', 'Data Scientist', , 'Team lead', 'Senior Developer',
    'Software Engineer','Database Engineer', 'System Admin', 'Team lead', 'Senior Developer']
});

netChart.draw();
