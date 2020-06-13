// globals
var force = null;
var pointerCharge = -1000;
var nodeCharge = -5
var gravity = 0.05;

// helpers
// returns whether or not a node is colliding
var collide = function(node) {
  var r = node.radius + 16,
    nx1 = node.x - r,
    nx2 = node.x + r,
    ny1 = node.y - r,
    ny2 = node.y + r;
  
  return function(quad, x1, y1, x2, y2) {
    if (quad.point && (quad.point !== node)) {
      var x = node.x - quad.point.x,
        y = node.y - quad.point.y,
        l = Math.sqrt(x * x + y * y),
        r = node.radius + quad.point.radius;
      if (l < r) {
        l = (l - r) / l * .5;
        node.x -= x *= l;
        node.y -= y *= l;
        quad.point.x += x;
        quad.point.y += y;
      }
    }
    return x1 > nx2 || x2 < nx1 || y1 > ny2 || y2 < ny1;
  };
}


var updateForce = function() {
  force.charge(function(d, i) {
    return i == 0 ? pointerCharge : nodeCharge;
  });
  force.start();
}

// UI functions
var updatePointerCharge = function(targetID, val) {
  document.getElementById(targetID).innerHTML = val;
  pointerCharge = val;
  updateForce();
}

var updateNodeCharge = function(targetID, val) {
  document.getElementById(targetID).innerHTML = val;
  nodeCharge = val;
  updateForce();
}

var updateGravity = function(targetID, val) {
  document.getElementById(targetID).innerHTML = val;
  gravity = val;
  force.gravity(gravity);
  force.start();
}

var init = function() {
  var width = 960, height = 500;
  var nodes = d3.range(200).map(function() { return {radius: Math.random() * 12 + 4}; });
  var root = nodes[0];
  var colors = ["#FFBE0B", "#FB5607", "#FF006E", "#8338EC", "#3A86FF"];

  root.radius = 0;
  root.fixed = true;

  force = d3.layout.force()
    .gravity(gravity)
    .charge(function(d, i) {
      return i == 0 ? pointerCharge : nodeCharge;
    })
    .nodes(nodes)
    .size([width, height]);

  force.start();

  var svg = d3.select("#container").append("svg");
  svg.selectAll("circle")
    .data(nodes.slice(1))
    .enter().append("circle")
    .attr("r", function(d) { return d.radius; })
    .style("fill", function(d, i) { return colors[i%5] });

  force.on("tick", function(e) {
    var q = d3.geom.quadtree(nodes);
    var i = 0;
    var n = nodes.length;

    while (++i < n) q.visit(collide(nodes[i]));

    svg.selectAll("circle")
      .attr("cx", function(d) { return d.x; })
      .attr("cy", function(d) { return d.y; });
  });

  svg.on("mousemove", function() {
    var p1 = d3.mouse(this);
    root.px = p1[0];
    root.py = p1[1];
    force.resume();
  });
}

init();