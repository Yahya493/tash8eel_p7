import React, { useRef, useEffect, useState } from 'react'
// import { MapView } from './MapView';
import { getMapboxToken } from '../../actions/urlService';
// import { Map } from 'mapbox-gl';
import mapboxgl from '!mapbox-gl'; // eslint-disable-line import/no-webpack-loader-syntax
import './map.css'
import markerIcon from '../../components/pngegg.png'
import { useDispatch } from 'react-redux';

mapboxgl.accessToken = getMapboxToken()

export default function MapPage() {

  const mapContainer = useRef(null);
  const map = useRef(null);
  // const [lng, setLng] = useState(() => 35.8518);
  // const [lat, setLat] = useState(() => 33.8938);
  const initLocation = [35.8518, 33.8938]
  const [location, setLocation] = useState(() => initLocation)
  const [zoom, setZoom] = useState(() => 7.5);
  const [markerList, setMarkerList] = useState(() => [])
  const [selectedMarker, setSelectedMarker] = useState(() => null)
  const [markerIndex, setMarkerIndex] = useState(() => 0)
  const dispatch = useDispatch()
  const [routeData, setRouteData] = useState(null);

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
    console.log(`marker type: ${marker.type}`)
  }

  const deleteMarker = (marker) => {
    setMarkerList(preList => {
      const list = preList.filter(m => m !== marker)
      if (list.length !== 0) {
        if (marker.type === 'start') {
          list[0].type = 'start'
        }
        else {
          if(marker.type === 'end') {
            list[list.length - 1].type = 'end'
          }
        }
      }

      marker.remove()
      console.log(list.length)
      return list
    })
    // console.log(`delete ${marker.getLngLat()}`)
  }

  // const handleDeleteMarker = () => deleteMarker(selectedMarker)

  useEffect(() => {
    if (markerList.length < 2) {
      setRouteData(null)
    }
    if (markerList.length >= 2) {
      // const waypoints = [
      //   [markerList[0].getLngLat().lng, markerList[0].getLngLat().lat],
      //   [markerList[1].getLngLat().lng, markerList[1].getLngLat().lat]
      // ]
      fetchRoute(markerList)
    }
  }, [markerList, selectedMarker])

  useEffect(() => {
    if (map.current && routeData) {
      map.current.addSource('polyline', {
        type: 'geojson',
        data: {
          type: 'Feature',
          properties: {},
          geometry: {
            type: 'LineString',
            coordinates: routeData.routes[0].geometry.coordinates,
          },
        },
      });

      map.current.addLayer({
        id: 'layer',
        type: 'line',
        source: 'polyline',
        layout: {
          'line-join': 'round',
          'line-cap': 'round',
        },
        paint: {
          'line-color': 'red', // You can choose a different color for the line
          'line-width': 4,
        },
      });
    }
    return () => {
      if (map.current.getSource('polyline')) {
        map.current?.removeLayer('layer')
        map.current?.removeSource('polyline')
      }
    }
  }, [routeData])

  useEffect(() => {
    if (map.current && selectedMarker === null && location !== initLocation) {
      // console.log(`lng: ${location[0]} | lat: ${location[1]}`)
      const markerOptions = {
        // position: [lng, lat],
        // title: 'My marker',
        color: 'red',
        draggable: true,
        scale: 1,
      };
      const marker = new mapboxgl.Marker(markerOptions)
        .setLngLat(location) // [longitude, latitude] of the marker's position

      marker.setPopup(new mapboxgl.Popup().setHTML(`<button id="btn-delete">x</button><span>Marker-${markerIndex}</span>`))
        .addTo(map.current)
        .on('drag', handleMarkerMove)

      marker.getElement().addEventListener('click', () => handleMarkerSelection(marker))
      // setSelectedMarker(marker)
      marker.togglePopup()
      document.getElementById('btn-delete').addEventListener('click', () => deleteMarker(marker))
      marker.togglePopup()

      marker.type = 'end'
      if (markerList.length === 0) {
        marker.type = 'start'
      }
      else {
        if (markerList.length > 1) {
          for (let i = 1; i < markerList.length; i++) {
            markerList[i].type = 'milestone'
          }
        }
      }

      setMarkerIndex(preIndex => preIndex + 1)
      setMarkerList(preList => {
        const list = [...preList, marker]
        // console.log(list.length)

        // if (list.length == 2) {
        //   const waypoints = [
        //     [list[0].getLngLat().lng, list[0].getLngLat().lat],
        //     [list[1].getLngLat().lng, list[1].getLngLat().lat]
        //   ]
        //   fetchRoute(waypoints)
        // }

        return list
      })

      // marker.addTo(map.current)
    }
    return () => {
      setSelectedMarker(null)
    }
  }, [location])

  useEffect(() => {
    dispatch({ type: "setCurrentPage", currentPage: 4 })
    if (map.current) return; // initialize map only once
    map.current = new mapboxgl.Map({
      container: mapContainer.current,
      // style: 'mapbox://styles/mapbox/satellite-v9',
      style: 'mapbox://styles/mapbox/streets-v12',
      center: location,
      zoom: zoom,
      // : handleClick,
    });
    map.current.addControl(new mapboxgl.NavigationControl())
    map.current.on('click', handleClick)
  }, []);

  async function fetch2MarkerRoute(waypoints) {
    try {
      // const url = `https://api.mapbox.com/directions/v5/mapbox/driving/35.847295,34.445552;35.84455,34.415482?alternatives=false&geometries=geojson&overview=full&steps=false&access_token=${getMapboxToken()}`

      const response = await fetch(
        `https://api.mapbox.com/directions/v5/mapbox/walking/${waypoints.join(';')}?alternatives=false&continue_straight=false&geometries=geojson&overview=full&steps=false&access_token=${getMapboxToken()}`,
        // {
        //   method: 'GET',
        //   headers: {
        //     // "Content-Type": "application-json",
        //     Authorization: `Bearer ${getMapboxToken()}`,
        //   },
        // }
      );

      if (!response.ok) {
        console.error('Error:', response.status);
        return;
      }

      const data = await response.json();
      // setRouteData(predata => {
      //   console.log(`distance: ${data.routes[0].distance} m`)
      //   console.log(`duration: ${data.routes[0].duration} s`)
      //   console.log(data.routes[0].geometry.coordinates.length)

      //   return data
      // });
      return data;
    } catch (error) {
      console.error('Error:', error);
    }
  }

  async function fetchRoute(waypoints) {
    setRouteData(preData => null)

    for (let i = 0; i < waypoints.length - 1; i++) {
      const points = [
        [markerList[i].getLngLat().lng, markerList[i].getLngLat().lat],
        [markerList[i + 1].getLngLat().lng, markerList[i + 1].getLngLat().lat]
      ]
      const data = await fetch2MarkerRoute(points)
      setRouteData(preData => {
        let newData = data
        if (preData) {
          newData = {
            routes: [{
              distance: preData.routes[0].distance + data.routes[0].distance,
              duration: preData.routes[0].duration + data.routes[0].duration,
              geometry: {
                coordinates: [...preData.routes[0].geometry.coordinates, ...data.routes[0].geometry.coordinates],
              },
            }],
          }
        }
        console.log(`distance: ${newData.routes[0].distance} m`)
        console.log(`duration: ${newData.routes[0].duration} s`)
        console.log(newData.routes[0].geometry.coordinates.length)
        return newData
      })
    }
  }

  return (
    <div>
      <div ref={mapContainer} className="map-container" />
    </div>
  );
}
