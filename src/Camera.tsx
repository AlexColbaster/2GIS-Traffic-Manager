import React from 'react';
import './Camera.css';

export const Camera = React.memo(
    () => {     
        return <div className='camera'>CAMERA</div>;
    },
    () => true,
);
