import * as d3 from "d3";
import { tile } from "d3-tile";
import TAU from './TAU.js'

/**
 * This function is responsible for creating the raster map and attaching it to the right
 * element on the page.
 * 
 * @param  { HTML Element } el    the root to attach the images to
 * @param  {{projection, width, height}} updatedProps this describes how the map should be assembled
 * @return { Function }       the method used to update the map
 */
function createMap(el, props) {
  const d3Element = d3.select(el);
  const tiles = createTiles(props.projection, props.width, props.height);

  let imageContainer = d3Element.select("g.image-container");

  /**
   * if there is no container yet, we must make one
   * since we are not using .data for attaching d3 data to this element
   * we cant use .enter/.exit semantics
   */
  if(!imageContainer.size()) {
    d3Element.insert('g')
             .attr('class', 'image-container');

    imageContainer = d3Element.select("g.image-container");
  }

  const rasterImages = imageContainer.selectAll("image");

  setSize(d3Element, props);

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

  return function updateMap(update) {
    let updatedProps = Object.assign(props, update);
    return createMap(el, updatedProps);
  }
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

export default createMap