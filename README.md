# highcharts-networkChart
A custom network chart rendered using Highcharts SVG Renderer

Dependency: Highcharts

This generates a custom network chart based on the options passed. You can instantate the chart by passing the data to `NetworkChart`. It also has click event by default to select points on the chart.
```
var chart = new customChart.NetworkChart({
    data:['Your', 'data', 'goes', 'here'],
    selector: 'container_id',
    themeColor: 'only_hex_color',
    events:{
       select: callBackFn
      }
});
```
The radius and distance of bubbles from the center is random and can be overridden according to the value provided to them.

## TBD

*1. Create Tooltip*

*2. Make the chart fully customisable*

*3. Provide event callbacks*

*4. Provide update method*


### Reach out  
Please suggest any improvements and customisation at samuellawrentz@gmail.com

### Demo  
View the demo on https://samuellawrentz.github.io/highcharts-networkChart/

Implementation Demo: https://codepen.io/samuellawrentz/pen/OwbNqP

Keep refreshing the site to see the bubbles changing radius and distance from the center ;)

PS: This chart was initially created for learning about Highcharts SVG Renderer and also because I was unable to sleep one night :) ;)
