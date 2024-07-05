import React from 'react';
import UserInfoCSS from './UserInfo.module.css';
import axios from 'axios';
import { RxCross1 } from "react-icons/rx";

const UserInfo = ({onClose}) => {
    // console.log("hello");
    return(
        <div className={UserInfoCSS["userBackdrop"]}>
            <div className={UserInfoCSS["userContent"]}>
                <div className={UserInfoCSS["closeButton"]}><button onClick={onClose} style={{backgroundColor: "red", border: "none", borderRadius: "2px", color: "white", fontSize: "15px", fontWeight: "bold"}}><RxCross1 /></button></div>
                <h2 style={{color: "white"}}>hello</h2>
                {/* <p>Email: {address.email}</p>
                <p>Phone: {address.phone}</p>
                <p>Address Line 1: {address.addressLine1}</p>
                <p>Address Line 2: {address.addressLine2 ? address.addressLine2 : "N/A"}</p>
                <p>City: {address.city}</p>
                <p>State: {address.state}</p>
                <p>Postal Code: {address.postalCode}</p>
                <p>Country: {address.country}</p> */}
            </div>
        </div>
    )
}

export default UserInfo;