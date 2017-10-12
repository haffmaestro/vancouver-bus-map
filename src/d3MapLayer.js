import { geoPath, select } from 'd3';

/**
 * This function appends a single <svg> path to the
 * element passed in, and plots the GeoJSON points passed into 
 * the plotLayer function.
 * @param  {[type]} el         [description]
 * @param  {[type]} projection [description]
 * @return {[type]}            [description]
 */
function createVectorLayer(el, props) {
  const element = select(el);
  const path = geoPath().projection(props.projection);

  let mapLayer = element.select("path.vector-layer");

  if(!mapLayer.size()) {
    mapLayer = element.append("path")
                      .attr('class', 'vector-layer'); 
  }
  
  mapLayer
    .datum({type: "FeatureCollection", features: props.geoPoints})
    .attr('d', path);

  /**
   * This function is used to update the map layer 
   * with geoPoints.
   * @param  {GeoJSON} geoPoints         
   * @param  {d3Projection} closureProjection this describes the projection to use
   */
  return function updateLayer(update) {
    let updatedProps = Object.assign(props, update);
    console.log(updatedProps);
    return createVectorLayer(el, updatedProps);
  }
}

export default createVectorLayer;