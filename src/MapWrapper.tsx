import React from 'react';
import './MapWrapper.css'

export const MapWrapper = React.memo(
    () => {
        return <div id='map-container' className='map'></div>;
    },
    () => true,
);
