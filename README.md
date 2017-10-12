## Guide to this project

<img width="1280" alt="screen shot 2017-10-12 at 09 31 15" src="https://user-images.githubusercontent.com/5842360/31507628-28096078-af30-11e7-883f-284b4c9552c6.png">

The map display the positions of buses in metro Vancouver. Positions are updated every 10 seconds, and come from Translink's API.

Map is created using `d3-tile`, and the Raster image tiles come from [OpenStreetMaps](http://www.openstreetmap.org/).

### Frontend
This repo constitutes the frontend, specific documentation can be found in each file.

### Backend
Because the translink api does not allow CORS, I've deployed a function on AWS using [Stackery](www.stackery.io).
The entirety of the BE code can be found [here](http://www.openstreetmap.org/)

### To Run
`$ git clone git@github.com:haffmaestro/vancouver-bus-map.git`
`$ npm install`
`$ npm start`

### Controls
This is not a slippy map like Google Maps where you can drag stuff around and move the viewport. However, by using native zoom in your browser you can get a bigger or smaller view of the map.

### Q's
Why is there no Redux?
> Using redux for this project is a bit overkill in that there are very few moving parts, there's very little state to be managed so its actually quite simple.
> In fact, using React is completely unnecessary as this whole thing could be achieved in about 90 lines of code plus d3. See an example of that [here](http://bl.ocks.org/haffmaestro/97c268712e040f762a8db99930651d26)

### Things that are not completely great
> The BE function actually allows anyone to query it, it essentially takes the Translink API endpoints for buses and makes it completely open.
> Who would it affect? Me. Because every request goes through my AWS account I will have to monitor it to see that it does not get misused/discovered.