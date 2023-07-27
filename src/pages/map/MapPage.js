import React, { useRef, useEffect, useState } from 'react'
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
  const [refresh, setRefresh] = useState(() => 0)
  const [isLoop, setIsLoop] = useState(() => false)

  // const mapRef = useRef < HTMLDivElement > (null);

  const handleClick = (e) => {
    // setSelectedMarker(null)
    // setLng(e.lngLat.lng.toFixed(4))
    // setLat(e.lngLat.lat.toFixed(4))
    setLocation(preLocation => [e.lngLat.lng.toFixed(4), e.lngLat.lat.toFixed(4)])
    // console.log(`lng: ${lng} | lat: ${lat}`)
  }

  const handleMarkerMove = (e) => {
    setRefresh(preNb => preNb + 1)
    // console.log(`markerDragged: ${e}`)
  }

  const handleMarkerSelection = (marker) => {
    setSelectedMarker(marker)
    // console.log(marker.getLngLat())
    // console.log(`marker type: ${marker.type}`)
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
      // console.log(list.length)
      return list
    })
    // console.log(`delete ${marker.getLngLat()}`)
  }

  const changeDirectionType = (marker) => {
    marker.isDirect = !marker.isDirect
    // setSelectedMarker(preMarker => {
    //   return {}
    // })
    setRefresh(preNb => { return preNb + 1 })
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
    map.current.setStyle('mapbox://styles/mapbox/satellite-v9');
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

    let lastIndex = waypoints.length - 1
    if (isLoop) lastIndex = waypoints.length

    for (let i = 0; i < lastIndex; i++) {
      const y = i !== waypoints.length - 1 ? i + 1 : 0
      const points = [
        [markerList[i].getLngLat().lng, markerList[i].getLngLat().lat],
        [markerList[y].getLngLat().lng, markerList[y].getLngLat().lat]
      ]
      let data = {}
      if (markerList[y].isDirect) {
        const d = getDistance(points[0], points[1])
        data = {
          routes: [{
            distance: d,
            duration: d / 1.4,
            geometry: {
              coordinates: points,
            },
          }],
        }
      }
      else {
        data = await fetch2MarkerRoute(points)
      }
      setRouteData(preData => {
        let newData = data
        // if (data.routes[0].geometry.coordinates[data.routes[0].geometry.coordinates.length - 1] === data.routes[0].geometry.coordinates[0]) {
        //   // newData = [points[0], ...data.routes[0].geometry.coordinates.filter(p => p !== points[0])]
        //   newData = {
        //     routes: [{
        //       ...newData.routes[0],
        //       geometry: {
        //         coordinates: [data.routes[0].geometry.coordinates[0], ...data.routes[0].geometry.coordinates.filter(p => p !== data.routes[0].geometry.coordinates[0])],
        //       },
        //     }],
        //   }
        // }
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
        console.log(`distance: ${newData.routes[0].distance.toFixed(2)} m`)
        console.log(`duration: ${(newData.routes[0].duration / 60).toFixed(2)} minutes`)
        // console.log(newData.routes[0].geometry.coordinates.length)
        return newData
      })
    }
  }

  const switchToSatelliteLayer = () => {
    if (map.current) {
      map.current.setStyle('mapbox://styles/mapbox/satellite-v9');
    }
  };

  const switchToStreetsLayer = () => {
    if (map.current) {
      map.current.setStyle('mapbox://styles/mapbox/streets-v12');
    }
  };

  return (
    <div>
      <div ref={mapContainer} className="map-container" />
      <button onClick={switchToSatelliteLayer}>Switch to Satellite Layer</button>
      <button onClick={switchToStreetsLayer}>Switch to Streets Layer</button>
    </div>
  );
}

const getDistance = (p1, p2) => {
  const lon1 = p1[0]
  const lat1 = p1[1]
  const lon2 = p2[0]
  const lat2 = p2[1]
  const R = 6371000.0; // Earth's radius in kilometers

  // Convert latitude and longitude from degrees to radians
  const lat1Rad = toRadians(lat1);
  const lon1Rad = toRadians(lon1);
  const lat2Rad = toRadians(lat2);
  const lon2Rad = toRadians(lon2);

  // Compute the differences in latitude and longitude
  const deltaLat = lat2Rad - lat1Rad;
  const deltaLon = lon2Rad - lon1Rad;

  // Haversine formula
  const a = Math.sin(deltaLat / 2) ** 2 + Math.cos(lat1Rad) * Math.cos(lat2Rad) * Math.sin(deltaLon / 2) ** 2;
  const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));

  // Calculate the distance
  const distance = R * c;
  return distance;
}

const toRadians = (degrees) => {
  return degrees * (Math.PI / 180)
}