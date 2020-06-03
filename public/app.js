const main = function(){
  var container = d3.select('#container');
  console.log("this is the main function", container);

  var circle = container.append("circle")
    .attr("fill", "blue")
    .attr("cx", 30)
    .attr("cy", 30)
    .attr("r", 20);


  var precipTimer = () => {
    // this.updateDimensions();

    var that = this;

    if (this.timer) {
      this.timer.stop();
    }
    console.log(circle);
    this.timer = d3.timer(function() {
      // Update the circle positions.
      circle
        .attr("cx", function(d) {
          d.x += d.dx;
          if (d.x > width) {
            d.x -= width;
          }
          else if (d.x < 0) {
            d.x += width;
          }
          return d.x;
        })
        .attr("cy", function(d) {
          d.y -= d.dy;
          if (d.y > height) {
            d.y -= height;
          }
          else if (d.y < 0) {
             d.y += height;
          }
          return d.y;
        });
    });
  }

  precipTimer();

}

main();