import React from 'react';
import AddressModalCSS from './AddressModal.module.css';
import axios from 'axios';
import { RxCross1 } from "react-icons/rx";

const AddressModal = ({address, onClose}) => {
    if(!address){
        return null;
    }
    console.log("addressmodal");
    return (
        <div className={AddressModalCSS["modalBackdrop"]} onClick={onClose}>
            <div className={AddressModalCSS["modalContent"]} onClick={(e) => e.stopPropagation()}>
                <div className={AddressModalCSS["closeButton"]}><button onClick={onClose} style={{backgroundColor: "red", border: "none", borderRadius: "2px", color: "white", fontSize: "15px", fontWeight: "bold"}}><RxCross1 /></button></div>
                <h2>{address.name}</h2>
                <p>Email: {address.email}</p>
                <p>Phone: {address.phone}</p>
                <p>Address Line 1: {address.addressLine1}</p>
                <p>Address Line 2: {address.addressLine2 ? address.addressLine2 : "N/A"}</p>
                <p>City: {address.city}</p>
                <p>State: {address.state}</p>
                <p>Postal Code: {address.postalCode}</p>
                <p>Country: {address.country}</p>
            </div>
        </div>
    );
}

export default AddressModal;