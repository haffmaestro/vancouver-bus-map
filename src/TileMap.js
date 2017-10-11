import React, { Component } from 'react';
import createProjection from './d3MapProjection';
import createMap from './d3Map';
import createVectorLayer from './d3MapLayer';

class TileMap extends Component {

  componentDidMount() {
    let props = this.props;
    const center = [props.longitude, props.latitude],
          {zoom, mapLayer, width, height} = props,
          el = this.el;

    const projection = createProjection(center, zoom, width, height);

    let updateMap = createMap(el, {projection, width, height});
    
    let plotMapLayer = createVectorLayer(el, projection);
    plotMapLayer(mapLayer)

    this.plotMapLayer = plotMapLayer;
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
      this.updateMap({projection, width, height})
    } 

    if((props.mapLayer !== prevProps.mapLayer) || projection) {
      let mapLayer = props.mapLayer;
      projection ? this.plotMapLayer(mapLayer, projection)
                 : this.plotMapLayer(mapLayer);
    }

  }

  render() {
    return (
      <svg ref={el => this.el = el}></svg>
    );
  }
}

export default TileMap;