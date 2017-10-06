import React, { Component } from 'react';
import ReactDom from 'react-dom';
import d3Map from './d3Map.js';

class TileMap extends Component {
  componentDidMount() {
    const el = ReactDom.findDOMNode(this);
    const props = this.props;
    const mapConfig = {
      center: [props.longitude, props.latitude],
      zoom: props.zoom,
      width: props.width,
      height: props.height,
    } 

    d3Map.create(el, mapConfig);
  }

  render() {
    return (
      <svg></svg>
    );
  }
}

  export default TileMap;