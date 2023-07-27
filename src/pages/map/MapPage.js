import React, { useEffect, useRef, useState } from 'react';
import { getMapboxToken } from '../../actions/urlService';
import mapboxgl from '!mapbox-gl'; // eslint-disable-line import/no-webpack-loader-syntax
import { useDispatch } from 'react-redux';
import { fetchRoute } from './functions';
import './map.css';

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
  const [refresh, setRefresh] = useState(() => 0)
  const [isLoop, setIsLoop] = useState(() => false)

  const handleClick = (e) => {
    setLocation(preLocation => [e.lngLat.lng.toFixed(4), e.lngLat.lat.toFixed(4)])
  }

  const handleMarkerMove = (e) => {
    setRefresh(preNb => preNb + 1)
  }

  const handleMarkerSelection = (marker) => {
    setSelectedMarker(marker)
  }

  const deleteMarker = (marker) => {
    setMarkerList(preList => {
      const list = preList.filter(m => m !== marker)
      if (list.length !== 0) {
        if (marker.type === 'start') {
          list[0].type = 'start'
        }
        else {
          if (marker.type === 'end') {
            list[list.length - 1].type = 'end'
          }
        }
      }
      marker.remove()
      return list
    })
  }

  const changeDirectionType = (marker) => {
    marker.isDirect = !marker.isDirect
    setRefresh(preNb => { return preNb + 1 })
  }

  useEffect(() => {
    if (markerList.length < 2) {
      setRouteData(null)
    }
    if (markerList.length >= 2) {
      fetchRoute(markerList, 'walking', isLoop, setRouteData)
    }
  }, [markerList, refresh]) //selectedMarker

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

      marker.setPopup(new mapboxgl.Popup().setHTML(`<button id="btn-delete">x</button><label for="chb-direction">Marker-${markerIndex}</label><input type="checkbox" id="chb-direction" ${marker.isDirect ? "checked" : ""}/>`))
        .addTo(map.current)
        .on('dragend', handleMarkerMove)

      marker.getElement().addEventListener('click', () => handleMarkerSelection(marker))
      // setSelectedMarker(marker)
      marker.togglePopup()
      document.getElementById('btn-delete').addEventListener('click', () => deleteMarker(marker))
      document.getElementById('chb-direction').addEventListener('change', () => changeDirectionType(marker))
      marker.togglePopup()

      marker.isDirect = true
      marker.type = 'end'
      if (markerList.length === 0) {
        marker.type = 'start'
        // marker.setOptions('green')
      }
      else {
        if (markerList.length > 1) {
          for (let i = 1; i < markerList.length; i++) {
            markerList[i].type = 'milestone'
            // markerList[i].setColor('gray')
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
    // map.current.on('styledata', () => {
      
    // })
    // map.current.setStyle('mapbox://styles/mapbox/satellite-v9');
  }, []);

  const toogleLayer = async () => {
    console.log(map.current?.getStyle().layers)
    if (map.current?.getStyle().layers[1].id === 'satellite') {
      await map.current.setStyle('mapbox://styles/mapbox/streets-v12');
    }
    else {
      await map.current.setStyle('mapbox://styles/mapbox/satellite-v9');
    }
  }

  return (
    <div>
      <div ref={mapContainer} className="map-container" />
      <div id="layer-switcher">
        <button onClick={toogleLayer} className=''>Switch Layer</button>
      </div>
    </div>
  );
}

