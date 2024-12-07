import './App.css';
import Mapgl from './Mapgl';
import { MapglContextProvider } from './MapglContext';
import Deadlock from './Deadlock';
import { Camera } from './Camera';

function App() {
    return (
        <MapglContextProvider>
            <div className='App-map-container'>
                <Deadlock />
                <div className='map-camera'>
                    <Mapgl />
                    <Camera />
                </div>
            </div>
        </MapglContextProvider>
    );
}

export default App;
