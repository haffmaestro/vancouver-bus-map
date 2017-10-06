import * as d3 from "d3";
import { tile } from "d3-tile";

const pi = Math.PI,
      tau = 2 * pi;

var d3Map = {};

d3Map.create = function(el, {center, zoom, width, height}) { 
  const d3Element = d3.select(el);
  const projection = createProjection(center, zoom, width, height)
  const tiles = createTiles(width, height, projection);

  const rasterImages = d3Element.selectAll("image");

  setSize(d3Element, {width, height});

  rasterImages
    .data(tiles, (d) => d)
    .enter().append("image")
      .attr("xlink:href", getOSMTileUrl)
      .attr("x", getXCoordinate)
      .attr("y", getYCoordinate)
      .attr("width", tiles.scale)
      .attr("height", tiles.scale);

  rasterImages
    .data(tiles, (d) => d)
    .exit().remove();

  function getXCoordinate({x}) {
    return (x + tiles.translate[0]) * tiles.scale;
  }

  function getYCoordinate({y}) {
    return (y + tiles.translate[1]) * tiles.scale;
  }

  this._projection = projection;
  this._el = el;
  this._state = {center, zoom, width, height};
}

d3Map.update = function(update) {
  let updatedState = Object.assign(this._state, update);
  this.create(this._el, updatedState);
}

d3Map.getProjection = function() {
  return this._projection;
}

// Helpers

function createProjection(center, zoom, width, height) {
  return d3.geoMercator()
    .scale((1 << zoom) / tau)
    .translate([width / 2, height / 2])
    .center(center);
}

function createTiles(width, height, projection) {
  return tile()
    .size([width, height])
    .scale(projection.scale() * tau)
    .translate(projection([0, 0]))();
}

function getOSMTileUrl({x,y,z}) {
  return "http://" + "abc"[y % 3] + ".tile.openstreetmap.org/" + z + "/" + x + "/" + y + ".png"; 
}

function setSize(element, {width, height}) {
  element.attr("width", width);
  element.attr("height", height);
}

export default d3Map;