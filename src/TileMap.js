import React, { Component } from 'react';
import createProjection from './d3MapProjection';
import createMap from './d3Map';
import createVectorLayer from './d3MapLayer';

/**
 * This Class is meant to be the only interaction point between
 * d3 and React.
 *
 * Because d3 actually changes the DOM itself, this component acts as a translator
 * between the two, and is why the `render` function does very little here. 
 */
class TileMap extends Component {

  componentDidMount() {
    let props = this.props;
    const center = [props.longitude, props.latitude],
          {zoom, mapLayer, width, height} = props,
          el = this.el;

    const projection = createProjection(center, zoom, width, height);

    let updateMap = createMap(el, {projection, width, height});
    let updateMapLayer = createVectorLayer(el, {projection, geoPoints: mapLayer});

    this.updateMapLayer = updateMapLayer;
    this.updateMap = updateMap;
  }

  componentDidUpdate(prevProps) {
    const props = this.props;
    let projection;

    let centerUpdated = (prevProps.longitude !== props.longitude) || (prevProps.latitude !== props.latitude),
        zoomUpdated   = (prevProps.zoom !== props.zoom),
        widthUpdated  = (prevProps.width !== props.width),
        heightUpdated = (prevProps.height !== props.height);

    if(centerUpdated || zoomUpdated || widthUpdated || heightUpdated) {
      const center = [props.longitude, props.latitude],
            zoom = props.zoom,
            width = props.width,
            height = props.height;

      projection = createProjection(center, zoom, width, height);
      let updateFunc = this.updateMap({projection, width, height});

      this.updateMap = updateFunc;
    } 

    if((props.mapLayer !== prevProps.mapLayer) || projection) {
      let updateFunc = projection ? this.updateMapLayer({geoPoints: props.mapLayer, projection})
                                  : this.updateMapLayer({geoPoints: props.mapLayer});
      
      this.updateMapLayer = updateFunc;
    }

  }

  render() {
    return (
      <svg ref={el => this.el = el}></svg>
    );
  }
}

export default TileMap;