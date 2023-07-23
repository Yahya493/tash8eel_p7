import { Map } from 'mapbox-gl';
import { getMapboxToken } from '../../actions/urlService'

export const initMap = (container: HTMLDivElement, coords: [number, number]) => {

    return new Map({
        container,
        style: 'mapbox://styles/mapbox/dark-v10',
        pitchWithRotate: false,
        center: coords,
        zoom: 15,
        accessToken: getMapboxToken() ,
        doubleClickZoom: false
    });

}