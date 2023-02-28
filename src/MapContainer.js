import { Map, TileLayer } from "react-leaflet";
import styled from "styled-components";
import Markers from './Markers';


const StyledMap = styled(Map)`
    width: calc(100vw - 300px);
    height: 100vh;
    position:absolute;
    top:0px;
    left:300px;
`;

const MapContainer = (props) => {

    return (
        <StyledMap center={props.center} zoom={props.zoom} >
            <TileLayer
                url='https://{s}.basemaps.cartocdn.com/dark_all/{z}/{x}/{y}{r}.png'
                attribution='&copy; <a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a> &copy; <a href="https://carto.com/attributions">CARTO</a>'
                subdomains='abcd'
                maxZoom={19}
            />
            <Markers
                observationLocations={props.observationLocations}
                setSelectedLocation={props.setSelectedLocation}
            />
        </StyledMap>
    );
}

export default MapContainer;