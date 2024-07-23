import React, { useState } from "react";
import HomeCSS from './Home.module.css';
import { RxHamburgerMenu } from "react-icons/rx";
import { RxCross1 } from "react-icons/rx";
import { IoLogIn } from "react-icons/io5";
import { IoIosCreate } from "react-icons/io";
import { BsInfoCircleFill } from "react-icons/bs";
import { FaCircleInfo } from "react-icons/fa6";
import image from "../assets/connected-removebg-preview.png";
import { GiMaterialsScience } from "react-icons/gi";
import About from './About';

const Home = () => {

    const [showSideBar, setShowSideBar] = useState(false);
    const [isAboutVisible, setIsAboutVisible] = useState(false);

    function toggleSideBar(){
        setShowSideBar(!showSideBar);
    }

    const toggleAboutVisibility = () => {
        setIsAboutVisible(!isAboutVisible);
    }

    const handleAboutClose = () => {
        setIsAboutVisible(false);
    }

    
    return (
        <div className={HomeCSS['body-container']}>
            <nav>
                {showSideBar &&
                    <ul className={HomeCSS['sidebar']}>
                        <li onClick={toggleSideBar}><a href="#"><RxCross1 style={{marginLeft: "auto", backgroundColor: "blue"}}/></a></li>
                        <li><a href="./login">Login<IoLogIn style={{marginLeft: "5px", color: "#5783EB", fontWeight: "bold"}}/></a></li>
                        <li><a href="./register">Register<IoIosCreate style={{marginLeft: "5px", color: "#5783EB", fontWeight: "bold"}}/></a></li>
                        <li><a onClick={toggleAboutVisibility}>About<FaCircleInfo style={{marginLeft: "5px", color: "#5783EB", fontWeight: "bold"}}/></a></li>
                    </ul>
                }
                <ul className={HomeCSS['horizontalbar']}>
                    <li><a className={HomeCSS["product"]} href="./home" style={{fontWeight:"bold", fontSize: "20px"}}><GiMaterialsScience style={{marginRight: "10px", fontSize: "30px", color: "#5783EB"}}/>Address Vault</a></li>
                    <li className={HomeCSS["hideOnMobile"]}><a href="./login">Login<IoLogIn style={{marginLeft: "5px", color: "#5783EB", fontWeight: "bold"}}/></a></li>
                    <li className={HomeCSS["hideOnMobile"]}><a href="./register">Register<IoIosCreate style={{marginLeft: "5px", color: "#5783EB", fontWeight: "bold"}}/></a></li>
                    <li className={HomeCSS["hideOnMobile"]}><a onClick={toggleAboutVisibility}>About<BsInfoCircleFill style={{marginLeft: "5px", color: "#5783EB", fontWeight: "bold"}}/></a></li>
                    <li className={HomeCSS["menuButton"]} onClick={toggleSideBar}><a href="#"><RxHamburgerMenu /></a></li>
                </ul>
            </nav>
            <div className={HomeCSS["home-container"]}>
                <div className={HomeCSS["text-container"]}>
                    <h1 style={{color: "white"}}>Address Vault</h1>
                    <p>Your Ultimate Contact Management Solution. </p>
                    <p>Stay connected with the people that <span style={{fontStyle:"italic", color: "white", fontWeight: "bold"}}>truly &nbsp;</span>matter.</p>
                    <h2 style={{color: "white", marginTop: "10px"}}>Create you account <span style={{fontWeight:"bold", color:"white"}}>TODAY.</span></h2>
                    <button className={HomeCSS['create-button']}style={{backgroundColor: "#5783EB", color: "white", padding: "10px 25px", borderRadius: "5px", border: "none", fontSize: "1rem"}}><a href="./register" style={{textDecoration: "none", color: "white"}}><IoIosCreate style={{marginRight: "10px"}}/>Get Started</a></button>
                </div>            
                <img src={image} alt=""  style={{width: "50%"}}/>
                {isAboutVisible && (<About onClose={handleAboutClose} />)}
            </div>
        </div>
    )
}

export default Home;