import { getMapboxToken } from "../../actions/urlService"

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

  async function fetch2MarkerRoute(waypoints, type) {
    try {
      // const url = `https://api.mapbox.com/directions/v5/mapbox/driving/35.847295,34.445552;35.84455,34.415482?alternatives=false&geometries=geojson&overview=full&steps=false&access_token=${getMapboxToken()}`

      const response = await fetch(
        `https://api.mapbox.com/directions/v5/mapbox/${type}/${waypoints.join(';')}?alternatives=false&continue_straight=false&geometries=geojson&overview=full&steps=false&access_token=${getMapboxToken()}`,
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

  async function fetchRoute(waypoints, type, isLoop, setRouteData) {
    setRouteData(preData => null)

    let lastIndex = waypoints.length - 1
    if (isLoop) lastIndex = waypoints.length

    for (let i = 0; i < lastIndex; i++) {
      const y = i !== waypoints.length - 1 ? i + 1 : 0
      const points = [
        [waypoints[i].getLngLat().lng, waypoints[i].getLngLat().lat],
        [waypoints[y].getLngLat().lng, waypoints[y].getLngLat().lat]
      ]
      let data = {}
      if (waypoints[y].isDirect) {
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
        data = await fetch2MarkerRoute(points, type)
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

  export {
    getDistance,
    fetchRoute
  }