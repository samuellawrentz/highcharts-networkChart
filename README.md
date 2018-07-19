# highcharts-networkChart
A custom network chart rendered using Highcharts SVG Renderer

Dependency: Highcharts v5.0.0 or above

This generates a custom network chart based on the options passed. You can instantate the chart by passing the data to `NetworkChart`. It also has click event by default to select points on the chart.
```
var chart = new NetworkChart({
data:['Your', 'data', 'goes', 'here']
});
```
The radius and distance of bubbles from the center is random and can be overridden according to the value provided to them.

## TBD

*1. Align dataLabels*

*2. Create Tooltip*

*3. Allow theming options*

*4. Make the chart fully customisable*


### Reach out  
Please suggest any improvements and customisation at samuellawrentz@gmail.com

### Demo  
View the demo on https://samuellawrentz.github.io/highcharts-networkChart/

Keep refreshing the site to see the bubbles changing radius and distance from the center.
