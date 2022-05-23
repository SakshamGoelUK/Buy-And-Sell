console.log(performance.getEntriesByType("navigation")[0].type);
if (performance.getEntriesByType("navigation")[0].type === "back_forward") {
  location.reload(true);
}
let start2 =[]
function showPosition(position) {
start2.push(position.coords.longitude)
start2.push(position.coords.latitude)
console.log(position.coords.latitude + ' ' + position.coords.longitude);
mapboxgl.accessToken = 'pk.eyJ1Ijoic2FtZzAxMDkiLCJhIjoiY2tzendqOHVmMnh2ZzJxdGZ2c3FoZWR2eCJ9.NH4uz7dqmRkpvJmZsxBO9Q';
const map = new mapboxgl.Map({
container: 'map',
style: 'mapbox://styles/samg0109/cl1b2l41x001j15ntodh2066i',
center: [position.coords.longitude,position.coords.latitude], // starting position
zoom: 12
});
map.addControl(new mapboxgl.GeolocateControl({
positionOptions: {
enableHighAccuracy: true
},
trackUserLocation: true,
showUserHeading: true
}));

async function getRoute(start) {
  if(end1===undefined && end2 ===undefined){
    end1 = start[0]
    end2 = start[1]
  }
const query = await fetch(
  `https://api.mapbox.com/directions/v5/mapbox/driving/${start[0]},${start[1]};${end1},${end2}?steps=true&geometries=geojson&access_token=${mapboxgl.accessToken}`,
  { method: 'GET' }
);

const json = await query.json();
const data = json.routes[0];
const route = data.geometry.coordinates;
const geojson = {
  type: 'Feature',
  properties: {},
  geometry: {
    type: 'LineString',
    coordinates: route
  }
};
if (map.getSource('route')) {
  map.getSource('route').setData(geojson);
}
// otherwise, we'll make a new request
else {
  map.addLayer({
    id: 'route',
    type: 'line',
    source: {
      type: 'geojson',
      data: geojson
    },
    layout: {
      'line-join': 'round',
      'line-cap': 'round'
    },
    paint: {
      'line-color': '#3887be',
      'line-width': 5,
      'line-opacity': 0.75
    }
  });
}
let instructions;
try{

  instructions = document.getElementById('instructions');
}catch(e){}
const steps = data.legs[0].steps;

let tripInstructions = '';
for (const step of steps) {
tripInstructions += `<li>${step.maneuver.instruction}</li>`;
}
try{

  instructions.innerHTML = `<p><strong>Trip duration: ${Math.floor(
  data.duration / 60
  )} min 🏎️ </strong></p><ol>${tripInstructions}</ol>`;
}catch(e){}
// add turn instructions here at the end
}

map.on('load', () => {
  let start1 =  start2
  getRoute(start1);
  map.addLayer({
  id: 'point',
  type: 'circle',
  source: {
    type: 'geojson',
    data: {
      type: 'FeatureCollection',
      features: [
        {
          type: 'Feature',
          properties: {},
          geometry: {
            type: 'Point',
            coordinates: start1
          }
        }
      ]
    }
  },
  paint: {
    'circle-radius': 10,
    'circle-color': '#3887be'
  }
});
}

);
}

if (navigator.geolocation) {
navigator.geolocation.getCurrentPosition(showPosition);}

let cloud = "dsxjfrucv";
var countryInp = document.querySelector(".country");
let access;
try{
access = document.querySelector('#accessReq')

access.addEventListener('click',async()=>{
  access.innerText = 'Under Consideration'
  access.classList.add('disabled')
  access.classList.add('btn-primary')
  access.classList.remove('btn-outline-primary')
  const data = await axios.post("/products/accessreq", {
    seller: productSeller,
  });
})
}catch(e){

}
const params = new URL(document.location).searchParams;
const paramId = params.get("productID");
let msger, chatToggle;
try {
  msger = document.querySelector(".msger");
  chatToggle = document.querySelector(".chat-room");
  chatToggle.addEventListener("click", () => {
    msger.style.display = "flex";

  });
} catch (e) {}
try {
  const productInput = document.querySelector(".product");
  productInput.value = paramId;
  productInput.style.display = "none";
} catch (error) {}
try {
  var myWidget = cloudinary.createUploadWidget(
    {
      cloudName: cloud,
      uploadPreset: "mirpqzde",
    },
    async (error, result) => {
      if (!error && result && result.event === "success") {
        console.log(result.info.public_id);
        const info = result.info.secure_url;
        pics.push({publicId:result.info.secure_url})
        console.log(pics)
        myGallery.update({mediaAssets:pics})
        const data = await axios.post("/products/images", {
          url: info,
          id: paramId,
          public_id: result.info.public_id,
        });
      }
    }
  );
  document.getElementById("upload_widget").addEventListener(
    "click",
    function () {
      myWidget.open();
    },
    false
  );
} catch (e) {console.log(e)}

const myGallery = cloudinary.galleryWidget({
  container: "#my-gallery",
  cloudName: cloud,
  mediaAssets: pics,
  // aspectRatio: "4:3",
  zoomProps: {
    trigger: "hover",
  },
});
myGallery.render();
var toastTrigger = document.getElementById("liveToastBtn");
var toastLiveExample = document.getElementById("liveToast");
if (toastTrigger) {
  toastTrigger.addEventListener("click", function () {
    var toast = new bootstrap.Toast(toastLiveExample);

    toast.show();
  });
}
