import React, { useEffect, useState } from 'react';
import AddressFormCSS from './AddressForm.module.css'; 
import axios from 'axios';


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
            console.log(name);
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

    return (
        <div className={AddressFormCSS['form-container']}>
            <form onSubmit={handleFormSubmit}>
                <h2 style={{color: "red", textAlign: "center"}}>{addressToEdit ? 'Edit Address': 'Add Address'}</h2>
                <input type="text" placeholder="Name" required value={name} onChange={e => setName(e.target.value)}/>
                <input type="text" placeholder="Email" required value={email} onChange={e => setEmail(e.target.value)}/>
                <input type="text" placeholder="Phone" required value={phone} onChange={e => setPhone(e.target.value)}/>
                <input type="text" placeholder="Address Line 1" required value={addressLine1} onChange={e => setAddressLine1(e.target.value)}/>
                <input type="text" placeholder="Address Line 2" value={addressLine2} onChange={e => setAddressLine2(e.target.value)}/>
                <input type="text" placeholder="City" required value={city} onChange={e => setCity(e.target.value)}/>
                <input type="text" placeholder="State" required value={state} onChange={e => setState(e.target.value)}/>
                <input type="text" placeholder="Postal Code" required value={postalCode} onChange={e => setPostalCode(e.target.value)}/>
                <input type="text" placeholder="Country" required value={country} onChange={e => setCountry(e.target.value)}/>
                <button type="submit">{addressToEdit ? 'Edit Address': 'Add Address'}</button>
                <button type="button" onClick={onClose}>Cancel</button>
            </form>
        </div>
    );
}

export default AddressForm;
