import VaultCSS from './Vault.module.css';
import { FaUser } from "react-icons/fa";
import { RiLockPasswordFill } from "react-icons/ri";
import { useNavigate } from "react-router-dom";
import axios from 'axios';
import { RxHamburgerMenu } from "react-icons/rx";
import { RxCross1 } from "react-icons/rx";
import { IoLogIn } from "react-icons/io5";
import { IoIosCreate } from "react-icons/io";
import { BsInfoCircleFill } from "react-icons/bs";
import { FaCircleInfo } from "react-icons/fa6";
import image from "../assets/connected-removebg-preview.png";
import { GiMaterialsScience } from "react-icons/gi";
import { useState } from 'react';
import { FaHome } from "react-icons/fa";
import { CiLogout } from "react-icons/ci";
import { MdAddBox } from "react-icons/md";
import { useEffect } from 'react';
import Test from './Test';
import {jwtDecode} from 'jwt-decode';
import AddressForm from './AddressForm';


const Vault = ({userName}) => {

    const [showSideBar, setShowSideBar] = useState(false);
    const [addresses, setAddresses] = useState([]);
    const [isFormVisible, setIsFormVisible] = useState(false);
    const navigate = useNavigate();


    useEffect(() => {
        const token = localStorage.getItem("jsonwebtoken");

        setTokenTimeout(token, handleLogout);
        
        axios.get('http://localhost:3001/vault', 
            {headers: {"Authorization": `Bearer ${token}`}}
        ).then(response => setAddresses(response.data))
            .catch(err => console.log(err));
        }
        
    , []);

    const toggleFormVisibility = () => {
        setIsFormVisible(!isFormVisible);
    }

    // const handleFormSubmit = async (event) => {
    //     // Handle form submission and update addresses
    //     console.log("entered");
    //     const token = localStorage.getItem("jsonwebtoken");
    //     event.preventDefault();
    //     const newAddress = {
    //         name,
    //         email,
    //         phone,
    //         addressLine1,
    //         addressLine2,
    //         city,
    //         state,
    //         postalCode,
    //         country
    //     }
        
    //     const config = {headers: {"Authorization": `Bearer ${token}`}};
    //     console.log("config", config);
    //     const prom = await axios.post('http://localhost:3001/vault', newAddress, config).then(response => {
    //         setAddresses([...addresses, response.data]);
    //         setIsFormVisible(false);
    //         setName("");
    //         setEmail("");
    //         setPhone("");
    //         setAddressesLine1("");
    //         setAddressesLine2("");
    //         setCity("");
    //         setState("");
    //         setPostalCode("")
    //         setCountry("");
    //         console.log(response.data);
    //     }).catch(error => console.log(error));
    // }

    const setTokenTimeout = (token, logoutCallback) => {
        if (!token) return;

        const decodedToken = jwtDecode(token);
        const expirationTime = decodedToken.exp * 1000 - Date.now();
        console.log(expirationTime/1000);

        if(expirationTime > 0){
            setTimeout(() => {
                logoutCallback();
            }, expirationTime);
        }
    }
    

    function toggleSideBar(){
        setShowSideBar(!showSideBar);
    }

    const handleLogout = () => {
        localStorage.removeItem("jsonwebtoken");
    }

    return(
        <div className={VaultCSS['body-container-2']}>
            <nav className={VaultCSS['nav-1']}>
                {showSideBar && 
                <ul className={VaultCSS['side-bar']}>
                    <li><a href="#" aria-label='Close' onClick={toggleSideBar}><RxCross1 style={{marginLeft: "auto"}}/></a></li>
                    <li><a href="./home">Home<FaHome style={{marginLeft:"10px", color:"red"}}/></a></li>
                    <li><a href="./userinfo">User Information<FaUser style={{marginLeft:"10px", color:"yellow"}} /></a></li>
                    <li><a href="./home">Log out<CiLogout style={{marginLeft:"10px", color:"blue"}}/></a></li>
                </ul>}
                
                <ul className={VaultCSS['horizontal-bar']}>
                    <li><a className={VaultCSS["product"]} href="./home"><GiMaterialsScience className={VaultCSS['science-logo']} style={{marginRight: "10px", fontSize: "30px", color: "magenta"}}/><span className={VaultCSS['vault-text']}>AddressVault</span></a></li>
                    <li className={VaultCSS["searchBar-container"]}><div className={VaultCSS["searchBar"]}><input type='text' placeholder='Search Address by Name' ></input></div></li>
                    <li className={VaultCSS['hideOnMobile']}><a href="./home">Home<FaHome style={{marginLeft:"5px", color:"red"}}/></a></li>
                    <li className={VaultCSS['hideOnMobile']}><a href="./userinfo">User<FaUser style={{marginLeft:"5px", color:"yellow"}} /></a></li>
                    <li className={VaultCSS['hideOnMobile']}><a href="./home" onClick={handleLogout}>LogOut<CiLogout style={{marginLeft:"5px", color:"blue"}}/></a></li>
                    <li className={VaultCSS["menu-button"]} onClick={toggleSideBar} ><a href="#"><RxHamburgerMenu /></a></li>
                </ul>
                
            </nav>
            <h2 style={{color:"white"}}>Welcome, {userName}</h2>
            
            <div className={VaultCSS["home-container-2"]}>
                <div className={VaultCSS['controls-container']}>
                    <div className={VaultCSS['sort-by']}>
                        <label htmlFor="sort" style={{color: "white", fontWeight: "bold"}}>Sort By: &nbsp;&nbsp;&nbsp;</label>
                        <select id="sort" name="sort">
                            <option value="name">Name</option>
                            <option value="date">Date</option>
                        </select>
                    </div>
                    <button className={VaultCSS['create-button']} onClick={toggleFormVisibility}>
                        Create New Address<MdAddBox style={{marginLeft: "5px", marginTop: "4px"}}/>
                    </button>
                </div>
                {isFormVisible && (
                    <AddressForm 
                    setAddresses={setAddresses} 
                    setIsFormVisible={setIsFormVisible} 
                    addresses={addresses} 
                />
                )}
                <div>
                    {addresses.map((address, idx) => (
                        <div style={{backgroundColor: "white", margin: "10px"}} key={idx}>
                            <h2>{address.name}</h2>
                            <p>{address.city}</p>
                            <p>{address.state}</p>
                            <p>{address.postalCode}</p>
                        </div>
                    ))}
                </div>
                {/* <div className={VaultCSS['cards-container']}>
                    
                </div> */}
            </div>
        </div>
    );
}

export default Vault;