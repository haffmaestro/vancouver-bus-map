import { geoPath, select } from 'd3';

function createVectorLayer(el, projection) {
  const element = select(el);

  var mapLayer = element.append("path")
                        .attr('class', 'vector-layer');

  return function plotLayer(geoPoints, closureProjection = projection) {
    const path = geoPath().projection(closureProjection);

    mapLayer
      .datum({type: "FeatureCollection", features: geoPoints})
      .attr('d', path);
  }
}

export default createVectorLayer;