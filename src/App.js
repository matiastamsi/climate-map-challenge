import React, { useEffect, useState } from 'react';
import Metolib from '@fmidev/metolib';
import L from "leaflet";
import Sidebar from './Sidebar';
import MapContainer from './MapContainer';

// Ugly hack to fix Leaflet icons with leaflet loaders
delete L.Icon.Default.prototype._getIconUrl;
L.Icon.Default.mergeOptions({
  iconRetinaUrl: require('leaflet/dist/images/marker-icon-2x.png'),
  iconUrl: require('leaflet/dist/images/marker-icon.png'),
  shadowUrl: require('leaflet/dist/images/marker-shadow.png'),
});

function App() {
  const [observationLocations, setObservationLocations] = useState([]);

  const [selectedLocation, setSelectedLocation] = useState(null);

  useEffect(function fetchObservationLocations() {
    const connection = new Metolib.WfsConnection();
    if (connection.connect('http://opendata.fmi.fi/wfs', 'fmi::observations::weather::cities::multipointcoverage')) {
      connection.getData({
        begin: Date.now() - 60e3 * 60 * 24 * 6,
        end: Date.now(),
        requestParameter: "t,snowdepth,r_1h",
        timestep: 60 * 60 * 1000,
        bbox: "20.6455928891, 59.846373196, 31.5160921567, 70.1641930203",
        callback: (data, errors) => {
          if (errors.length > 0) {

            errors.forEach(err => {
              console.error('FMI API error: ' + err.errorText);
            });
            return;
          }

          setObservationLocations(data.locations
            .map(loc => {
              const [lat, lon] = loc.info.position.map(parseFloat);
              return { ...loc, position: { lat, lon } }
            })
          );

          connection.disconnect();
        }
      });
    }
  }, []);

  return (
    <div className="App">
      <Sidebar
        selectedLocationId={selectedLocation}
        observationLocations={observationLocations}
      />
      <MapContainer
        center={[65, 26]}
        zoom={6}
        observationLocations={observationLocations}
        setSelectedLocation={setSelectedLocation}
      />
    </div>
  );

}

export default App;