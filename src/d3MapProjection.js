import { geoMercator } from 'd3';
import TAU from './TAU.js'

/**
 * Helper to create a mercator projection
 * @param  {[long, lat]} center coordinates of center of the map
 * @param  {Integer} zoom  describes the scale of the map, higher means further zoomed in
 * @param  {Integer} width  px
 * @param  {Integer} height  px
 * @return {d3 Projection}
 */
export default function createProjection(center, zoom, width, height) {
  return geoMercator()
    .scale((1 << zoom) / TAU)
    .translate([width / 2, height / 2])
    .center(center);
}