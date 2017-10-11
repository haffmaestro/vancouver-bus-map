import React, { Component } from 'react';
import TileMap from './TileMap';
import buses from './buses.js'

class Map extends Component {
  componentDidMount() {

  }

  render() {
    const geoPoints = buses.map(castBusToGeoJsonPoint);
    return (
      <TileMap
        latitude={49.26}
        longitude={-123.17}
        zoom={21}
        mapLayer={geoPoints}
      />
    );
  }
}

function castBusToGeoJsonPoint(d) {
  const coordinates = [+d.Longitude, +d.Latitude];
  // This is GeoJSON notation 
  const instructions = {
    type: "Feature",
    geometry: {type: "Point", coordinates}
  }
  return instructions;
}

export default Map;