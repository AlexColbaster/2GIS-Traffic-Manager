import React from 'react';
import './Camera.css';
import './TrafficLightButton.css';
import { TrafficLightButton } from './TrafficLightButton';

export const Camera = React.memo(
    () => {     
        return <div className='camera'>
            <TrafficLightButton />
        </div>;
    },
    () => true,
);
