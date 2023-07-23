import React, { useRef, useEffect, useState } from 'react'
// import { MapView } from './MapView';
import { getMapboxToken } from '../../actions/urlService';
// import { Map } from 'mapbox-gl';
import mapboxgl from '!mapbox-gl'; // eslint-disable-line import/no-webpack-loader-syntax
import './map.css'
import markerIcon from '../../components/pngegg.png'

mapboxgl.accessToken = getMapboxToken()

export default function MapPage() {

  const mapContainer = useRef(null);
  const map = useRef(null);
  const [lng, setLng] = useState(35.8518);
  const [lat, setLat] = useState(33.8938);
  const [zoom, setZoom] = useState(7.5);

  // const mapRef = useRef < HTMLDivElement > (null);

  const handleClick = (e) => {
    setLng(e.lngLat.lng.toFixed(4))
    setLat(e.lngLat.lat.toFixed(4))
    // console.log(`lng: ${lng} | lat: ${lat}`)
  }

  useEffect(() => {
    if (map.current) {
      console.log(`lng: ${lng} | lat: ${lat}`)
      // const markerOptions = {
      //   position: [lng, lat],
      //   title: 'My marker',
      //   color: 'red',
      //   icon: {
      //     url: markerIcon,
      //     // The size of the icon.
      //     size: [25, 25],
      //   },
      //   // size: 50,
      //   opacity: 0.5,
      // };
      // const marker = new mapboxgl.Marker(markerOptions);
      // marker.addTo(map.current)
    }
  }, [lng, lat])

  useEffect(() => {
    if (map.current) return; // initialize map only once
    map.current = new mapboxgl.Map({
      container: mapContainer.current,
      style: 'mapbox://styles/mapbox/streets-v12',
      center: [lng, lat],
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
