import { load } from '@2gis/mapgl';
import { MapWrapper } from './MapWrapper.jsx'
import { useEffect } from 'react';

export const Map = () => {
    useEffect(() => {
        let map;
        load().then((mapglAPI) => {
            map = new mapglAPI.Map('map-container', {
                center: [55.31878, 25.23584],
                zoom: 13,
                key: '4cdeccce-daeb-4e9e-95d6-8b4321deb709',
            });
        });

        // Удаляем карту при размонтировании компонента
        return () => map && map.destroy();
    }, []);

    return (
        <div style={{ width: '100%', height: '100%' }}>
            <MapWrapper />
        </div>
    );
};