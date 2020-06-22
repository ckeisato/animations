// upload song as local file + ADD CREDIT INFO!!!!
// create oscilloscope 
// create service + google storage bucket with other songs????
var AudioContext = window.AudioContext || window.webkitAudioContext;

const main = () => {
  console.log("herroooo");

  var audio = new Audio('simon-more_dreamland.mp3');
  audio.autoplay = true;

  var context = new AudioContext();
  var analyser = context.createAnalyser();
  var source = context.createMediaElementSource(audio);
  source.connect(analyser);
  analyser.connect(context.destination);

  var frequencyData = new Uint8Array(360);

  var svgHeight = '300';
  var svgWidth = '1200';
  var barPadding = '1';

  function createSvg(parent, height, width) {
    return d3.select(parent).append('svg').attr('height', height).attr('width', width);
  }

  var svg = createSvg('body', svgHeight, svgWidth);

  var line = d3.svg.line.radial()
    .interpolate("linear-closed")
    .radius(d => (d / 2) + 50)
    .angle((d, i) => i * (Math.PI/180));

  var path = svg.append('path')
    .attr('d', line(frequencyData))
    .attr('stroke', 'green')
    .attr('stroke-width', 3)
    .attr('fill', 'white')
    .attr('class', 'line')
    .attr('transform', 'translate(200, 180)');


  // Continuously loop and update chart with frequency data.
  const renderChart = () => {
   requestAnimationFrame(renderChart);

   // Copy frequency data to frequencyData array.
    analyser.getByteFrequencyData(frequencyData);
    
    svg.select('.line').attr('d', line(frequencyData));
  }

  // Run the loop
  renderChart();
}

main();



