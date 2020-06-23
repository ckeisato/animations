const main = () => {
  var AudioContext = window.AudioContext || window.webkitAudioContext;
  var audio = new Audio('simon-more_dreamland.mp3');
  audio.loop = true;

  var context = new AudioContext();
  var analyser = context.createAnalyser();
  var source = context.createMediaElementSource(audio);
  source.connect(analyser);
  analyser.connect(context.destination);

  var frequencyData = new Uint8Array(360);

  var svg = d3.select('#svg-container').append('svg').attr('height', '85vh').attr('width', '90vw');

  var line = d3.svg.line.radial()
    .interpolate("linear-closed")
    .radius(d => (d / 2) + 150)
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
    line.interpolate(event.target.value);
  });

  document.getElementById('audio-cta').addEventListener('click', event => {
    context.resume();
    if (audio.paused) {
      event.target.innerText = "Pause"
      audio.play();
    } else {
      audio.pause();
      event.target.innerText = "Play"
    }
  });

  // Run the loop
  renderChart();
}

window.onload = () => {
  main();
}
