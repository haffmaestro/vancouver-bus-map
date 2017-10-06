import React, { Component } from 'react';
import TileMap from './TileMap';

class Map extends Component {
  render() {
    let svgRoot = <svg></svg>;
    return (
      <TileMap
        el={svgRoot}
        width={900}
        height={900}
        latitude={49.26}
        longitude={-123.17}
        zoom={21}
      />
      // <ReactMapGL
      //   width={400}
      //   height={400}
      //   latitude={37.7577}
      //   longitude={-122.4376}
      //   zoom={8}
      //   onViewportChange={(viewport) => {
      //     const {width, height, latitude, longitude, zoom} = viewport;
      //     // Optionally call `setState` and use the state to update the map.
      //   }}
      // />
    );
  }
}

export default Map;