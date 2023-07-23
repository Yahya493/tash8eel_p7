import { useRef } from 'react'
import { useEffect } from 'react'
import { initMap } from './initMap.ts';

export const MapView = () => {

    const mapRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        if (mapRef.current) {
            initMap(
                mapRef.current,
                [33.8938, 35.8518]
            )
        }
    }, []);

    return (
        <div ref={mapRef} className='map' />
    )
}