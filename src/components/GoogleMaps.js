//used: https://medium.com/@allynak/how-to-use-google-map-api-in-react-app-edb59f64ac9d
import {React, useState} from 'react';
import { GoogleMap, LoadScript, Marker , InfoWindow} from '@react-google-maps/api';

const MapContainer = ({ array }) => {
    const [ selected, setSelected ] = useState({});
    const onSelect = item => {
        setSelected(item);
    }

    const mapStyles = {
        height: "58vh",
        width: "90%"};

    //Default position if no listing is found (Baltimore)
    const defaultCenter = {
        lat: 39.29, lng: -76.61
    }

    //Find a listing that has latitude/longitude and set that as the default position
    var zoom_val = 13;
    var i = 0;
    while (array !== undefined && i < array.length) {
        if (array[i].latitude != null) {
            defaultCenter.lat = array[i].latitude;
            defaultCenter.lng = array[i].longitude;
            zoom_val = 14;
            break;
        }
        i++;
    }

    return (
        <LoadScript
            googleMapsApiKey={"AIzaSyCWxkDtfm12UiJp0USLRfPSMmoqalhd3L0"}>
            <GoogleMap
                mapContainerStyle={mapStyles}
                zoom={zoom_val}
                center={defaultCenter}>
                {/*Map to input each address into map*/}
                {array ?
                    array.map(item => {
                        return (<Marker key={item.address}
                                    position={{lat: parseFloat(item.latitude), lng: parseFloat(item.longitude)}}
                                    onClick={() => onSelect(item)}/>)
                    }) : null
                }
                {/*Info window if location is selected*/}
                { selected.latitude && selected.longitude &&
                    (<InfoWindow
                        position={{lat: selected.latitude, lng: selected.longitude}}
                        clickable={true}
                        onCloseClick={() => setSelected({})}>
                        <p>{selected.address}</p>
                    </InfoWindow>)
                }
            </GoogleMap>
        </LoadScript>
    )
}

export default MapContainer;
