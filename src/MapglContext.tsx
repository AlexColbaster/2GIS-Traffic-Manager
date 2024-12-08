import { createContext, useContext, useState, ReactNode, Dispatch, SetStateAction } from 'react';
import { RulerControl } from '@2gis/mapgl-ruler';

const MapglContext = createContext<{
    mapgl?: typeof mapgl;
    mapglInstance?: mapgl.Map;
    center?: [number, number];
    rulerControl?: RulerControl;
    setMapglContext: Dispatch<SetStateAction<MapContextState>>;
}>({
    mapgl: undefined,
    mapglInstance: undefined,
    center: [8.979371, 45.039603],
    rulerControl: undefined,
    setMapglContext: () => {},
});

interface MapContextState {
    mapgl?: typeof mapgl;
    mapglInstance?: mapgl.Map;
    center?: [8.979371, 45.039603];
    rulerControl?: RulerControl;
}

export function useMapglContext() {
    return useContext(MapglContext);
}

export function MapglContextProvider({ children }: { children: ReactNode }) {
    const [{ mapglInstance, center, rulerControl, mapgl }, setMapglContext] = useState<MapContextState>({
        mapglInstance: undefined,
        center: undefined,
        rulerControl: undefined,
        mapgl: undefined,
    });
    return (
        <MapglContext.Provider value={{ mapgl, mapglInstance, center, rulerControl, setMapglContext }}>
            {children}
        </MapglContext.Provider>
    );
}
