import './App.css';
import Mapgl from './Mapgl';
import { MapglContextProvider } from './MapglContext';
import ButtonRulerAddPreset from './ButtonRulerAddPreset';
import ButtonResetMapCenter from './ButtonResetMapCenter';
import ButtonRulerReset from './ButtonRulerReset';
import Deadlock from './Deadlock';

function App() {
    return (
        <MapglContextProvider>
            <div className='App-map-container'>
                <Deadlock />
                <Mapgl />
            </div>
        </MapglContextProvider>
    );
}

export default App;
