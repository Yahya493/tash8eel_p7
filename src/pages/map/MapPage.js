import React, { useRef, useEffect, useState } from 'react'
// import { MapView } from './MapView';
import { getMapboxToken } from '../../actions/urlService';
// import { Map } from 'mapbox-gl';
import mapboxgl from '!mapbox-gl'; // eslint-disable-line import/no-webpack-loader-syntax
import './map.css'
import markerIcon from '../../components/pngegg.png'

mapboxgl.accessToken = getMapboxToken()

export default function MapPage() {

  const initLocation = [35.8518, 33.8938]
  const [markerList, setMarkerList] = useState([])
  const mapContainer = useRef(null);
  const map = useRef(null);
  // const [lng, setLng] = useState(() => 35.8518);
  // const [lat, setLat] = useState(() => 33.8938);
  const [location, setLocation] = useState(() => initLocation)
  const [zoom, setZoom] = useState(() => 7.5);
  const [selectedMarker , setSelectedMarker] = useState(() => null)
  const [markerIndex, setMarkerIndex] = useState(() => 0)

  // const mapRef = useRef < HTMLDivElement > (null);

  const handleClick = (e) => {
    // setLng(e.lngLat.lng.toFixed(4))
    // setLat(e.lngLat.lat.toFixed(4))
    setLocation(preLocation => [e.lngLat.lng.toFixed(4), e.lngLat.lat.toFixed(4)])
    // console.log(`lng: ${lng} | lat: ${lat}`)
  }

  const handleMarkerMove = (e) => {
    // console.log(`markerDragged: ${e}`)
  }

  const handleMarkerSelection = (marker) => {
    setSelectedMarker(marker)
    console.log(marker.getLngLat())
    // console.log(`markerCilcked: ${JSON.stringify(e)}`)
  }

  
  const deleteMarker = (marker) => {
    setMarkerList(preList => {
      const list = [...preList.filter(m => m!==marker)]
      marker.remove()
      console.log(list.length)
      return list
    })
    console.log(`delete ${marker.getLngLat()}`)
    
  }
  
  // const handleDeleteMarker = () => deleteMarker(selectedMarker)
  
  useEffect(() => {
    if (map.current && selectedMarker === null && location !== initLocation) {
      // console.log(`lng: ${location[0]} | lat: ${location[1]}`)
      const markerOptions = {
        // position: [lng, lat],
        // title: 'My marker',
        color: 'red',
        draggable: true,
        scale: 0.7,
      };
      const marker = new mapboxgl.Marker(markerOptions)
        .setLngLat(location) // [longitude, latitude] of the marker's position

      marker.setPopup(new mapboxgl.Popup().setHTML(`<button id="btn-delete">x</button><span>Marker-${markerIndex}</span>`))
        .addTo(map.current)
        .on('drag', handleMarkerMove)
      
      marker.getElement().addEventListener('click', () => handleMarkerSelection(marker))
      setSelectedMarker(marker)
      marker.togglePopup()

      document.getElementById('btn-delete').addEventListener('click', () => deleteMarker(marker))

      setMarkerIndex(preIndex => preIndex + 1)
      setMarkerList(preList => {
        const list = [...preList, marker]
        console.log(list.length)
        return list
      })
      
      // marker.addTo(map.current)
    }
    return () => {
      setSelectedMarker(null)
    }
  }, [location])

  useEffect(() => {
    if (map.current) return; // initialize map only once
    map.current = new mapboxgl.Map({
      container: mapContainer.current,
      style: 'mapbox://styles/mapbox/streets-v12',
      center: location,
      zoom: zoom,
      // : handleClick,
    });
    map.current.on('click', handleClick)
  }, []);




  return (
    <div>
      <div ref={mapContainer} className="map-container" />
    </div>
  );
}
