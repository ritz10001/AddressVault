import React, { useEffect, useRef, useState } from 'react';
import AddressFormCSS from './AddressForm.module.css'; 
import axios from 'axios';
import Select from 'react-select';
import { countries } from '../countriesjson';
import { LoadScript, Autocomplete, GoogleMap, useJsApiLoader } from '@react-google-maps/api';
/*APIKEY=AIzaSyDdAVva_hPAJtlP2Xutm2kGi1z3etA7Jsk*/ 
import ReactGoogleAutocomplete from 'react-google-autocomplete';
const AddressForm = ({ setAddresses, setIsFormVisible, addresses, addressToEdit, onClose }) => {
    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [phone, setPhone] = useState("");
    const [addressLine1, setAddressLine1] = useState("");
    const [addressLine2, setAddressLine2] = useState("");
    const [city, setCity] = useState("");
    const [state, setState] = useState("");
    const [postalCode, setPostalCode] = useState("");
    const [country, setCountry] = useState("");
    const [states, setStates] = useState([]);
    const [isCountrySelected, setIsCountrySelected] = useState(false);
    const [isStateSelected, setIsStateSelected] = useState(false);
    const [isCitySelected, setIsCitySelected] = useState(false);
	const autocompleteRef = useRef();

    useEffect(() => {
        console.log("entered useeffect");
        console.log(addressToEdit);
        if(addressToEdit){
            setName(addressToEdit.name);
            setEmail(addressToEdit.email);
            setPhone(addressToEdit.phone);
            setAddressLine1(addressToEdit.addressLine1);
            setAddressLine2(addressToEdit.addressLine2);
            setCity(addressToEdit.city);
            setState(addressToEdit.state);
            setPostalCode(addressToEdit.postalCode);
            setCountry(addressToEdit.country);
            setStates(countries.find(c => c.name === addressToEdit.country)?.states || []);
            setIsCountrySelected(true);
            // console.log(addressToEdit.state);
            setIsStateSelected(!!addressToEdit.state);

        }
    }, [addressToEdit]);

    const handleFormSubmit = (event) => {
        event.preventDefault();
        const token = localStorage.getItem("jsonwebtoken");
        const newAddress = {
            name,
            email,
            phone,
            addressLine1,
            addressLine2,
            city,
            state,
            postalCode,
            country
        };

        if(addressToEdit){
            axios.put(`http://localhost:3001/vault/${addressToEdit._id}`, newAddress, 
                {headers: { "Authorization": `Bearer ${token}` }}
            ).then(response => {
                console.log(addresses[0]._id);
                const updatedAddresses = addresses.map(address => address._id === addressToEdit._id ? response.data : address);
                setAddresses(updatedAddresses);
                console.log("updated", updatedAddresses);
                onClose();
            }).catch(error => console.log(error));
        }
        else{
            axios.post('http://localhost:3001/vault', newAddress, 
                { headers: { "Authorization": `Bearer ${token}` } }
            ).then(response => {
                setAddresses([...addresses, response.data]);
                onClose();
            }).catch(error => console.log(error));
    
            setName("");
            setEmail("");
            setPhone("");
            setAddressLine1("");
            setAddressLine2("");
            setCity("");
            setState("");
            setPostalCode("");
            setCountry("");
        }
        
    };

    const handleCountryChange = (selectedOption) => {
        setCountry(selectedOption.name);
        setStates(selectedOption.states.map(state => ({label: state.name, value: state.name})));
        setState("");
        setIsCountrySelected(true);
        setIsStateSelected(false);
    }

    const handleStateChange = (selectedOption) => {
        setState(selectedOption.value);
        setCity("");
        setIsStateSelected(true);
    }

    const handleCityChange = () => {

    }
    const handlePlaceSelected = (place) => {
        const p = autocompleteRef.current.getPlace();
        console.log(p);
        console.log("he;;p");
        const addressComponents = place.address_components;
        const address = {
            line1: "",
            line2: "",
            city: "",
            state: "",
            country: "",
            postalCode: ""
        }

        addressComponents.forEach(component => {
            const types = component.types;
            if (types.includes("street_number")) {
                address.line1 = component.long_name + " " + address.line1;
            }
            if (types.includes("route")) {
                address.line1 += component.long_name;
            }
            if (types.includes("sublocality_level_1") || types.includes("locality")) {
                address.city = component.long_name;
            }
            if (types.includes("administrative_area_level_1")) {
                address.state = component.long_name;
            }
            if (types.includes("country")) {
                address.country = component.long_name;
            }
            if (types.includes("postal_code")) {
                address.postalCode = component.long_name;
            } 
        });

        setAddressLine1(address.line1);
        setCity(address.city);
        setState(address.state);
        setCountry(address.country);
        setPostalCode(address.postalCode);
        console.log(address.line1);
        console.log(address.city);
        console.log(address.state);
        console.log(address.country);
        console.log(address.postalCode);
    }

    return (
        <div className={AddressFormCSS['form-container']}>
            <form onSubmit={handleFormSubmit}>
                <h2 style={{color: "red", textAlign: "center"}}>{addressToEdit ? 'Edit Address': 'Add Address'}</h2>
                <input type="text" placeholder="Name" required value={name} onChange={e => setName(e.target.value)}/>
                <input type="text" placeholder="Email" required value={email} onChange={e => setEmail(e.target.value)}/>

                <Select placeholder="Country" options={countries} required
                getOptionLabel={option => option.name} 
                getOptionValue={option => option.code3} 
                onChange={handleCountryChange} />

                <Select placeholder="State" required
                options={states} 
                getOptionLabel={option => option.label} 
                getOptionValue={option => option.value} 
                isDisabled={!isCountrySelected}
                onChange={handleStateChange} />
                <h4 style={{color: "white"}}>{country}</h4>

                <ReactGoogleAutocomplete
                    placeholder="City"
                    apiKey="AIzaSyDdAVva_hPAJtlP2Xutm2kGi1z3etA7Jsk"
                    onPlaceSelected={handlePlaceSelected}
                    options={{
                        types: ['(cities)'],
                        componentRestrictions: { country: "ind"},
                    }}
                    disabled={!isStateSelected}
                    defaultValue={city}
                    onChange={e => {setCity(e.target.value); console.log(country)}}
                />

                <ReactGoogleAutocomplete apiKey="AIzaSyDdAVva_hPAJtlP2Xutm2kGi1z3etA7Jsk" 
                placeholder="Address Line 1"
                onPlaceSelected={handlePlaceSelected}
                options={{
                    types: ['address'],
                    componentRestrictions: { country: country, administrativeArea: state },
                }}
                defaultValue={addressLine1}
                onChange={e => setAddressLine1(e.target.value)} />

                <input type="text" placeholder="Address Line 2" value={addressLine2} onChange={e => setAddressLine2(e.target.value)}/>

                {/* <input type="text" placeholder="Country" required value={country} onChange={e => setCountry(e.target.value)}/> */}
                

                <input type="text" 
                placeholder="Postal Code" 
                required value={postalCode} 
                onChange={e => setPostalCode(e.target.value)}/>

                <input type="text" 
                placeholder="Phone" 
                required value={phone} 
                onChange={e => setPhone(e.target.value)} 
                disabled={!isCountrySelected}/>
                
                <button type="submit">{addressToEdit ? 'Edit Address': 'Add Address'}</button>
                <button type="button" onClick={onClose}>Cancel</button>
            </form>
        </div>
    );
}

export default AddressForm;
