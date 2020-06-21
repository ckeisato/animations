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


  var frequencyData = new Uint8Array(200);

  var svgHeight = '300';
  var svgWidth = '1200';
  var barPadding = '1';

  function createSvg(parent, height, width) {
    return d3.select(parent).append('svg').attr('height', height).attr('width', width);
  }

  var svg = createSvg('body', svgHeight, svgWidth);

  var spiral = Array.from({ length: 20 }, (_, i) => [
    ((Math.PI / 3) /20) * i, // angle (in radians)
    2 * i // radius
  ])


  console.log('spiral', spiral);


  var lineRadial = d3.svg.line.radial();  
  svg.append("path")
    .attr("transform", "translate(200, 200)")
    .attr("d", lineRadial(spiral))
    .attr("fill", "none")
    .attr("stroke", "black");

  // Continuously loop and update chart with frequency data.
  function renderChart() {
   requestAnimationFrame(renderChart);

   // Copy frequency data to frequencyData array.
    analyser.getByteFrequencyData(frequencyData);
    var test = spiral.map((coord, index) => {
      return [coord[0], frequencyData[index] * 4]
    });

    // console.log('test', test);
    
    svg.select('path').attr("d", lineRadial(test));
  }

  // Run the loop
  // renderChart();



}

main();



