import React, { useState } from 'react';
import AddressFormCSS from './AddressForm.module.css'; 
import axios from 'axios';


const AddressForm = ({ setAddresses, setIsFormVisible, addresses }) => {
    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [phone, setPhone] = useState("");
    const [addressLine1, setAddressLine1] = useState("");
    const [addressLine2, setAddressLine2] = useState("");
    const [city, setCity] = useState("");
    const [state, setState] = useState("");
    const [postalCode, setPostalCode] = useState("");
    const [country, setCountry] = useState("");

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

        axios.post('http://localhost:3001/vault', newAddress, 
            { headers: { "Authorization": `Bearer ${token}` } }
        ).then(response => {
            setAddresses([...addresses, response.data]);
            setIsFormVisible(false);
            setName("");
            setEmail("");
            setPhone("");
            setAddressLine1("");
            setAddressLine2("");
            setCity("");
            setState("");
            setPostalCode("");
            setCountry("");
        }).catch(error => console.log(error));
    };

    return (
        <div className={AddressFormCSS['form-container']}>
            <form onSubmit={handleFormSubmit}>
                <input type="text" placeholder="Name" required value={name} onChange={e => setName(e.target.value)}/>
                <input type="text" placeholder="Email" required value={email} onChange={e => setEmail(e.target.value)}/>
                <input type="text" placeholder="Phone" required value={phone} onChange={e => setPhone(e.target.value)}/>
                <input type="text" placeholder="Address Line 1" required value={addressLine1} onChange={e => setAddressLine1(e.target.value)}/>
                <input type="text" placeholder="Address Line 2" value={addressLine2} onChange={e => setAddressLine2(e.target.value)}/>
                <input type="text" placeholder="City" required value={city} onChange={e => setCity(e.target.value)}/>
                <input type="text" placeholder="State" required value={state} onChange={e => setState(e.target.value)}/>
                <input type="text" placeholder="Postal Code" required value={postalCode} onChange={e => setPostalCode(e.target.value)}/>
                <input type="text" placeholder="Country" required value={country} onChange={e => setCountry(e.target.value)}/>
                <button type="submit">Add Address</button>
            </form>
        </div>
    );
}

export default AddressForm;
