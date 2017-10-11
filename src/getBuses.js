import request from 'superagent';

function getBuses() {
  const apiEndpoint = "https://api.18257440082045.stackery-stacks.io/buses";

  return request
    .get(apiEndpoint)
    .set('accept', 'application/json')
    .then(({body}) => {
      return body.map(castBusToGeoJsonPoint);
    })
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

export default getBuses;