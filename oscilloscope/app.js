// create oscilloscope 
// create service + google storage bucket with other songs????
var AudioContext = window.AudioContext || window.webkitAudioContext;

const main = () => {
  var audio = new Audio('simon-more_dreamland.mp3');
  audio.autoplay = true;
  audio.loop = true;

  var context = new AudioContext();
  var analyser = context.createAnalyser();
  var source = context.createMediaElementSource(audio);
  source.connect(analyser);
  analyser.connect(context.destination);

  var frequencyData = new Uint8Array(360);

  var svgHeight = '90vh';
  var svgWidth = '90vw';

  function createSvg(parent, height, width) {
    return d3.select(parent).append('svg').attr('height', height).attr('width', width);
  }

  var svg = createSvg('#svg-container', svgHeight, svgWidth);

  var line = d3.svg.line.radial()
    .interpolate("linear-closed")
    .radius(d => (d / 2) + 100)
    .angle((d, i) => i * (Math.PI/180));

  var path = svg.append('path')
    .attr('d', line(frequencyData))
    .attr('stroke', 'white')
    .attr('stroke-width', 2)
    .attr('fill', 'transparent')
    .attr('class', 'line');


  // Continuously loop and update chart with frequency data.
  const renderChart = () => {
    requestAnimationFrame(renderChart);
    analyser.getByteFrequencyData(frequencyData);
    svg.select('.line').attr('d', line(frequencyData));
  }


  document.getElementById('select-interpolation').addEventListener('change', event => {
    console.log('hello', event.target.value);
    line.interpolate(event.target.value);
  });

  // Run the loop
  renderChart();
}

main();



