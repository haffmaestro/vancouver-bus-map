import * as d3 from "d3";
import { tile } from "d3-tile";
import TAU from './TAU.js'

var d3Map = {};

d3Map.create = function(el, {projection, width, height}) { 
  console.log(width, height)
  const d3Element = d3.select(el);
  const tiles = createTiles(projection, width, height);

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
  this._el = d3Element;
  this._state = {projection, width, height};
}

d3Map.update = function(update) {
  let updatedState = Object.assign(this._state, update);
  this.create(this._el, updatedState);
}

d3Map.getProjection = function() {
  return this._projection;
}

// Helpers

function createTiles(projection, width, height) {
  return tile()
    .size([width, height])
    .scale(projection.scale() * TAU)
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