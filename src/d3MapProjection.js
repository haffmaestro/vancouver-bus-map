import { geoMercator } from 'd3';
import TAU from './TAU.js'

export default function createProjection(center, zoom, width, height) {
  return geoMercator()
    .scale((1 << zoom) / TAU)
    .translate([width / 2, height / 2])
    .center(center);
}