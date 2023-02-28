import { Marker } from "react-leaflet";

function Markers({ observationLocations, setSelectedLocation }) {

    return (
        <>
            {observationLocations.map(loc =>
                <Marker
                    position={[loc.position.lat, loc.position.lon]}
                    key={loc.info.id}
                    onClick={() => setSelectedLocation(loc.info.id)}>
                </Marker>)}
        </>
    )
}

export default Markers;