import { useCallback } from 'react';
import { center } from './Mapgl';
import { useMapglContext } from './MapglContext';

function ButtonResetMapCenter() {
    const { mapglInstance } = useMapglContext();

    const onClick = useCallback(() => {
        if (!mapglInstance) {
            return;
        }

        mapglInstance.setCenter(center);
    }, [mapglInstance]);

    return (
        <button style={{ height: '24px' }} onClick={onClick}>
            Reset map center
        </button>
    );
}

export default ButtonResetMapCenter;
