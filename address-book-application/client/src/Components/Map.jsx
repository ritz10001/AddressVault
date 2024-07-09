import React from "react";
import { GoogleMap, LoadScript, Marker } from "@react-google-maps/api";
import { useState, useEffect } from "react";
import axios from 'axios';
import MapCSS from './Map.module.css';

const containerStyle = {
    width: '400px',
    height: '200px',
};

const Map = ({address}) => {
    const [coordinates, setCoordinates] = useState(null);

    useEffect(() => {
        const fetchCoordinates = async () => {
          const fullAddress = `${address.addressLine1}, ${address.city}, ${address.state}, ${address.country}`;
          try {
            const response = await axios.get(`https://maps.googleapis.com/maps/api/geocode/json`, {
              params: {
                address: fullAddress,
                key: 'AIzaSyDdAVva_hPAJtlP2Xutm2kGi1z3etA7Jsk'
              }
            });
            console.log("RES", response);
            const location = response.data.results[0].geometry.location;
            setCoordinates(location);
            // console.log("loc:", location);
          } catch (error) {
            console.error('Error fetching coordinates:', error);
          }
        };
    
        fetchCoordinates();
      }, []);
    // console.log("ad", address.geometry);

    // const {latitude, longitude} = address.geometry.location;

    return(
        <>
        {typeof window !== 'undefined' && window.google ? 
                <div className={MapCSS['map-container']}>
                    <GoogleMap mapContainerClassName={MapCSS['map-container-2']}
                        mapContainerStyle={containerStyle}
                        center={coordinates}
                        zoom={15}
                        >
                        <Marker position={coordinates} />
                    </GoogleMap>
                </div>
                 : <LoadScript googleMapsApiKey="AIzaSyDdAVva_hPAJtlP2Xutm2kGi1z3etA7Jsk">
            {coordinates ? (
                <div className={MapCSS['map-container']}>
                <GoogleMap mapContainerClassName={MapCSS['map-container']}
                mapContainerStyle={containerStyle}
                center={coordinates}
                zoom={15}
                >
                <Marker position={coordinates} />
                </GoogleMap>
                </div>
            ) : (
                <p>Loading map...</p>
            )}
        </LoadScript>}
        </>
    );
}

export default Map;