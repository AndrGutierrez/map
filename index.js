
//countries data constants
const COUNTRIES = {
		"col": [-75,  5],
		"esp": [-5, 40],
		"usa": [-100, 35],
		"mex": [23.634501, -90],
		"ven": [-65, 10]
	}
	
const ICON = {
	// iconUrl: '/wp-content/uploads/2021/09/marker-white.svg',
	// shadowUrl: '/wp-content/uploads/2021/09/marker-shadow.svg',
	iconUrl: './wp-content/uploads/2021/09/marker-white.svg',
	shadowUrl: './wp-content/uploads/2021/09/marker-shadow.svg',
	shadowSize:   [50, 50],
	iconSize: [60,60], 
	iconAnchor: [25, 25], 
	shadowAnchor: [6, 2],
	popupAnchor: [0, -25], 
	className: 'dot'
}    
 
// Card information
let usaMarkerInfo1 = [
			{
				name: "International Grains & Cereal LLC",
				direction: "6902 Higway 66 <br> Greenville. Texas <br> Estados Unidos",
				phone: "+1 903 554 1000",
				link: "#",
				className: "usa-1" 
			},
			  {
				name: "Otra Planta USA",
				direction: "6902 Higway 66 <br> Greenville. Texas <br> Estados Unidos",
				phone: "+1 903 554 1000",
				link: "#",
				className: "usa-2" 
			}
		]
const markerInfo= {
	"usa": usaMarkerInfo1,
	"col": [],
	"esp": [],
	"mex": [],
	"ven": []
}
	
const markersList = []

//marker icon information
let usaMarker1 = {
				country: 'usa-1',
				geometry: {
					coordinates: [-97.5, 36.209670 ]
				},
			}
const usaMarker2={
				country: 'usa-2',
				geometry: {
					coordinates: [-87.701882, 37.745209]
				},
			}
		

markersList.push(usaMarker1)
markersList.push(usaMarker2)


// Creating mapbox
mapboxgl.accessToken = 'pk.eyJ1IjoiYnJhbnllciIsImEiOiJja3RqMTY2YWIxN2d4Mm9ueHpnZnl3cDRkIn0.avFcpHPsJu_mtz-mD5g-mA';  
var mymap = new mapboxgl.Map({ 
    container: 'map', 
    style: 'mapbox://styles/branyer/cktj1e5gj0su317mkfittjeui',  
    center: [0, 0],  
    renderingMode: '2d',
    zoom: 2.4,
}); 
mymap.dragRotate.disable()
mymap.scrollZoom.disable()
mymap.touchZoomRotate.disable()
mymap.doubleClickZoom.disable()
//marker selection
let markers = document.querySelectorAll(".leaflet-marker-icon")
	markers.forEach((marker) => {
	
		marker.addEventListener('click', changeMarkerColor)
		
	})

//fly to selected country in left menu
let menuItems = Array.from(document.querySelectorAll(".map-left-menu li"))
let menuTopItems = Array.from(document.querySelectorAll(".map-top__menu li"))
menuItems.push(...menuTopItems)

console.log(menuItems)
menuItems.forEach((li, index) => {
		
		li.addEventListener('click', (e) => {
		  
			if(!li.classList.contains("selected")) mapFlyTo(li.classList[0])

	})
		
})

//draw markers
markersList.forEach(marker=>{
	var markerContainer = document.createElement('div')
	var markerIcon = document.createElement('div')
	markerIcon.className = `marker ${marker.country}`
	var shadow = document.createElement('div')         // Create a text node
	shadow.classList.add("leaflet-marker-shadow")
	markerContainer.appendChild(shadow);
	markerContainer.appendChild(markerIcon);
	new mapboxgl.Marker(markerContainer).setLngLat(marker.geometry.coordinates).addTo(mymap)

})

myMarkers = document.querySelectorAll(".marker")
myMarkers.forEach(marker=>marker.addEventListener('click', changeMarkerColor))
//const GEO_JSON_1 = [
//	...usaMarkers1
//];

////GEO JSON 2

// let usaMarkerInfo2 = [
//			  {
				// name: "Otra Planta USA",
//				direction: "6902 Higway 66 <br> Greenville. Texas <br> Estados Unidos",
//				phone: "+1 903 554 1000",
//				link: "#",
//				className: "usa-2" 
//			}
//		]
		
		
//const MARKER_INFO_2 = {
//	"usa": usaMarkerInfo2,
//	"col": [],
//	"esp": [],
//	"mex": [],
//	"ven": []
//}
//let usaMarkers2 = [
//			{
//				type: 'Feature',
//				geometry: {
//					type: 'Point',
//					coordinates: [-87.701882, 33.745209]
//				},
//				properties: { icon : {...ICON, className: "usa-2"}}
//			}
		
//		]
		
//const GEO_JSON_2 = [
//	...usaMarkers2
//];
	


//mymap.addSource(mymap.style, {type: 'geojson'});
////.addLayer(L.mapbox.styleLayer('mapbox://styles/branyer/cktj1e5gj0su317mkfittjeui'));
//mymap.addLayer({})
//const myLayer = mapboxgl.featureLayer().addTo(mymap);

//myLayer.on('layeradd', ({layer}) => {
  //layer.setIcon(mapboxgl.icon(layer.feature.properties.icon));
  
//});

//myLayer.setGeoJSON(GEO_JSON_1);

////Adding Event Listeners

//document.querySelectorAll(".nav-maps li")
	//.forEach((tab, index) => {
		
		//tab.addEventListener('click', (e) => changeTab(tab, index))
		
//})


//function changeTab(tabClicked, index) {
		
		//resetMarkerIcon(true)
		
		//document.querySelectorAll(".nav-maps li")
		//.forEach((tab) => {
			//tab.classList.remove("selected")
		//})
		
		//tabClicked.classList.add("selected")
		
		//if(index == 0) { 
			
			//document.querySelector(".first").classList.remove("hide")
			//document.querySelector(".second").classList.add("hide")
			//myLayer.setGeoJSON(GEO_JSON_1);
			//markerInfo = MARKER_INFO_1
		//} else {
			
			//document.querySelector(".second").classList.remove("hide")
			//document.querySelector(".first").classList.add("hide")
			//myLayer.setGeoJSON(GEO_JSON_2);
			//markerInfo = MARKER_INFO_2
			
		//}
		
		//markers = document.querySelectorAll(".leaflet-marker-icon")
		//markers.forEach((marker) => {
		
			// marker.addEventListener('click', changeMarkerColor)
			
		//})
	
		//let markerContainer = document.querySelector(".map-rigth-menu")
		//markerContainer.innerHTML = ""
//}

function changeMarkerColor(el) {
	   
		resetMarkerIcon()
		mapFlyTo(el.target.classList[1].split("-")[0])

		if(!el.target.classList.contains("marker-selected")) {

			// el.target.style.backgroundImage = 'url("/wp-content/uploads/2021/09/marker-red.svg")'
			el.target.style.backgroundImage = 'url("./wp-content/uploads/2021/09/marker-red.svg")'
			el.target.classList.add("marker-selected")
		}
		
		let marker = document.querySelector(`.marker-info.${el.target.classList[1]}`)
		
		marker.classList.add("selected")
		
		document.querySelector(".map-rigth-menu").scrollTo(
			{ 
			   top: marker.offsetTop - 20,
			   behavior: 'smooth'
			}
		)
	} 

function resetMarkerIcon(resetMenu=null) {
	document.querySelectorAll(".marker").forEach((marker) => {

		// marker.style.backgroundImage = "url('/wp-content/uploads/2021/09/marker-white.svg')"
		marker.style.backgroundImage = "url('./wp-content/uploads/2021/09/marker-white.svg')"
		marker.classList.remove("marker-selected")

	})
	
	document.querySelectorAll(".marker-info").forEach((marker) => {

		marker.classList.remove("selected")

	})
	
	
	if(resetMenu) {
		
	  document.querySelectorAll(".map-left-menu li").forEach((el) => {
		
		el.classList.remove("selected")
		
	  })
	  
	}
}

function mapFlyTo(country) {
	
	resetMarkerIcon(true)
	
	let markerContainer = document.querySelector(".map-rigth-menu")
	markerContainer.innerHTML = ""

	const mapDescription = document.getElementById("mobile--map__description")

	menuItems.forEach(item => item.classList.remove("selected"))
	document.querySelectorAll(`.${country}`).forEach(el => {
		el.classList.add("selected")
	})
	
	let content = ""

	//displays a card with location information	
	markerInfo[country].map((marker) => {
		
		content += 
		`
		<li class="${marker.className} marker-info">
			<div class="marker"></div>
				<p>${marker.name}</p>
				<p>${marker.direction}</p>
				<p>${marker.phone}</p>
			
			<div class="link">
				<a href="${marker.link}"> CONOCE MÁS <span class="dashicons dashicons-arrow-right-alt2"></span> </a>
			</div>
		</li>
		`
	
	} )
	
	markerContainer.innerHTML = content
  //map zoom depending on the country
    let zoom = 3.9	
  //depending on the section this changes (Plantas industriales/oficinas comerciales)
    switch(country){
	case "usa":
	mapDescription.innerHTML="Plantas Industriales <br/> Estados Unidos"
	    zoom = 2.9
	    break;

	case "esp":
	    mapDescription.innerHTML="Plantas Industriales <br/> España"
	    break;
	case "ven":
	    mapDescription.innerHTML="Plantas Industriales <br/> Venezuela"
	    break;
	case "col":
	    mapDescription.innerHTML="Plantas Industriales <br/> Colombia"
	    break;
        default:
	    mapDescription.innerHTML+=country
	break;
      
    }
    mymap.flyTo({center: COUNTRIES[country], essential: true, zoom: zoom})
}


