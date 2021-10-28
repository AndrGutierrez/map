const mapDescription = document.getElementById("mobile--map__description");

// Creating mapbox
mapboxgl.accessToken =
  "pk.eyJ1IjoiYnJhbnllciIsImEiOiJja3RqMTY2YWIxN2d4Mm9ueHpnZnl3cDRkIn0.avFcpHPsJu_mtz-mD5g-mA";
var mymap = new mapboxgl.Map({
  container: "map",
  style: "mapbox://styles/branyer/cktj1e5gj0su317mkfittjeui",
  center: [0, 0],
  renderingMode: "2d",
  zoom: 2.4,
});
mymap.dragRotate.disable();
mymap.scrollZoom.disable();
mymap.touchZoomRotate.disable();
mymap.doubleClickZoom.disable();
//marker selection
let markers = document.querySelectorAll(".leaflet-marker-icon");
markers.forEach((marker) => {
  marker.addEventListener("click", changeMarkerColor);
});

//fly to selected country in left menu
let menuItems = Array.from(document.querySelectorAll(".map-left-menu li"));
let menuTopItems = Array.from(document.querySelectorAll(".map-top__menu li"));
let infoMarker = Array.from(document.querySelectorAll(".marker-info .marker"));
menuItems.push(...menuTopItems);
menuItems.push(...infoMarker);

let country = "";
menuItems.forEach((li, index) => {
  li.addEventListener("click", (e) => {
    country = li.classList[0];
    if (!li.classList.contains("selected")) mapFlyTo(country);
  });
});

let markerContainer = "";
let moreText = "";
const markersList = [];

//marker icon information
let usaMarker1 = {
  country: "usa-1",
  geometry: {
    coordinates: [-98, 33.5],
  },
};
const usaMarker2 = {
  country: "usa-2",
  geometry: {
    coordinates: [-87.701882, 37.745209],
  },
};

markersList.push(usaMarker1);
markersList.push(usaMarker2);

//draw markers
markersList.forEach((marker) => {
  var markerIconContainer = document.createElement("div");
  var markerIcon = document.createElement("div");
  markerIcon.className = `marker ${marker.country}`;
  var shadow = document.createElement("div"); // Create a text node
  shadow.classList.add("leaflet-marker-shadow");
  markerIconContainer.appendChild(shadow);
  markerIconContainer.appendChild(markerIcon);
  new mapboxgl.Marker(markerIconContainer)
    .setLngLat(marker.geometry.coordinates)
    .addTo(mymap);
});

myMarkers = document.querySelectorAll(".marker");
myMarkers.forEach((marker) =>
  marker.addEventListener("click", changeMarkerColor)
);
//countries data constants
const COUNTRIES = {
  col: [-75, 5],
  esp: [-5, 40],
  usa: [-100, 35],
  mex: [23.634501, -90],
  ven: [-65, 10],
};

const ICON = {
  // iconUrl: '/wp-content/uploads/2021/09/marker-white.svg',
  // shadowUrl: '/wp-content/uploads/2021/09/marker-shadow.svg',
  iconUrl: "./wp-content/uploads/2021/09/marker-white.svg",
  shadowUrl: "./wp-content/uploads/2021/09/marker-shadow.svg",
  shadowSize: [50, 50],
  iconSize: [60, 60],
  iconAnchor: [25, 25],
  shadowAnchor: [6, 2],
  popupAnchor: [0, -25],
  className: "dot",
};

// Card information
let usaMarkerInfo1 = [
  {
    name: "International Grains & Cereal LLC",
    direction: "6902 Higway 66 Greenville. Texas Estados Unidos",
    phone: "+1 903 554 1000",
    link: "#",
    className: "usa-1",
  },
  {
    name: "Otra Planta USA",
    direction: "6902 Higway 66 Greenville. Texas Estados Unidos",
    phone: "+1 903 554 1000",
    link: "#",
    className: "usa-2",
  },
];
const markerInfo = {
  usa: usaMarkerInfo1,
  col: [],
  esp: [],
  mex: [],
  ven: [],
};
//FUNCTIONS

function changeMarkerColor(el) {
  resetMarkerIcon();
  mapFlyTo(el.target.classList[1].split("-")[0]);

  if (!el.target.classList.contains("marker-selected")) {
    // el.target.style.backgroundImage = 'url("/wp-content/uploads/2021/09/marker-red.svg")'
    el.target.style.backgroundImage =
      'url("./wp-content/uploads/2021/09/marker-red.svg")';
    el.target.classList.add("marker-selected");
  }

  let marker = document.querySelector(`.marker-info.${el.target.classList[1]}`);

  marker.classList.add("selected");

  document.querySelector(".map-rigth-menu").scrollTo({
    top: marker.offsetTop - 20,
    behavior: "smooth",
  });
}

function resetMarkerIcon(resetMenu = null) {
  document.querySelectorAll(".marker").forEach((marker) => {
    // marker.style.backgroundImage = "url('/wp-content/uploads/2021/09/marker-white.svg')"
    marker.style.backgroundImage =
      "url('./wp-content/uploads/2021/09/marker-white.svg')";
    marker.classList.remove("marker-selected");
  });

  document.querySelectorAll(".marker-info").forEach((marker) => {
    marker.classList.remove("selected");
  });

  if (resetMenu) {
    document.querySelectorAll(".map-left-menu li").forEach((el) => {
      el.classList.remove("selected");
    });
  }
}

function displayMarkerCards(country) {
  resetMarkerIcon(true);
  const rigthMenu = document.querySelector(".map-rigth-menu");
  const mobileDescription = document.getElementById(
    "mobile--marker__description"
  );

  markerContainer.innerHTML = "";
  markerContainer = window.innerWidth >= 1024 ? rigthMenu : mobileDescription;
  moreText = window.innerWidth >= 1024 ? "CONOCE MÁS" : "VER MÁS";
  menuItems.forEach((item) => item.classList.remove("selected"));
  document.querySelectorAll(`.${country}`).forEach((el) => {
    el.classList.add("selected");
  });

  let content = "";

  //displays a card with location information
  markerInfo[country].map((marker) => {
    content += `
		<li class="${marker.className} marker-info">
		  <div class="marker-info__main">
			<div class="marker marker-info__marker ${country}"></div>
			<div class="marker-info__content">
			  <p class="marker-info__title">${marker.name}</p>
			  <p>${marker.direction}</p>
			  <p>${marker.phone}</p>
			</div>
		  </div>
			<div class="link">
				<a href="${marker.link}"> ${moreText} <span class="dashicons dashicons-arrow-right-alt2"></span> </a>
			</div>
		</li>
		`;
  });

  markerContainer.innerHTML = content;
}
function mapFlyTo(country) {
  //map zoom depending on the country
  displayMarkerCards(country);
  let zoom = 3.9;
  //depending on the section this changes (Plantas industriales/oficinas comerciales)
  switch (country) {
    case "usa":
      mapDescription.innerHTML = "Plantas Industriales <br/> Estados Unidos";
      zoom = 2.9;
      break;

    case "esp":
      mapDescription.innerHTML = "Plantas Industriales <br/> España";
      break;
    case "ven":
      mapDescription.innerHTML = "Plantas Industriales <br/> Venezuela";
      break;
    case "col":
      mapDescription.innerHTML = "Plantas Industriales <br/> Colombia";
      break;
    default:
      mapDescription.innerHTML += country;
      break;
  }
  mymap.flyTo({ center: COUNTRIES[country], essential: true, zoom: zoom });
}

// when an user flips his phone or resizes the window, mobile and desktop marker cards are gonna be displayed,
// this checks if this resize happens and displays the aproppiate view
window.addEventListener("resize", () => {
  country != "" ? displayMarkerCards(country) : "";
});
