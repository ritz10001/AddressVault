import React, { useEffect, useState, useRef } from 'react';
import AboutCSS from './About.module.css';
import axios from 'axios';
import { RxCross1 } from "react-icons/rx";

const About = ({onClose}) => {
    return(
        <div className={AboutCSS["aboutBackdrop"]}>
            <div className={AboutCSS["aboutContent"]}>
                <div className={AboutCSS["closeButton"]}>
                    <button onClick={onClose} style={{backgroundColor: "red", border: "none", borderRadius: "2px", color: "white", fontSize: "15px", fontWeight: "bold"}}><RxCross1 /></button>
                </div>
                <h2 style={{color: "#5783EB", marginBottom: "10px"}}>About Me</h2>
                <p>Hello, I'm Ritvik Prakash! I'm currently a junior studying Computer Science at Texas Tech University. 
                I aspire to be a backend/full stack developer, and this is my first full stack project. 
                I'm very excited to be able to showcase this project as it's my first fully hosted website.</p>
                <p>Feel free to reach out at: ritvik11prakash@gmail.com</p>
            </div>
        </div>
    )
}

export default About;