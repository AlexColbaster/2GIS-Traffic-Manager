import React from 'react';
import './MapWrapper.css'

export const TrafficLightButton = React.memo(
    () => {
        return <button className='traffic-button'>Сменить режим</button>;
    },
    () => true,
);
