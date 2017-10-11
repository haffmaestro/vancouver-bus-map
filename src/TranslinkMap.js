import React, { Component } from 'react';
import TileMap from './TileMap';
import getBuses from './getBuses';

class TranslinkMap extends Component {

  constructor(props) {
    super(props);
    let geoPoints = [];
    let {innerWidth, innerHeight} = window;
    window.onresize = this.onResize.bind(this);
    this.state = {geoPoints, width: innerWidth, height: innerHeight};
  }

  componentDidMount() {
    this.updateBusGeopoints();
    const busUpdateInterval = 10000;
    setInterval(this.updateBusGeopoints.bind(this), busUpdateInterval);
  }

  updateBusGeopoints() {
    getBuses()
      .then((busGeopoints) => {
        this.setState({geoPoints: busGeopoints});
      });
  }

  onResize({currentTarget}) {
    this.setState({
      width: currentTarget.innerWidth,
      height: currentTarget.innerHeight,
    });
  }

  render() {
    let {geoPoints, width, height} = this.state;
    
    return (
      <TileMap
        width={width}
        height={height}
        latitude={49.26}
        longitude={-123.17}
        zoom={21}
        mapLayer={geoPoints}
      />
    );
  }
}

export default TranslinkMap;