# highcharts-networkChart
A custom network chart rendered using Highcharts SVG Renderer

Dependency: Highcharts

This generates a custom network chart based on the options passed. You can instantate the chart by passing the data to `NetworkChart`. It also has click event by default to select points on the chart.
```
var chart = new customChart.NetworkChart({
    series:{
      name:'Series_name',
      data: ['Your', 'data', 'goes', 'here']
    },
    selector: 'container_id',
    themeColor: 'only_hex_color',
    events:{
       select: callBackFn
      }
});
```
The radius and distance of bubbles from the center is random and can be overridden according to the value provided to them.

## API

You can directly select a point using the `select()` method. Pass in the value of the point to be selected.
```
chart.select('data');

```

You can update the chart by passing new data to the `update()` method. Pass in a new array to the method to redraw the chart.
```
chart.update(['this', 'is', 'updated', 'data', 'yay'])

```
## TBD

*1. Create Tooltip*

*2. Make the chart fully customisable*



### Reach out  
Please suggest any improvements and customisation at samuellawrentz@gmail.com

### Demo  
View the demo on https://samuellawrentz.github.io/highcharts-networkChart/

Implementation Demo: https://codepen.io/samuellawrentz/pen/OwbNqP

Keep refreshing the site to see the bubbles changing radius and distance from the center ;)

PS: This chart was initially created for learning about Highcharts SVG Renderer and also because I was unable to sleep one night :) ;)
