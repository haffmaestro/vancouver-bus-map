import React, { Component } from 'react';
import createProjection from './d3MapProjection';
import d3Map from './d3Map';
import createVectorLayer from './d3MapLayer';

class TileMap extends Component {

  constructor(props) {
    super(props);
    
  }

  componentDidMount() {
    let props = this.props;
    const center = [props.longitude, props.latitude],
          {zoom, mapLayer} = props,
          el = this.el;
    var   {width, height} = this.props;

    if(!width || !height) {
      ({ width, height } = fillParent(el));
    }

    const projection = createProjection(center, zoom, width, height);

    d3Map.create(el, {projection, width, height});
    
    let plotMapLayer = createVectorLayer(el, projection);
    plotMapLayer(mapLayer)

    this.plotMapLayer = plotMapLayer;
    this.map = d3Map;
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
      this.setState({projection});
    } 

    if((props.mapLayer !== prevProps.mapLayer) || projection) {
      this.updateD3Models({projection}, {mapLayer: props.mapLayer});
    }

  }

  updateD3Models({ projection }, { width, height, mapLayer }) {
    this.map.update({projection, width, height})
    this.plotMapLayer(mapLayer)
  }

  render() {
    return (
      <svg ref={el => this.el = el}></svg>
    );
  }
}

function fillParent(element) {
  var parent = element.parentNode;
  return parent.getBoundingClientRect();
}

export default TileMap;