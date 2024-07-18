import React, { useEffect, useState, useRef } from 'react';
import AddressFormCSS from './AddressForm.module.css'; 
import axios from 'axios';
import Select from 'react-select';
import { countries } from '../countriesjson';
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
    const [countryCode, setCountryCode] = useState("");
    const [apiKey, setApiKey] = useState("");

    useEffect(() => {
        axios.get('http://localhost:3001/api/env')
        .then(res => setApiKey(res.data["API_KEY"]))
        .catch(err => console.log(err));
        console.log("KEY", apiKey)
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
                const updatedAddresses = addresses.map(address => address._id === addressToEdit._id ? response.data : address);
                setAddresses(updatedAddresses);
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
        setCountryCode(selectedOption.code3.toLowerCase());
        setStates(selectedOption.states.map(state => ({label: state.name, value: state.name})));
        setState("");
        setIsCountrySelected(true);
        setIsStateSelected(false);
        setIsCitySelected(false);
    }

    const handleStateChange = (selectedOption) => {
        setState(selectedOption.value);
        setCity("");
        setIsStateSelected(true);
        setIsCitySelected(false);
    }

    const handlePlaceSelected = async (place) => {

        const addressComponents = await place.address_components;
        const address = {
            city: "",
            state: "",
            postalCode: ""
        }

        addressComponents.forEach(component => {
            const types = component.types;
            if (types.includes("locality")) {
                address.city = component.long_name;
            }
            if (types.includes("administrative_area_level_1")) {
                address.state = component.long_name;
            }
            if (types.includes("postal_code")) {
                address.postalCode = component.long_name;
            } 
        });
        setAddressLine1(place.formatted_address);
        setCity(address.city);
        setPostalCode(address.postalCode);
        setState(address.state);
        setIsCitySelected(true);
    }

    return (
        <div className={AddressFormCSS['form-container']}>
            <form onSubmit={handleFormSubmit}>
                <h2 style={{color: "red", textAlign: "center"}}>{addressToEdit ? 'Edit Address': 'Add Address'}</h2>
                <input type="text" 
                style={{paddingLeft: "5%"}}
                placeholder="Name" 
                required value={name} 
                onChange={e => setName(e.target.value)}/>

                <input type="text" 
                style={{paddingLeft: "5%"}}
                placeholder="Email" 
                required value={email} 
                onChange={e => setEmail(e.target.value)}/>

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

                {apiKey && <ReactGoogleAutocomplete 
                placeholder="Address Line 1"
                style={{paddingLeft: "5%"}}
                apiKey={apiKey} 
                onPlaceSelected={handlePlaceSelected}
                options={{
                    types: ['address'],
                    componentRestrictions: { country: countryCode },
                }}
                defaultValue={addressLine1}
                onChange={e => setAddressLine1(e.target.value)} 
                disabled={!isStateSelected && !isCountrySelected}/>}
                

                {apiKey && <ReactGoogleAutocomplete
                    placeholder="City"
                    style={{paddingLeft: "5%"}}
                    apiKey={apiKey} 
                    onPlaceSelected={(place) => {setCity(place.address_components[0].long_name)}}
                    options={{
                        types: ['(cities)'],
                        componentRestrictions: { country: countryCode },
                    }}
                    disabled={!isStateSelected}
                    defaultValue={city}
                    onChange={e => {setCity(e.target.value)}}
                />}

                <input type="text" 
                style={{paddingLeft: "5%"}}
                placeholder="Address Line 2" 
                value={addressLine2} 
                onChange={e => setAddressLine2(e.target.value)}
                disabled={!isStateSelected}/>

                <input type="text" 
                style={{paddingLeft: "5%"}}
                placeholder="Postal Code" 
                required value={postalCode} 
                onChange={e => setPostalCode(e.target.value)}
                disabled={!isStateSelected}/>

                <input type="text" 
                style={{paddingLeft: "5%"}}
                placeholder="Phone" 
                required value={phone} 
                onChange={e => setPhone(e.target.value)} 
                disabled={!isStateSelected}/>
                
                <button className={AddressFormCSS['address-btn']} type="submit">{addressToEdit ? 'Edit Address': 'Add Address'}</button>
                <button className={AddressFormCSS['address-btn']} type="button" onClick={onClose}>Cancel</button>
            </form>
        </div>
    );
}

export default AddressForm;