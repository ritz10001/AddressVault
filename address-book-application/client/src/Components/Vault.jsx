import VaultCSS from './Vault.module.css';
import { FaUser, FaHome } from "react-icons/fa";
import { useNavigate } from "react-router-dom";
import axios from 'axios';
import { RxHamburgerMenu, RxCross1 } from "react-icons/rx";
import { MdEditDocument, MdDeleteForever, MdAddBox } from "react-icons/md";
import { GiMaterialsScience } from "react-icons/gi";
import { useRef, useState } from 'react';
import { useEffect } from 'react';
import {jwtDecode} from 'jwt-decode';
import AddressForm from './AddressForm';
import AddressModal from './AddressModal';
import UserInfo from './UserInfo';
import ExpiredTokenAlert from './ExpiredTokenAlert';
import { RiLogoutCircleFill } from "react-icons/ri";
import { BASE_URL } from '../url';

const Vault = () => {

    const [showSideBar, setShowSideBar] = useState(false);
    const [addresses, setAddresses] = useState([]);
    const [isFormVisible, setIsFormVisible] = useState(false);
    const [selectedAddress, setSelectedAddress] = useState(null);
    const [originalAddresses, setOriginalAddresses] = useState([]);
    const [addressToEdit, setAddressToEdit] = useState(null);
    const [isUserVisible, setIsUserVisible] = useState(false);
    const [isTokenExpired, setIsTokenExpired] = useState(false);
    const [logoutPress, setLogoutPress] = useState(false);
    const searchName = useRef("");
    const [uName, setUName] = useState(null);
    const navigate = useNavigate();

    useEffect(() => {
        document.title = "Vault";
        const token = localStorage.getItem("jsonwebtoken");

        setTokenTimeout(token, handleLogout);
        
        axios.get(`https://addressvault.onrender.com/vault`, 
            {headers: {"Authorization": `Bearer ${token}`}}
        ).then(response => {setAddresses(response.data); setOriginalAddresses(structuredClone(response.data));})
            .catch(err => console.log(err));

        axios.get(`https://addressvault.onrender.com/user/current`, 
            {headers: {"Authorization": `Bearer ${token}`}}
        ).then(response => {setUName(response.data["name"])}
        ).catch(error => navigate('/login'));
    }, []);
    
    const setTokenTimeout = (token, logoutCallback) => {
        if (!token) return;
        const decodedToken = jwtDecode(token);
        const expirationTime = decodedToken.exp * 1000 - Date.now();

        if(expirationTime > 0){
            setTimeout(() => {
                logoutCallback();
            }, expirationTime);
        }
    }
    
    const toggleSideBar = () => {
        setShowSideBar(!showSideBar);
    }

    const handleLogout = () => {
        setIsTokenExpired(true);
        localStorage.removeItem("jsonwebtoken");
    }

    const handleAlertClose = () => {
        setIsTokenExpired(false);
    };

    const handleCardClick = (address) => {
        setSelectedAddress(address);
    }

    const sortByName = () => {
        const sortedAddressesByName = [...addresses].sort((a, b) => a.name.localeCompare(b.name));
        setAddresses(sortedAddressesByName);
    }
    
    const searchOperation = (e) => {
        const value = e.target.value.toLowerCase();
        searchName.current = value;
        if (searchName.current === "") {
            setAddresses(originalAddresses);
        }
        else{
            const newAddresses = addresses.filter(address => (address["name"].toLowerCase().includes(searchName.current) 
            || address["state"].toLowerCase().includes(searchName.current)) || address["city"].toLowerCase().includes(searchName.current)
            || address["addressLine1"].toLowerCase().includes(searchName.current) || address["postalCode"].toLowerCase().includes(searchName.current)
            || address["country"].toLowerCase().includes(searchName.current));
            setAddresses(newAddresses);
        }
        
    }

    const editAddress = (address) => {
        setAddressToEdit(address);
        setIsFormVisible(true);
    }

    const deleteAddress = (address) => {
        const token = localStorage.getItem("jsonwebtoken");
        axios.delete(`https://addressvault.onrender.com/vault/${address._id}`, {headers: {"Authorization": `Bearer ${token}`}}).then(
            response => {
                const updatedAddresses = addresses.filter(a => a._id !== address._id);
                setAddresses(updatedAddresses);
            }
        ).catch(error => console.log(error));
    }

    const toggleFormVisibility = () => {
        setIsFormVisible(!isFormVisible);
    }

    const handleFormClose = () => {
        setAddressToEdit(null);
        setIsFormVisible(false);
    };

    const toggleUserVisibility = () => {
        setIsUserVisible(!isUserVisible);
    }

    const handleUserClose = () => {
        setIsUserVisible(false);
    }
    
    const doubleFunction = () => {
        toggleSideBar();
        toggleUserVisibility();

    }
    return(
        <div className={VaultCSS['body-container-2']}>
            <nav className={VaultCSS['nav-1']}>
                {showSideBar && 
                <ul className={VaultCSS['side-bar']}>
                    <li><a href="#" aria-label='Close' onClick={toggleSideBar}><RxCross1 style={{marginLeft: "auto"}}/></a></li>
                    <li><a href="./home">Home<FaHome style={{marginLeft:"10px", color:"#5783EB"}}/></a></li>
                    <li><a onClick={doubleFunction}>User Information<FaUser style={{marginLeft:"10px", color: "#5783EB"}} /></a></li>
                    <li><a href="./home" onClick={handleLogout}>Log out<RiLogoutCircleFill style={{marginLeft:"10px", color: "#5783EB"}}/></a></li>
                </ul>}
                <ul className={VaultCSS['horizontal-bar']}>
                    <li><a className={VaultCSS["product"]} href="./home"><GiMaterialsScience className={VaultCSS['science-logo']} style={{marginRight: "10px", fontSize: "30px", color: "#5783EB"}}/><span className={VaultCSS['vault-text']}>AddressVault</span></a></li>
                    <li className={VaultCSS["searchBar-container"]}><div className={VaultCSS["searchBar"]}><input name='search-box' type='text' placeholder='Search by name, state, location, country etc' onChange={searchOperation} style={{padding: "10px", width: "100%"}}></input></div></li>
                    <li className={VaultCSS['hideOnMobile']}><a href="./home">Home<FaHome style={{marginLeft:"5px", color: "#5783EB"}}/></a></li>
                    <li className={VaultCSS['hideOnMobile']}><a onClick={toggleUserVisibility}>User<FaUser style={{marginLeft:"5px", color: "#5783EB"}} /></a></li>
                    <li className={VaultCSS['hideOnMobile']}><a href="./home" onClick={() => {handleLogout(); setLogoutPress(true)}}>LogOut<RiLogoutCircleFill style={{marginLeft:"5px", color: "#5783EB"}}/></a></li>
                    <li className={VaultCSS["menu-button"]} onClick={toggleSideBar} ><a href="#"><RxHamburgerMenu /></a></li>
                </ul>
            </nav>

            {uName && (<h2 style={{color:"white", textAlign: "center", paddingTop: "20px"}}>Welcome, {uName}</h2>)}

            <div className={VaultCSS["home-container-2"]}>
                <div className={VaultCSS['controls-container']}>
                    <div className={VaultCSS['sort-by']}>
                        <label htmlFor="sort" style={{color: "white"}}>Sort By: &nbsp;&nbsp;&nbsp;</label>
                        <select style={{width: "100px"}} id="sort" name="sort" onChange={(e) =>{
                            if(e.target.value === 'name'){
                                sortByName(addresses);
                            }
                            else if(e.target.value === 'date'){
                                setAddresses(structuredClone(originalAddresses));
                            }
                            }}>
                            <option value="date" style={{color: "red"}}>Date</option>
                            <option value="name">Name</option>
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
                    addressToEdit = {addressToEdit}
                    onClose = {handleFormClose}
                />
                )}
                <div style={{paddingTop: "20px"}}>
                    {addresses.map((address, idx) => (
                        <div className={VaultCSS["cards-container"]} style={{margin: "10px"}} key={idx}>
                            <div className={VaultCSS["opContainer"]} style={{display: "flex"}}>
                                <h2 style={{marginRight:"auto", color: "#5783EB"}} onClick={() => handleCardClick(address)}>{address.name}</h2>
                                <button onClick = {() => editAddress(address)} style={{border: "2px solid black", borderRadius: "5px", height: "40px", backgroundColor: "limegreen", color: "white", fontWeight: "bold", padding: "0px 10px", fontSize: "15px", display: "flex", alignItems: "center", margin: "0 12.5px"}}><MdEditDocument style={{fontSize: "20px"}}/></button>
                                <button onClick = {() => deleteAddress(address)} style={{border: "2px solid black", borderRadius: "5px", height: "40px", backgroundColor: "red", color: "white", fontWeight: "bold", padding: "0px 10px", fontSize: "15px", display: "flex", alignItems: "center"}}><MdDeleteForever style={{fontSize: "20px"}}/></button>
                            </div>
                            <div className="info" onClick = {() => handleCardClick(address)}>
                                <p style={{color: "white"}}>{address.city}</p>
                                <p style={{color: "white"}}>{address.state}</p>
                                <p style={{color: "white"}}>{address.postalCode}</p>
                            </div>
                        </div>
                    ))}
                </div>
                <AddressModal address={selectedAddress} onClose={() => setSelectedAddress(null)} />
                {isUserVisible && (<UserInfo onClose={handleUserClose} />)}
                {isTokenExpired && !logoutPress && <ExpiredTokenAlert onClose={handleAlertClose} />}
            </div>
        </div>
    );
}

export default Vault;