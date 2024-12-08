import { useEffect, useState } from 'react';
import { load } from '@2gis/mapgl';
import { useMapglContext } from './MapglContext';
import { Clusterer } from '@2gis/mapgl-clusterer';
import { RulerControl } from '@2gis/mapgl-ruler';
import { Directions } from '@2gis/mapgl-directions';
import { useControlRotateClockwise } from './useControlRotateClockwise';
import { MapWrapper } from './MapWrapper';

export const X_DELTA = -6.050000
export const Y_DELTA = 6.05000
export const [center, setCenter]  = useState([38.979371, 45.039603]);

export default function Mapgl() {
    const { setMapglContext } = useMapglContext();

    const mapContext = useMapglContext();
    console.log(mapContext.center);

    // setCenter(mapContext.center);

    useEffect(() => {
        let map: mapgl.Map | undefined = undefined;
        let directions: Directions | undefined = undefined;
        let clusterer: Clusterer | undefined = undefined;

        load().then((mapgl) => {
            map = new mapgl.Map('map-container', {
                center,
                zoom: 15,
                key: '4cdeccce-daeb-4e9e-95d6-8b4321deb709',
                trafficControl: true,
            });

            map.on('click', (e) => console.log(e));

            /**
             * Ruler plugin
             */
            const rulerControl = new RulerControl(map, { position: 'centerRight' });

            /**
             * Clusterer plugin with custom HTML-based icons
             */
            clusterer = new Clusterer(map, {
                radius: 60,
            });

            // Определяем маркеры с кастомными HTML-иконками
            const markers = [
                {
                    coordinates: [38.979371, 45.039603],
                    type: 'html' as const,
                    html: '<div style="width: 32px; height: 32px; background: url(/cam.png) no-repeat center; background-size: cover; cursor: pointer;"></div>',
                },
                {
                    coordinates: [38.979552, 45.039682],
                    type: 'html' as const,
                    html: '<div style="width: 32px; height: 32px; background: url(/cam.png) no-repeat center; background-size: cover; cursor: pointer;"></div>',
                },
                {
                    coordinates: [38.979949, 45.039632],
                    type: 'html' as const,
                    html: '<div style="width: 32px; height: 32px; background: url(/cam.png) no-repeat center; background-size: cover; cursor: pointer;"></div>',
                },
                {
                    coordinates: [38.979727, 45.039250],
                    type: 'html' as const,
                    html: '<div style="width: 32px; height: 32px; background: url(/cam.png) no-repeat center; background-size: cover; cursor: pointer;"></div>',
                },
                {
                    coordinates: [38.981622, 45.039374],
                    type: 'html' as const,
                    html: '<div style="width: 32px; height: 32px; background: url(/cam.png) no-repeat center; background-size: cover; cursor: pointer;"></div>',
                },
            ];

            // Загружаем маркеры в кластеризатор
            clusterer.load(markers);

            /**
             * Directions plugin
             */
           

            setMapglContext({
                mapglInstance: map,
                rulerControl,
                mapgl,
            });
        });

        // Destroy the map, if Map component is going to be unmounted
        return () => {
            clusterer && clusterer.destroy();
            map && map.destroy();
            setMapglContext({ mapglInstance: undefined, mapgl: undefined });
        };
    }, [setMapglContext, setCenter]);

    useControlRotateClockwise();

    return (
        <>
            <MapWrapper />
        </>
    );
}
