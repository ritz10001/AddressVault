import React from "react";
import { GoogleMap, LoadScript, Marker } from "@react-google-maps/api";
import { useState, useEffect } from "react";
import axios from 'axios';
import MapCSS from './Map.module.css';
import { BASE_URL } from "../url";

const containerStyle = {
    width: '400px',
    height: '200px',
};

const Map = ({address}) => {
    const [coordinates, setCoordinates] = useState(null);
    const [apiKey, setApiKey] = useState("");
    const [apiKeyLoaded, setApiKeyLoaded] = useState(false);

    useEffect(() => {
      const fetchApiKey = async () => {
          try {
              await axios.get(`https://addressvault.onrender.com/api/env`).then(res => setApiKey(res.data["API_KEY"]));
              setApiKeyLoaded(true);
          } catch (err) {
              console.log(err);
          }
      };

      fetchApiKey();
    }, []);

    useEffect(() => {
        const fetchCoordinates = async () => {
          if (!apiKeyLoaded || !apiKey) return;

          const fullAddress = `${address.addressLine1}, ${address.city}, ${address.state}, ${address.country}`;
          try {
            const response = await axios.get(`https://maps.googleapis.com/maps/api/geocode/json`, {
              params: {
                address: fullAddress,
                key: apiKey
              }
            });
            const location = await response.data.results[0].geometry.location;
            
            setCoordinates(location);
            
          } 
          catch (error) {
            console.error('Error fetching coordinates:', error);
          }
        };
    
        fetchCoordinates();
      }, [apiKey, apiKeyLoaded]);

    return(
        <>
        {typeof window !== 'undefined' && window.google && apiKeyLoaded && coordinates ? 
                <div className={MapCSS['map-container']}>
                    <GoogleMap mapContainerClassName={MapCSS['map-container-2']}
                        mapContainerStyle={containerStyle}
                        center={coordinates}
                        zoom={15}
                    >
                        <Marker position={coordinates} />
                    </GoogleMap>
                </div>
                 : 
                  <LoadScript googleMapsApiKey={apiKey}>
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
                    </LoadScript>
                    }
        </>
    );
}

export default Map;